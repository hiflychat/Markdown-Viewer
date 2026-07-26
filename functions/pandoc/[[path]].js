// Same-origin proxy for the Pandoc WASM app assets (pandoc.org/app/*).
// Browsers apply stricter CORS/module rules to cross-origin dynamic
// import() and WASM streaming instantiation; proxying these files through
// our own origin avoids those restrictions entirely.
export async function onRequest(context) {
  const { params, request } = context;
  const path = Array.isArray(params.path) ? params.path.join('/') : (params.path || '');
  const upstreamUrl = 'https://pandoc.org/app/' + path;

  const upstreamResp = await fetch(upstreamUrl, {
    method: 'GET',
    headers: { 'Accept': request.headers.get('Accept') || '*/*' }
  });

  const headers = new Headers(upstreamResp.headers);
  headers.set('Access-Control-Allow-Origin', '*');
  headers.delete('content-security-policy');

  // Force correct MIME types regardless of what upstream sends, since
  // WebAssembly.instantiateStreaming and ES module imports require
  // strict content-type matching.
  if (path.endsWith('.wasm')) {
    headers.set('Content-Type', 'application/wasm');
  } else if (path.endsWith('.js') || path.endsWith('.mjs')) {
    headers.set('Content-Type', 'text/javascript; charset=utf-8');
  }

  return new Response(upstreamResp.body, {
    status: upstreamResp.status,
    statusText: upstreamResp.statusText,
    headers
  });
}
