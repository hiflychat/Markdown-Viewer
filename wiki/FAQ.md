# Frequently Asked Questions

## General

### What is Markdown Viewer?

Markdown Viewer is a premium browser-based Markdown editor, viewer, reader, and previewer for opening `.md` files, writing in plain Markdown, and using a split-screen live preview with sync scrolling. It also includes document tabs, rich Markdown rendering, math, diagrams, maps, STL models, ABC music notation, export tools, optional sharing, and a desktop app.

### Is it free?

Yes. The project is open source under the Apache License 2.0.

### Do I need an account?

No. There is no login, subscription, account system, analytics identity, or cloud workspace account. You can use the editor as a no-signup Markdown reader and previewer.

### Is it a WYSIWYG Markdown editor?

Not in the strict sense. Markdown Viewer uses a plain-text Markdown editor plus a rendered live preview. The toolbar helps insert Markdown syntax, but you do not directly edit the rendered preview like a full rich text or Typora-style WYSIWYG editor.

### Can it open local .md files?

Yes. You can open `.md` and `.markdown` files with the file picker or drag and drop. The desktop app can also open Markdown files through native file dialogs and command-line file arguments.

## Privacy and Data

### Does my Markdown leave my device?

Normal typing, previewing, local file import, tab autosave, and most exports happen on your device. Content can leave your device when you use explicit network features:

- GitHub import contacts GitHub.
- Remote diagram renderers can receive diagram source.
- Large Share Snapshot links upload a temporary copy to Cloudflare KV.
- Live Share relays real-time updates through Cloudflare Durable Objects.
- External images, links, map tiles, and CDN libraries can be requested by the browser.

### Do you collect analytics or telemetry?

No analytics, telemetry, ads, tracking pixels, or app-specific cookies are implemented in the codebase.

### What does the app store locally?

The app stores normal tabs, active tab id, untitled-tab counter, theme/direction/view settings, language selection, scroll sync state, and Find and Replace dock preference. Web storage uses browser `localStorage`; the desktop app mirrors selected values into Neutralino storage.

### Are Share Snapshot links private?

They are bearer links. Anyone with the link can open the snapshot.

Small snapshots keep compressed content inside the URL hash. Large snapshots use `/api/share`, which stores content, mode, title, creation time, and size in Cloudflare KV for 90 days. Editable snapshots are not collaborative; they only let the recipient edit their opened copy.

### Is Live Share saved permanently?

No. Live Share uses a temporary Cloudflare Durable Object room as a relay. It does not write the live document to KV or a database. While active, the room relays document updates, display names, presence, cursors, sync messages, leave messages, and session-end messages.

### Is Live Share end-to-end encrypted?

No end-to-end encryption is implemented. The room id and secret are included in the invite link, and the Cloudflare Durable Object relays messages. Treat Live Share links like private bearer links.

### How do I clear local data?

Use the app's Reset button to clear saved documents, or clear the site's storage from browser settings/developer tools. Clearing site data also removes cached app assets and any saved settings for that origin.

## Editing and Rendering

### What Markdown does it support?

It supports standard Markdown, GitHub-Flavored Markdown (GFM), tables, task lists, footnotes, definition lists, superscript, subscript, highlight syntax, raw sanitized HTML, GitHub alerts, YAML frontmatter in exports, LaTeX math, Mermaid, PlantUML, D2, Graphviz, Vega-Lite, WaveDrom, Markmap, GeoJSON, TopoJSON, STL, and ABC notation.

### Why do some diagrams need the internet?

Mermaid, Markmap, maps, STL, ABC, and MathJax use client-side libraries. PlantUML, D2, Graphviz, Vega-Lite, WaveDrom, and some insertion previews can use remote renderers such as PlantUML, Kroki, or mermaid.ink. Those remote services need network access and receive the diagram source.

### Why does the preview update in stages?

Base Markdown renders first. Advanced content such as MathJax, diagrams, maps, STL, ABC, and remote renderers runs after the base HTML has been sanitized and inserted. On large documents the app may use a Web Worker and segmented DOM patching to keep typing responsive.

### Why did a shared document open in a temporary tab?

Share Snapshot and Live Share tabs are temporary by design. They are stripped from persistent tab storage so opening someone else's link does not silently save their document into your workspace.

## Import and Export

### Can I import local files?

Yes. Import `.md`, `.markdown`, or `text/markdown` files through the file picker or drag and drop. The app scans the first 8 KB for null bytes and rejects likely binary files.

### Can I import private GitHub repositories?

No. The GitHub importer only uses public GitHub URLs and does not ask for tokens.

### Why are only 30 GitHub files shown?

The importer limits repository/folder results to the first 30 Markdown files to keep the modal and network requests manageable.

### Which PDF export should I use?

Use Browser Print for most documents. It is faster and better for long text. Use Legacy Raster PDF when you need the app's page-break planning for images, tables, math, and diagrams, but expect higher memory use and possible browser canvas limits.

### Why are images missing from PDF or PNG export?

Canvas-based exports require images to be loaded and CORS-compatible. A remote image that blocks cross-origin canvas capture may not appear in raster PDF/PNG output.

### Why does exported PDF differ from the preview?

Browser Print depends on the browser print engine. Legacy Raster PDF captures an off-screen layout to canvas, applies page-break changes, scales some content, and may move blocks to avoid bad page cuts. That can differ from the live preview.

## Installation and Offline Use

### Can I run it offline?

Yes, with limits.

- The web/PWA build can work offline after the app shell and CDN libraries have been loaded and cached.
- First use of CDN-based libraries still requires network access unless they are already cached.
- The prepared desktop build bundles external libraries into `resources/libs` and points dynamic library loading there.
- Features that inherently use the network, such as GitHub import, stored Share Snapshot, Live Share, remote diagram rendering, and external images, still need connectivity.

### Can I open `index.html` directly?

Use a local server instead. `file://` can block Web Workers and Service Workers, which breaks important rendering and offline behavior. Run `python -m http.server 8080` or `npx serve . -p 8080`.

### Why will the desktop app not launch on macOS?

The binaries are unsigned, so macOS may quarantine them. You can right-click and choose Open, or run:

```bash
xattr -d com.apple.quarantine markdown-viewer-mac_universal
chmod +x markdown-viewer-mac_universal
./markdown-viewer-mac_universal
```

## Troubleshooting

### The preview is blank. What should I check?

Check the browser console for blocked scripts or network errors, verify JavaScript is enabled, and hard refresh. If you are using `file://`, serve the app from localhost instead.

### Math does not render. Why?

MathJax loads when math markers are detected. Check your LaTeX syntax and network/cache state if this is the first time using math in the web build.

### Mermaid or another diagram shows an error. What now?

Check the fence language and diagram syntax. For remote diagram engines, also check network access to the renderer. Remote requests time out and retry, but they cannot render while the service is unreachable.

### Live Share says the room expired.

The room may have ended, the host may have left, the invite may be stale, or the participant may not have received initial sync within the join timeout. Ask the host to start a new session.
