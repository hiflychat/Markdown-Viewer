# Markdown Viewer Configuration and Data Boundaries

This page documents the runtime, storage, dependency, Docker, Cloudflare, and desktop configuration used by Markdown Viewer, including the boundaries between client-side Markdown editing and optional network features.

## Browser and Desktop Storage

| Key | Location | Purpose |
| :--- | :--- | :--- |
| `markdownViewerTabs` | `localStorage`, mirrored to Neutralino storage in desktop | Normal saved tabs. Temporary share/live tabs are excluded. |
| `markdownViewerActiveTab` | `localStorage`, mirrored in desktop | Active tab id. |
| `markdownViewerUntitledCounter` | `localStorage`, mirrored in desktop | Next Untitled document number. |
| `markdownViewerGlobalState` | `localStorage`, mirrored in desktop | Theme, direction, view mode, scroll sync, and other global UI preferences. |
| `app-lang` | `localStorage` | Selected UI language. |
| `find-replace-docked` | `localStorage` | Find and Replace panel dock preference. |
| `markdownViewerPrivateMode` | `localStorage` | Whether document-state persistence is disabled. This preference remains while document-state keys are cleared. |

The desktop app starts by copying known Neutralino storage values back into `localStorage`, then writes through `saveStorageItem()` to keep both layers aligned.

Temporary shared content is intentionally not persisted:

- Share Snapshot tabs have `kind: "share-snapshot"`.
- Live Share participant/host tabs are stripped or restored when leaving the session.

Private mode clears the normal document-state keys (`markdownViewerTabs`, `markdownViewerActiveTab`, `markdownViewerUntitledCounter`, and `markdownViewerGlobalState`) when enabled and prevents them from being written until the mode is turned off. Use **Clear local data** in the About dialog to clear the same local state without enabling private mode.

## Client Libraries

The web build loads core libraries from CDN with Subresource Integrity where checked into `index.html`. Larger feature libraries are lazy-loaded from `script.js` only when needed.

| Library | Source | Used For | Load Behavior |
| :--- | :--- | :--- | :--- |
| Bootstrap | CDN or prepared desktop copy | UI components | Initial page load |
| Bootstrap Icons | CDN or prepared desktop copy | Icons | Initial page load |
| github-markdown-css | CDN or prepared desktop copy | Preview styling | Initial page load |
| Marked | CDN or prepared desktop copy | Markdown parsing | Initial page load and worker |
| Highlight.js | CDN or prepared desktop copy | Code highlighting | Initial page load and worker |
| DOMPurify | CDN or prepared desktop copy | HTML sanitization | Initial page load |
| FileSaver.js | CDN or prepared desktop copy | Browser downloads | Initial page load |
| js-yaml | CDN or prepared desktop copy | Frontmatter parsing | Initial page load |
| MathJax | CDN or prepared desktop copy | LaTeX math | Lazy |
| Mermaid | CDN or prepared desktop copy | Mermaid diagrams | Lazy |
| jsPDF | CDN or prepared desktop copy | Legacy raster PDF | Lazy |
| html2canvas | CDN or prepared desktop copy | PDF/PNG capture | Lazy |
| Pako | CDN or prepared desktop copy | Share compression, diagram encoding | Lazy |
| JoyPixels / emoji-toolkit | CDN or prepared desktop copy | Emoji shortcodes | Lazy |
| ABCJS | CDN or prepared desktop copy | ABC notation and playback | Lazy |
| Leaflet | CDN or prepared desktop copy | GeoJSON/TopoJSON maps | Lazy |
| TopoJSON | CDN or prepared desktop copy | TopoJSON conversion | Lazy |
| Three.js | CDN or prepared desktop copy | STL 3D rendering | Lazy |
| STLLoader / OrbitControls | CDN or prepared desktop copy | STL loading and controls | Lazy |
| D3 | CDN or prepared desktop copy | Markmap | Lazy |
| Markmap | CDN or prepared desktop copy | Markmap diagrams | Lazy |
| Yjs | CDN or prepared desktop copy | Live Share document sync | Lazy |

When running inside Neutralino, dynamic library URLs are rewritten to local `/libs/...` files prepared by `desktop-app/prepare.js`.

## Rendering Thresholds and Limits

| Setting | Value |
| :--- | :--- |
| Large document threshold | 15,000 characters |
| Huge document threshold | 100,000 characters |
| Worker render threshold | 50,000 characters |
| Worker timeout | 12 seconds |
| Small render debounce | 100 ms |
| Large render debounce | 160 ms |
| Huge render debounce | 240 ms |
| Minimum split pane width | 20% |
| Line-height cache size | 5,000 entries |
| GitHub importer shown files | 30 |
| Share URL warning ceiling | 32,000 characters |
| Legacy share URL ceiling | 4,096 characters |
| Server share threshold | 3,000 bytes |
| Stored Share Snapshot max content | 500,000 characters |
| Stored Share Snapshot TTL | 90 days |
| Live Share max participants | 64 |
| Live Share max message | 1 MB |
| STL source limit | 2 MiB |
| STL geometry limit | 300,000 vertices |

## Sanitization

The main preview path calls DOMPurify with additional tags and attributes needed by renderers:

- Additional tags include `mjx-container` and `input`.
- Additional attributes include `id`, `class`, `style`, `align`, `type`, `checked`, `disabled`, `data-original-code`, `role`, `aria-labelledby`, and `aria-describedby`.
- Allowed URI schemes include HTTP(S), `mailto:`, `tel:`, `blob:`, relative URLs, and safe non-script values.

Export paths use similar expanded sanitizer settings for SVG/math capture. Scripts and unsafe event handlers are still removed.

Standalone HTML export also includes a restrictive CSP and SRI metadata for its external CSS and renderer scripts where applicable.

## Service Worker and PWA

`sw.js` uses a versioned cache name so stale caches can be retired safely.

Critical assets:

- `/`
- `/index.html`
- `/styles.css`
- `/script.js`
- `/preview-worker.js`
- `/manifest.json`
- `/assets/icon.jpg`

Local shell assets use network-first behavior with cache fallback for update-sensitive paths. CDN assets from cdnjs and jsDelivr use cache-first behavior after first successful fetch. The service worker removes old `markdown-viewer-cache-*` caches on activation.

Service workers require HTTPS or localhost. They do not work from `file://`.

## Cloudflare Configuration

`wrangler.toml` configures the Pages project:

```toml
name = "markdown-viewer"
pages_build_output_dir = "."
compatibility_date = "2025-04-30"

[[kv_namespaces]]
binding = "SHARE_KV"
id = "c820d2705f5742858a27b91b88f544bd"

[[durable_objects.bindings]]
name = "LIVE_ROOMS"
class_name = "LiveRoom"
script_name = "markdown-viewer-live-room"
```

`SHARE_KV` stores large Share Snapshot records for 90 days. `LIVE_ROOMS` routes Live Share WebSocket rooms to Durable Objects. Share Snapshot and Live Share are separate systems.

`wrangler.live-room.toml` deploys `workers/live-room-worker.js` with the `LiveRoom` Durable Object migration.

## Share API

`functions/api/share/[[id]].js` supports:

- `OPTIONS` for CORS preflight.
- `POST /api/share` to create a stored snapshot.
- `GET /api/share/<id>` to load a stored snapshot.
- `DELETE /api/share/<id>` to delete a stored snapshot when the creator supplies its deletion token.

Responses set `Cache-Control: no-store` and vary CORS by request origin. The allowed origins are the production app, `null`, and localhost/127.0.0.1 development origins; unsupported origins receive `403`. Stored records contain content, mode, title, creation time, size, and a hash of the creator deletion token. The token is returned only when the snapshot is created. Invalid ids, missing content, oversized content, invalid deletion tokens, missing KV binding, and unknown routes return JSON errors.

## Live Room API

`functions/live-room/[[room]].js` supports WebSocket upgrades only. It validates the WebSocket `Origin`, room and secret length, requires `LIVE_ROOMS`, and forwards to a Durable Object chosen by `roomName + ":" + secret`. The Durable Object authenticates host, edit, and view capabilities, filters message types by role, and enforces the participant/message limits.

See [Live Share Cloudflare](Live-Share-Cloudflare) for runtime flow and limits.

## Docker and Nginx

The root Docker build serves static files with Nginx on port 80. The repository includes `docker-compose.yml` exposing `8080:80`.

Security headers configured in Docker/Nginx documentation include:

- `Strict-Transport-Security` (Cloudflare Pages)
- `Content-Security-Policy`
- `X-Frame-Options: DENY` (Cloudflare Pages; the Docker image has its own Nginx policy)
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy`
- `Cross-Origin-Opener-Policy` and `Cross-Origin-Resource-Policy`

Cloudflare Pages reads the root `_headers` and `_redirects` files. `_redirects` hides `.env`, `_headers`, and source-map paths behind 404 responses. Self-hosters should preserve equivalent policies and make sure `preview-worker.js`, `sw.js`, `manifest.json`, `script.js`, `styles.css`, `assets/`, `workers/`, and `functions/` or their Cloudflare equivalents are deployed according to the features they intend to use.

## Neutralino Desktop Configuration

Current `desktop-app/neutralino.config.json` highlights:

| Setting | Value |
| :--- | :--- |
| `applicationId` | `com.markdownviewer.desktop` |
| `documentRoot` | `/resources/` |
| `url` | `/` |
| `enableServer` | `true` |
| `enableNativeAPI` | `true` |
| `tokenSecurity` | `one-time` |
| Default window | 1280 x 720 |
| Minimum window | 400 x 200 |
| Logging | disabled |
| Binary name | `markdown-viewer` |

Native allowlist:

- `app.exit`
- `os.showOpenDialog`
- `os.showSaveDialog`
- `os.showMessageBox`
- `os.open`
- `os.setTray`
- `filesystem.readFile`
- `filesystem.writeFile`
- `storage.setData`
- `storage.getData`

`os.execCommand` is intentionally absent from the default allowlist. The desktop renderer therefore cannot execute local shell commands through the standard configuration.

The browser/chrome modes block filesystem and/or OS APIs more aggressively.

## Desktop Build Scripts

`desktop-app/package.json` contains:

| Script | Command Purpose |
| :--- | :--- |
| `setup` | Runs `setup-binaries.js` to install Neutralino binaries. |
| `postsetup` | Runs `prepare.js`. |
| `predev` | Runs setup before development. |
| `dev` | Runs `npx -y @neutralinojs/neu@11.7.0 run`. |
| `prebuild` | Runs setup before build. |
| `build` | Runs `npx -y @neutralinojs/neu@11.7.0 build --release --clean` and removes the release zip if present. |

`prepare.js` copies root app files into `desktop-app/resources`, downloads and verifies libraries, rewrites dynamic library paths, strips web-only SEO metadata, and prepares local renderer/export resources for the desktop bundle.
