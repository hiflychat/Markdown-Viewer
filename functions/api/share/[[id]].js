const SHARE_TTL_SECONDS = 60 * 60 * 24 * 90;
const MAX_CONTENT_CHARS = 500000;
const SHARE_ID_LENGTH = 10;
const SHARE_ID_PATTERN = /^[a-z2-9]{6,20}$/;
const SHARE_ID_ALPHABET = "abcdefghjkmnpqrstuvwxyz23456789";

function jsonResponse(body, init) {
  const headers = new Headers(init && init.headers);
  headers.set("Content-Type", "application/json; charset=utf-8");
  headers.set("Cache-Control", "no-store");
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");

  return new Response(JSON.stringify(body), {
    status: init && init.status ? init.status : 200,
    headers
  });
}

function emptyResponse(init) {
  const headers = new Headers(init && init.headers);
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");

  return new Response(null, {
    status: init && init.status ? init.status : 204,
    headers
  });
}

function getShareId(params) {
  const raw = params && params.id;
  if (Array.isArray(raw)) return raw.join("/");
  return typeof raw === "string" ? raw : "";
}

function generateShareId(length = SHARE_ID_LENGTH) {
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  let id = "";
  for (let i = 0; i < bytes.length; i += 1) {
    id += SHARE_ID_ALPHABET[bytes[i] % SHARE_ID_ALPHABET.length];
  }
  return id;
}

async function createUniqueShareId(kv) {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const id = generateShareId();
    const existing = await kv.get(id);
    if (!existing) return id;
  }
  throw new Error("Unable to allocate share id");
}

function sanitizeMode(mode) {
  return mode === "edit" ? "edit" : "view";
}

function sanitizeTitle(title) {
  return String(title || "").trim().replace(/\s+/g, " ").slice(0, 120);
}

export async function onRequest({ request, env, params }) {
  if (request.method === "OPTIONS") {
    return emptyResponse({ status: 204 });
  }

  if (!env || !env.SHARE_KV) {
    return jsonResponse({ error: "SHARE_KV binding is not configured" }, { status: 503 });
  }

  const id = getShareId(params);

  if (request.method === "POST" && !id) {
    let body;
    try {
      body = await request.json();
    } catch (_) {
      return jsonResponse({ error: "invalid json" }, { status: 400 });
    }

    const content = body && body.content;
    if (typeof content !== "string" || content.length === 0) {
      return jsonResponse({ error: "content required" }, { status: 400 });
    }
    if (content.length > MAX_CONTENT_CHARS) {
      return jsonResponse({ error: "content too large" }, { status: 413 });
    }

    const shareId = await createUniqueShareId(env.SHARE_KV);
    const record = {
      content,
      mode: sanitizeMode(body.mode),
      title: sanitizeTitle(body.title),
      createdAt: Date.now(),
      size: content.length
    };

    await env.SHARE_KV.put(shareId, JSON.stringify(record), {
      expirationTtl: SHARE_TTL_SECONDS
    });

    return jsonResponse({
      id: shareId,
      expiresIn: SHARE_TTL_SECONDS
    }, { status: 201 });
  }

  if (request.method === "GET" && id) {
    if (!SHARE_ID_PATTERN.test(id)) {
      return jsonResponse({ error: "invalid id" }, { status: 400 });
    }

    const raw = await env.SHARE_KV.get(id);
    if (!raw) {
      return jsonResponse({ error: "not found" }, { status: 404 });
    }

    let record;
    try {
      record = JSON.parse(raw);
    } catch (_) {
      return jsonResponse({ error: "invalid record" }, { status: 500 });
    }

    return jsonResponse({
      content: record.content || "",
      mode: sanitizeMode(record.mode),
      title: sanitizeTitle(record.title),
      createdAt: record.createdAt || null,
      size: record.size || (record.content ? record.content.length : 0)
    });
  }

  return jsonResponse({ error: "not found" }, { status: 404 });
}
