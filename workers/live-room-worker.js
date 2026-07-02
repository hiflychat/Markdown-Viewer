const MAX_MESSAGE_BYTES = 1024 * 1024;
const MAX_PARTICIPANTS = 64;

function parseRoomMessage(data) {
  if (typeof data === "string") {
    if (data.length > MAX_MESSAGE_BYTES) return null;
    return JSON.parse(data);
  }

  if (data instanceof ArrayBuffer) {
    if (data.byteLength > MAX_MESSAGE_BYTES) return null;
    return JSON.parse(new TextDecoder().decode(data));
  }

  return null;
}

function safeSend(socket, message) {
  try {
    socket.send(JSON.stringify(message));
  } catch (_) {
    try {
      socket.close(1011, "send failed");
    } catch (_) {}
  }
}

function normalizeOutboundMessage(message, fallbackSender, roomId) {
  if (!message || typeof message.type !== "string") return null;
  if (message.roomId && message.roomId !== roomId) return null;

  const sender = String(message.sender || fallbackSender || "").slice(0, 120);
  if (!sender) return null;

  const allowedTypes = new Set([
    "hello",
    "presence",
    "sync-request",
    "sync-state",
    "y-update",
    "leave",
    "session-end"
  ]);
  if (!allowedTypes.has(message.type)) return null;

  return Object.assign({}, message, {
    sender,
    roomId,
    sentAt: Date.now()
  });
}

export class LiveRoom {
  constructor(state) {
    this.state = state;
    this.sessions = new Map();
  }

  broadcast(message, exceptSocket) {
    this.sessions.forEach((session, socket) => {
      if (socket !== exceptSocket) {
        safeSend(socket, message);
      }
    });
  }

  removeSocket(socket) {
    const session = this.sessions.get(socket);
    if (!session) return;
    this.sessions.delete(socket);
    this.broadcast({
      type: "leave",
      sender: session.participantId,
      roomId: session.roomId,
      sentAt: Date.now()
    }, socket);
  }

  async fetch(request) {
    const upgradeHeader = request.headers.get("Upgrade") || "";
    if (upgradeHeader.toLowerCase() !== "websocket") {
      return new Response("Markdown Viewer live room Durable Object", {
        headers: {
          "Cache-Control": "no-store",
          "Content-Type": "text/plain; charset=utf-8"
        }
      });
    }

    const url = new URL(request.url);
    const roomId = decodeURIComponent(url.pathname.split("/").filter(Boolean).pop() || "");
    const secret = url.searchParams.get("secret") || "";
    if (!roomId || !secret) {
      return new Response("Missing live room credentials", { status: 400 });
    }

    if (this.sessions.size >= MAX_PARTICIPANTS) {
      return new Response("Live room is full", { status: 429 });
    }

    const pair = new WebSocketPair();
    const [client, server] = Object.values(pair);
    const participantId = "socket-" + crypto.randomUUID();

    server.accept();
    this.sessions.set(server, {
      participantId,
      roomId,
      joinedAt: Date.now()
    });

    server.addEventListener("message", (event) => {
      let parsed;
      try {
        parsed = parseRoomMessage(event.data);
      } catch (_) {
        return;
      }

      const normalized = normalizeOutboundMessage(parsed, participantId, roomId);
      if (!normalized) return;

      const session = this.sessions.get(server);
      if (session && parsed.sender) {
        session.participantId = String(parsed.sender).slice(0, 120);
      }

      this.broadcast(normalized, server);
    });

    const close = () => this.removeSocket(server);
    server.addEventListener("close", close);
    server.addEventListener("error", close);

    return new Response(null, {
      status: 101,
      webSocket: client
    });
  }
}

export default {
  fetch(request, env) {
    if (!env || !env.LIVE_ROOMS) {
      return new Response("Missing LIVE_ROOMS binding", { status: 500 });
    }

    const url = new URL(request.url);
    const roomId = decodeURIComponent(url.pathname.split("/").filter(Boolean).pop() || "");
    if (!roomId) {
      return new Response("Missing live room", { status: 400 });
    }

    const secret = url.searchParams.get("secret") || "";
    if (!secret) {
      return new Response("Missing live room credentials", { status: 400 });
    }

    const id = env.LIVE_ROOMS.idFromName(roomId + ":" + secret);
    return env.LIVE_ROOMS.get(id).fetch(request);
  }
};
