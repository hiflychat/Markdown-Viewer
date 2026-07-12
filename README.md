<div align="center">

  <img src="assets/icon.jpg" alt="Markdown Viewer Logo" width="100" />

  <h1>Markdown Viewer - Online Markdown Editor with Live Preview</h1>

  **A browser-based Markdown editor, viewer, previewer, and reader.**

  *Open, read, edit, and preview `.md` files with split-screen live Markdown preview, sync scrolling, GitHub-Flavored Markdown, diagrams, maps, 3D STL previews, ABC notation playback, PDF/HTML/PNG export, and multi-tab support across web, desktop, and Docker.*

  [![License](https://img.shields.io/github/license/ThisIs-Developer/Markdown-Viewer?style=flat-square&color=red)](https://github.com/ThisIs-Developer/Markdown-Viewer/blob/main/LICENSE)
  [![Latest Release](https://img.shields.io/github/v/release/ThisIs-Developer/Markdown-Viewer?style=flat-square&color=FF6B00)](https://github.com/ThisIs-Developer/Markdown-Viewer/releases)
  [![Last Commit](https://img.shields.io/github/last-commit/ThisIs-Developer/Markdown-Viewer?style=flat-square)](https://github.com/ThisIs-Developer/Markdown-Viewer/commits/main)
  [![Stars](https://img.shields.io/github/stars/ThisIs-Developer/Markdown-Viewer?style=flat-square&color=dfb317)](https://github.com/ThisIs-Developer/Markdown-Viewer/stargazers)

  <p>
    <a href="https://codewiki.google/github.com/thisis-developer/markdown-viewer" target="_blank" rel="noopener noreferrer">
      <img src="https://img.shields.io/badge/CodeWiki-Explore-4285F4?logo=wikipedia&logoColor=white&style=flat" alt="CodeWiki" />
    </a>
    <a href="https://deepwiki.com/ThisIs-Developer/Markdown-Viewer" target="_blank" rel="noopener noreferrer">
      <img src="https://deepwiki.com/badge.svg" alt="DeepWiki" />
    </a>
  </p>

  🌐 **English** • [简体中文](locales/README_zh.md) • [日本語](locales/README_ja.md) • [한국어](locales/README_ko.md) • <a href="wiki/Localization.md">More Languages</a>

  [Live Production Demo](https://markdownviewer.pages.dev/) • [Wiki](wiki/Home.md#start-here) • [Issue Tracker](https://github.com/ThisIs-Developer/Markdown-Viewer/issues) • [Releases](https://github.com/ThisIs-Developer/Markdown-Viewer/releases)

</div>

## Table of Contents

<details>
  <summary>📂 <b>Table of Contents</b> (Click to expand)</summary>
  <br />

  - [About the Project](#about-the-project)
  - [Try It Quickly](#try-it-quickly)
  - [Key Features](#key-features)
  - [Markdown Editing and Live Preview](#markdown-editing-and-live-preview)
  - [Diagrams and Visual Content](#diagrams-and-visual-content)
  - [Sharing, Collaboration, and Export](#sharing-collaboration-and-export)
  - [System Architecture](#system-architecture)
    - [Core File Walkthrough](#core-file-walkthrough)
  - [Getting Started & Installation](#getting-started--installation)
  - [Usage Guide & Keyboard Shortcuts](#usage-guide--keyboard-shortcuts)
  - [Project Directory Structure](#project-directory-structure)
  - [Built With (Technology Stack)](#built-with-technology-stack)
  - [Privacy](#privacy)
  - [Security and Privacy Controls](#security-and-privacy-controls)
  - [Contributing & Code Quality](#contributing--code-quality)
  - [Showcase & Community Projects](#showcase--community-projects)
  - [Contributors](#contributors)
  - [📈 Development Journey](#-development-journey)
  - [License](#license)
  - [Contact & Support](#contact--support)
</details>

---

## About the Project

**Markdown Viewer** is an open source, browser-based Markdown editor and viewer for `.md` and `.markdown` files. It combines plain Markdown editing with a live GitHub-style preview, document tabs, diagram-as-code tools, math, exports, sharing, and desktop/web deployment options.

Most editing, previewing, autosave, local file import, settings, and export work happens on your device. Network features are explicit and documented. No login is required.

<p align="center">
  <img src="https://github.com/user-attachments/assets/ccfd7772-8874-4470-9282-7b0327a87bbd" alt="Markdown Viewer - Live split-screen Markdown editor and previewer with GFM rendering, tabbed multi-document workspace, and dark theme support" width="90%" />
</p>

## Try It Quickly

1. Open the [live online Markdown editor](https://markdownviewer.pages.dev/).
2. Drag in a `.md` or `.markdown` file, or start writing in the editor.
3. Use the live preview, **Insert Diagram & More**, export menu, Share Snapshot, or Live Share depending on your workflow.

For detailed notes, see the wiki sections for [features](wiki/Features.md#product-summary), [privacy](wiki/Home.md#privacy-at-a-glance), [sharing](wiki/Features.md#share-markdown-with-snapshot-links), [exports](wiki/Features.md#export-markdown-to-pdf-html-png-and-md), and [desktop](wiki/Features.md#desktop-app).

## Key Features

Markdown Viewer handles the usual Markdown basics, but its real value is helping users build richer technical documents without leaving the editor.

1. **GitHub-Flavored Markdown (GFM)**: write normal Markdown with tables, task lists, strikethrough, autolinks, code blocks, alerts, footnotes, and live preview. Most Markdown editors cover the basics; the features below show what Markdown Viewer adds for richer technical documents.
2. **Advanced Diagram Support & More**: one **Insert Diagram & More** button opens visual templates, previews, and insert-ready examples so users can add complex content without memorizing every syntax.

   - **Mermaid**: create flowcharts, sequences, Gantt charts, state diagrams, and docs-friendly architecture visuals.
   - **PlantUML**: add sequence, class, use case, and engineering diagrams for software design notes.
   - **Graphviz**: render DOT graphs for trees, dependency maps, and network relationships.
   - **D2**: build clean diagrams-as-code with modern layout output.
   - **Vega-Lite**: describe charts and data visualizations directly inside Markdown.
   - **Markmap**: turn nested Markdown lists into mind maps for planning and study notes.
   - **WaveDrom**: document timing diagrams and signal waveforms for hardware or protocol work.
   - **Map**: preview GeoJSON and TopoJSON data without leaving the document.
   - **STL 3D Model Renderer**: inspect 3D model previews alongside technical notes.
   - **ABC Music Player & Sheet Music Viewer**: render sheet music and play notation in the browser.

3. **Live Share Temporary Rooms**: collaborate in real time for quick editing sessions, reviews, or pair-writing, with server-checked host, editable, and view-only capabilities.
4. **Share Snapshot Links**: create view-only or editable point-in-time links when you need to send a document state quickly. Large stored snapshots expire after 90 days.
5. **LaTeX Math Notation**: render inline and display formulas with MathJax, useful for math-heavy notes, papers, and technical explanations.
6. **Markdown to PDF, HTML & PNG Export**: export Markdown, HTML, PNG, Browser Print / Save as PDF, or Legacy Raster PDF for documents that need sharing, printing, or archiving.
7. **Privacy and Security Controls**: use Private mode to prevent document persistence, clear saved local data, and rely on sanitized previews, hardened export HTML, and restricted desktop native APIs.

For the full feature list, details, limitations, and privacy notes, see the [features reference](wiki/Features.md#product-summary).

## Markdown Editing and Live Preview

- Write plain Markdown in a focused editor while the live preview renders GitHub-Flavored Markdown, syntax highlighting, math, alerts, footnotes, tables, task lists, and sanitized HTML.
- Work with multiple Markdown documents in tabs, rename or duplicate tabs, import local Markdown files, and keep normal workspace state in browser storage.
- Use WYSIWYG-style toolbar helpers for common Markdown syntax while keeping full control of the plain-text Markdown source.
- Preview large documents with debounced rendering and a background worker so typing stays responsive.

## Diagrams and Visual Content

Markdown Viewer works well as a Markdown diagram editor for technical notes, docs, hardware writeups, music snippets, and data-heavy documents.

- **Mermaid, PlantUML, Graphviz / DOT, and D2** for flowcharts, sequence diagrams, class diagrams, architecture sketches, dependency graphs, and diagram-as-code workflows.
- **Vega-Lite and Markmap** for Markdown charts, data visualization, and mind maps.
- **WaveDrom** for timing diagrams and signal documentation.
- **GeoJSON and TopoJSON maps** for location-aware Markdown documents.
- **STL 3D model previews** for inspecting 3D model snippets alongside notes.
- **ABC notation** for sheet music rendering and browser playback.

<p align="center">
  <img src="https://github.com/user-attachments/assets/15c87e8c-43f0-4a4f-a4d7-81e98ba5c1cb" alt="Diagram Support & More" width="90%" />
  <img src="https://github.com/user-attachments/assets/4341040b-eddd-40fa-8d1f-ba6ec9ac1010" alt="ABC Music Notation & Audio Synthesis" width="90%" />
  <img src="https://github.com/user-attachments/assets/606b1666-7359-4872-bb98-e3ae37b65ca9" alt="STL 3D Model Renderer" width="90%" />
</p>

## Sharing, Collaboration, and Export

- **Share Snapshot** creates quick links for point-in-time Markdown sharing. Small documents can stay in the URL hash; larger snapshots use temporary Cloudflare KV storage for up to 90 days when that backend is configured. Snapshot links are bearer links: anyone who has the link can open it.
<p align="center">
  <img src="https://github.com/user-attachments/assets/e62ca1a0-011a-4b01-90f9-e72638b9a6d5" alt="Share Snapshot" width="90%" />
</p>

- **Live Share rooms** provide temporary collaborative editing through Cloudflare Durable Objects, with server-checked host, editable, and view-only capabilities. They are useful for reviews and pair-writing, but they are not end-to-end encrypted.
<p align="center">
  <img src="https://github.com/user-attachments/assets/4d7a72c7-8eec-48df-9f66-49fe9f205d4f" alt="Live Share rooms" width="90%" />
</p>

- **Markdown export** downloads the raw `.md` document.
- **HTML export** creates a standalone rendered document.
- **PDF export** includes Browser Print / Save as PDF and Legacy Raster PDF modes.
- **PNG export** captures the rendered preview as an image.

---

## System Architecture

Markdown Viewer is a client-side single-page app. `script.js` controls the UI, `preview-worker.js` compiles Markdown off-thread, and `sw.js` handles offline-capable caching.

### Core File Walkthrough

1. **`index.html`**: App layout and script/style entry points.
2. **`script.js`**: Tabs, editor state, preview updates, imports, exports, sharing, and UI behavior.
3. **`styles.css`**: Layout, themes, preview styling, and print styles.
4. **`preview-worker.js`**: Off-thread Markdown parsing and syntax highlighting.
5. **`sw.js`**: Offline-capable asset caching.

---

## Getting Started & Installation

### 💻 Option 1: Quick Local Run (No Installation)
Run through a local HTTP server instead of opening `index.html` with `file://`:
1. Clone or download the repository to your local machine.
2. Open a terminal in the repository folder.
3. Run `python -m http.server 8080` or `npx serve . -p 8080`.
4. Open **[http://localhost:8080](http://localhost:8080)** in your browser.

---

### 🐳 Option 2: Docker Container Deployment
Run the app in a container:

**Pre-built Docker Image (GHCR):**
```bash
docker run -d \
  --name markdown-viewer \
  -p 8080:80 \
  --restart unless-stopped \
  ghcr.io/thisis-developer/markdown-viewer:latest
```
Open **[http://localhost:8080](http://localhost:8080)** in your browser.

**Local Docker Compose Build:**
```bash
git clone https://github.com/ThisIs-Developer/Markdown-Viewer.git
cd Markdown-Viewer
docker compose up -d
```
Open **[http://localhost:8080](http://localhost:8080)** in your browser.

---

### 🖥️ Option 3: Building the Desktop Application
Build the Neutralinojs desktop app from source:
1. Clone the repository and navigate into the `desktop-app/` directory:
   ```bash
   cd desktop-app
   ```
2. Run the install, prepare, and build commands:
   ```powershell
   # Install node dependencies and download Neutralino binaries
   npm install
   node setup-binaries.js

   # Synchronize resources with the main web app
   node prepare.js

   # Build/compile the release application
   npm run build
   ```

Prebuilt binaries are available from [Releases](https://github.com/ThisIs-Developer/Markdown-Viewer/releases).

---

## Usage Guide & Keyboard Shortcuts

Read the [usage guide](wiki/Usage-Guide.md#workspace-layout-for-editing-and-previewing-markdown) for workflows, editor controls, exports, sharing, and keyboard shortcuts.

---

## Project Directory Structure

```
Markdown-Viewer/
+-- index.html              # Main web app shell
+-- script.js               # App logic and UI controller
+-- styles.css              # App and preview styles
+-- preview-worker.js       # Markdown preview worker
+-- sw.js                   # Service worker cache behavior
+-- assets/                 # App images and icons
+-- functions/              # Cloudflare Pages Functions
+-- workers/                # Live Share Worker source
+-- desktop-app/            # Neutralinojs desktop build
+-- locales/                # Localized README summaries
+-- wiki/                   # Project documentation
+-- Dockerfile              # Docker image setup
+-- docker-compose.yml      # Local container run config
+-- wrangler.toml           # Cloudflare deployment config
+-- README.md               # Main project overview
+-- CHANGELOG.md            # Release history
+-- LICENSE                 # Apache License 2.0
```

---

## Built With (Technology Stack)

<p align="left">
  <a href="https://developer.mozilla.org/en-US/docs/Web/HTML"><img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5" /></a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/CSS"><img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3" /></a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript" /></a>
  <a href="https://getbootstrap.com"><img src="https://img.shields.io/badge/Bootstrap-7952B3?style=flat-square&logo=bootstrap&logoColor=white" alt="Bootstrap" /></a>
  <a href="https://neutralino.js.org"><img src="https://img.shields.io/badge/NeutralinoJS-FFA500?style=flat-square&logo=neutralinojs&logoColor=white" alt="NeutralinoJS" /></a>
</p>

Core stack: HTML, CSS, JavaScript, Bootstrap, Bootstrap Icons, Neutralinojs, Marked.js, Highlight.js, DOMPurify, MathJax, Mermaid, Leaflet, Three.js, ABCJS, Markmap, Yjs, jsPDF, html2canvas, and Cloudflare Pages/Workers.

For dependency loading behavior, CDN use, and local desktop library copies, see the [client library notes](wiki/Configuration.md#client-libraries).

Some advanced diagram engines use remote renderers such as PlantUML, Kroki, or mermaid.ink when needed. See the [diagram renderer notes](wiki/Features.md#insert-diagrams-charts-maps-models-and-music) for renderer behavior and privacy details.

---

## Privacy

Markdown Viewer is not a cloud workspace. Normal typing, preview rendering, local file import, tab autosave, theme settings, and most exports happen on your device. No login is required, and the app does not implement analytics, telemetry, ads, or tracking cookies.

Network use is user-triggered for features such as GitHub import, remote diagram renderers, Share Snapshot, Live Share, CDN libraries, and external document assets. Private mode stops saving document content and workspace state locally; the About dialog also provides a Clear local data action. For the full reference, read the [data handling summary](wiki/Features.md#data-handling-summary).

## Security and Privacy Controls

- Preview HTML is sanitized before insertion, and exported HTML includes a restrictive CSP plus SRI metadata for its external assets.
- Cloudflare Pages deployments use `_headers` for CSP, clickjacking protection, referrer and permissions policies, and no-sniff protection; sensitive paths are redirected to 404 responses.
- Stored Share Snapshot API CORS is limited to the production app, `null`, and local development origins. Stored responses are `no-store`, and creators receive a deletion token from the API.
- STL rendering rejects oversized sources, non-finite geometry, and excessive vertex counts before WebGL rendering.
- The Neutralino desktop build removes the default `os.execCommand` exposure and keeps native APIs on an explicit allowlist. See the [security model](wiki/Features.md#security-model) and [configuration reference](wiki/Configuration.md#share-api).

---

## Contributing & Code Quality

We welcome community contributions! Please check [contributing before changing code](wiki/Contributing.md#before-changing-code) before creating a pull request.

### Core Workflow Summary:
1.  **Fork** the repository and create a feature branch (`git checkout -b feature/your-feature`).
2.  **Verify Code Style:** Maintain a clean 2-space indentation style across HTML, CSS, and JS files. Ensure raw HTML structures are semantic. Avoid direct DOM queries inside processing workers.
3.  **Conventional Commits:** Write clear commit messages prefixed with `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `perf:`, or `chore:`.
4.  **Testing:** Test your revisions across Chrome, Firefox, Edge, and Safari viewports.

---

## Showcase & Community Projects

*   **[Markdown Desk](https://github.com/jhrepo/markdown-desk):** A native macOS wrapper built using Tauri that adds native file-system handlers, menu bar integration, and auto-reload capabilities.

---

## Contributors

Thanks to everyone who has contributed to Markdown Viewer.

<a href="https://github.com/ThisIs-Developer/Markdown-Viewer/graphs/contributors" target="_blank" rel="noopener noreferrer">
  <img src="https://contrib.rocks/image?repo=ThisIs-Developer/Markdown-Viewer" alt="Contributors" />
</a>

---

## 📈 Development Journey

Markdown Viewer started as a small personal project on a PC: a simple Markdown viewer built with curiosity, mistakes, fixes, and a lot of care. The <a href="https://a1b91221.markdownviewer.pages.dev/" target="_blank" rel="noopener noreferrer">original version</a> is still online, and it remains the heart of the project.

The current <a href="https://markdownviewer.pages.dev/" target="_blank" rel="noopener noreferrer">Markdown Viewer</a> grew through community feedback, issues, PRs, screenshots, GIFs, suggestions, and real documentation workflows. The technical progress matters, but the journey is also emotional: people helped shape the app into what it is today.

---

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for the complete terms and conditions.

---

## Contact & Support

Developed and maintained by **[ThisIs-Developer](https://github.com/ThisIs-Developer)**.
*   **Bug Reports & Requests:** [Submit an Issue](https://github.com/ThisIs-Developer/Markdown-Viewer/issues)
*   **Documentation:** [Wiki start here](wiki/Home.md#start-here)
