const topics = new Map();

function safeSend(socket, message) {
  try {
    socket.send(JSON.stringify(message));
  } catch (_) {
    try {
      socket.close();
    } catch (_) {}
  }
}

function parseMessage(data) {
  if (typeof data === "string") {
    return JSON.parse(data);
  }

  if (data instanceof ArrayBuffer) {
    return JSON.parse(new TextDecoder().decode(data));
  }

  return null;
}

function removeSocketFromTopic(socket, topicName) {
  const subscribers = topics.get(topicName);
  if (!subscribers) return;
  subscribers.delete(socket);
  if (subscribers.size === 0) {
    topics.delete(topicName);
  }
}

function cleanupSocket(socket, subscribedTopics) {
  subscribedTopics.forEach((topicName) => removeSocketFromTopic(socket, topicName));
  subscribedTopics.clear();
}

function handleSocket(socket) {
  const subscribedTopics = new Set();
  let closed = false;

  socket.accept();

  socket.addEventListener("message", (event) => {
    if (closed) return;

    let message;
    try {
      message = parseMessage(event.data);
    } catch (_) {
      return;
    }

    if (!message || typeof message.type !== "string") return;

    if (message.type === "subscribe") {
      (Array.isArray(message.topics) ? message.topics : []).forEach((topicName) => {
        if (typeof topicName !== "string" || topicName.length > 256) return;
        if (!topics.has(topicName)) {
          topics.set(topicName, new Set());
        }
        topics.get(topicName).add(socket);
        subscribedTopics.add(topicName);
      });
      return;
    }

    if (message.type === "unsubscribe") {
      (Array.isArray(message.topics) ? message.topics : []).forEach((topicName) => {
        if (typeof topicName !== "string") return;
        removeSocketFromTopic(socket, topicName);
        subscribedTopics.delete(topicName);
      });
      return;
    }

    if (message.type === "publish" && typeof message.topic === "string") {
      const receivers = topics.get(message.topic);
      if (!receivers) return;
      message.clients = receivers.size;
      receivers.forEach((receiver) => safeSend(receiver, message));
      return;
    }

    if (message.type === "ping") {
      safeSend(socket, { type: "pong" });
    }
  });

  const close = () => {
    if (closed) return;
    closed = true;
    cleanupSocket(socket, subscribedTopics);
  };

  socket.addEventListener("close", close);
  socket.addEventListener("error", close);
}

export class LiveSignalRoom {
  async fetch(request) {
    const upgradeHeader = request.headers.get("Upgrade") || "";

    if (upgradeHeader.toLowerCase() !== "websocket") {
      return new Response("Markdown Viewer live signaling Durable Object", {
        headers: {
          "Cache-Control": "no-store",
          "Content-Type": "text/plain; charset=utf-8"
        }
      });
    }

    const pair = new WebSocketPair();
    const [client, server] = Object.values(pair);
    handleSocket(server);

    return new Response(null, {
      status: 101,
      webSocket: client
    });
  }
}

export default {
  fetch(request, env) {
    if (!env || !env.LIVE_SIGNAL_ROOMS) {
      return new Response("Missing LIVE_SIGNAL_ROOMS binding", { status: 500 });
    }

    const id = env.LIVE_SIGNAL_ROOMS.idFromName("markdown-viewer-live-signal-v1");
    return env.LIVE_SIGNAL_ROOMS.get(id).fetch(request);
  }
};
