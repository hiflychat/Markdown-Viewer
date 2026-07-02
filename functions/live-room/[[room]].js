export async function onRequest(context) {
  const { request, env, params } = context;
  const upgradeHeader = request.headers.get("Upgrade") || "";

  if (upgradeHeader.toLowerCase() !== "websocket") {
    return new Response("Markdown Viewer live room endpoint", {
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "text/plain; charset=utf-8"
      }
    });
  }

  if (!env || !env.LIVE_ROOMS) {
    return new Response("Missing LIVE_ROOMS Durable Object binding", {
      status: 503,
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "text/plain; charset=utf-8"
      }
    });
  }

  const roomParam = Array.isArray(params.room) ? params.room.join("/") : params.room;
  const roomName = String(roomParam || "").trim();
  if (!roomName || roomName.length > 160) {
    return new Response("Invalid live room", { status: 400 });
  }
  const secret = new URL(request.url).searchParams.get("secret") || "";
  if (!secret || secret.length > 256) {
    return new Response("Invalid live room credentials", { status: 400 });
  }

  const id = env.LIVE_ROOMS.idFromName(roomName + ":" + secret);
  return env.LIVE_ROOMS.get(id).fetch(request);
}
