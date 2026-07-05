# Configuration

This page documents the runtime, storage, dependency, Docker, Cloudflare, and desktop configuration used by Markdown Viewer v3.9.0.

## Browser and Desktop Storage

| Key | Location | Purpose |
| :--- | :--- | :--- |
| `markdownViewerTabs` | `localStorage`, mirrored to Neutralino storage in desktop | Normal saved tabs. Temporary share/live tabs are excluded. |
| `markdownViewerActiveTab` | `localStorage`, mirrored in desktop | Active tab id. |
| `markdownViewerUntitledCounter` | `localStorage`, mirrored in desktop | Next Untitled document number. |
| `markdownViewerGlobalState` | `localStorage`, mirrored in desktop | Theme, direction, view mode, scroll sync, and other global UI preferences. |
| `app-lang` | `localStorage` | Selected UI language. |
| `find-replace-docked` | `localStorage` | Find and Replace panel dock preference. |

The desktop app starts by copying known Neutralino storage values back into `localStorage`, then writes through `saveStorageItem()` to keep both layers aligned.

Temporary shared content is intentionally not persisted:

- Share Snapshot tabs have `kind: "share-snapshot"`.
- Live Share participant/host tabs are stripped or restored when leaving the session.

## Client Libraries

The web build loads core libraries from CDN with Subresource Integrity where checked into `index.html`. Larger feature libraries are lazy-loaded from `script.js` only when needed.

| Library | Version / Source | Used For | Load Behavior |
| :--- | :--- | :--- | :--- |
| Bootstrap | 5.3.2 | UI components | Initial page load |
| Bootstrap Icons | 1.11.3 | Icons | Initial page load |
| github-markdown-css | 5.3.0 | Preview styling | Initial page load |
| Marked | 9.1.6 | Markdown parsing | Initial page load and worker |
| Highlight.js | 11.9.0 | Code highlighting | Initial page load and worker |
| DOMPurify | 3.0.9 | HTML sanitization | Initial page load |
| FileSaver.js | 2.0.5 | Browser downloads | Initial page load |
| js-yaml | 4.1.0 | Frontmatter parsing | Initial page load |
| MathJax | 3.2.2 | LaTeX math | Lazy |
| Mermaid | 11.15.0 | Mermaid diagrams | Lazy |
| jsPDF | 2.5.1 | Legacy raster PDF | Lazy |
| html2canvas | 1.4.1 | PDF/PNG capture | Lazy |
| Pako | 2.1.0 | Share compression, diagram encoding | Lazy |
| JoyPixels / emoji-toolkit | 9.0.1 | Emoji shortcodes | Lazy |
| ABCJS | 6.5.2 | ABC notation and playback | Lazy |
| Leaflet | 1.9.4 | GeoJSON/TopoJSON maps | Lazy |
| TopoJSON | 3.0.2 | TopoJSON conversion | Lazy |
| Three.js | r128 | STL 3D rendering | Lazy |
| STLLoader / OrbitControls | Three r128 examples | STL loading and controls | Lazy |
| D3 | 7 | Markmap | Lazy |
| Markmap | 0.18.12 | Markmap diagrams | Lazy |
| Yjs | 13.6.10 via esm.sh | Live Share document sync | Lazy |

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

## Sanitization

The main preview path calls DOMPurify with additional tags and attributes needed by renderers:

- Additional tags include `mjx-container` and `input`.
- Additional attributes include `id`, `class`, `style`, `align`, `type`, `checked`, `disabled`, `data-original-code`, `role`, `aria-labelledby`, and `aria-describedby`.
- Allowed URI schemes include HTTP(S), `mailto:`, `tel:`, `blob:`, relative URLs, and safe non-script values.

Export paths use similar expanded sanitizer settings for SVG/math capture. Scripts and unsafe event handlers are still removed.

## Service Worker and PWA

`sw.js` uses cache name `markdown-viewer-cache-v3.9.0`.

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

Responses set `Cache-Control: no-store` and `Access-Control-Allow-Origin: *`. Stored records contain content, mode, title, createdAt, and size. Invalid ids, missing content, oversized content, missing KV binding, and unknown routes return JSON errors.

## Live Room API

`functions/live-room/[[room]].js` supports WebSocket upgrades only. It validates room and secret length, requires `LIVE_ROOMS`, and forwards to a Durable Object chosen by `roomName + ":" + secret`.

See [Live Share Cloudflare](Live-Share-Cloudflare) for runtime flow and limits.

## Docker and Nginx

The root Docker build serves static files with Nginx on port 80. The repository includes `docker-compose.yml` exposing `8080:80`.

Security headers configured in Docker/Nginx documentation include:

- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`

Self-hosters should make sure `preview-worker.js`, `sw.js`, `manifest.json`, `script.js`, `styles.css`, `assets/`, `workers/`, and `functions/` or their Cloudflare equivalents are deployed according to the features they intend to use.

## Neutralino Desktop Configuration

Current `desktop-app/neutralino.config.json` highlights:

| Setting | Value |
| :--- | :--- |
| `applicationId` | `com.markdownviewer.desktop` |
| `version` | `3.9.0` |
| `documentRoot` | `/resources/` |
| `url` | `/` |
| `enableServer` | `true` |
| `enableNativeAPI` | `true` |
| `tokenSecurity` | `one-time` |
| Default window | 1280 x 720 |
| Minimum window | 400 x 200 |
| Logging | disabled |
| Binary name | `markdown-viewer` |
| Neutralino binary/client version | 6.5.0 |

Native allowlist:

- `app.exit`
- `os.showOpenDialog`
- `os.showSaveDialog`
- `os.showMessageBox`
- `os.open`
- `os.setTray`
- `os.execCommand`
- `filesystem.readFile`
- `filesystem.writeFile`
- `storage.setData`
- `storage.getData`

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

`prepare.js` copies root app files into `desktop-app/resources`, downloads and verifies libraries, rewrites dynamic library paths, strips web-only SEO metadata, and prepares an offline-capable desktop resource bundle.
