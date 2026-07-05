# Usage Guide

This guide explains how to use Markdown Viewer v3.9.0 as a premium browser-based Markdown editor, viewer, reader, and live preview tool. For deeper implementation notes and privacy details, see [Features](Features).

## Workspace Layout

The app has five main areas:

| Area | What It Does |
| :--- | :--- |
| Header | Shows app name, stats, view controls, import/export, copy, sharing, language, and theme controls. |
| Tab bar | Holds up to 20 normal document tabs, plus temporary shared/live tabs. |
| Formatting toolbar | Inserts Markdown syntax, opens helper modals, starts find/replace, and toggles fullscreen/help/about. |
| Editor pane | Plain-text Markdown textarea with line numbers, custom undo/redo, list continuation, and find highlights. |
| Preview pane | Sanitized rendered Markdown with math, diagrams, maps, models, music, alerts, and syntax highlighting. |

Use the view buttons to switch between Editor, Split, and Preview. Split view is the main live Markdown preview workflow: type, paste, or open Markdown on one side and read the rendered result on the other. Sync scrolling can keep the source and preview aligned while you write. Drag the divider to change the pane widths. The app prevents either side from becoming too narrow. On small screens, the mobile menu exposes the same main actions without forcing a cramped split layout.

## Tabs and Autosave

- Click New Tab to create a document.
- Rename a tab from its menu or rename action.
- Duplicate, delete, or reorder tabs from the tab UI.
- Closing the last normal tab resets to a clean document.
- Reset clears the saved workspace.
- Normal tabs autosave to local browser storage or desktop storage.
- Temporary Share Snapshot and Live Share tabs are not saved to the recipient's workspace.

Storage is local unless you explicitly use a network feature such as GitHub import, Share Snapshot storage, or Live Share.

## Editing Tools

The toolbar can:

- Format text as bold, italic, strikethrough, quote, inline code, fenced code, terminal block, headings, lists, and horizontal rules.
- Insert links, images, reference links, tables, date/time stamps, emoji shortcodes, symbols/entities, GitHub alerts, and diagram templates.
- Change selected text to title case, uppercase, or lowercase.
- Insert left, center, or right aligned HTML blocks.
- Switch document direction between LTR and RTL.
- Open Find and Replace, Help, About, and fullscreen.

The editor also supports list continuation on Enter, two-space indent on Tab, outdent on Shift+Tab, and custom undo/redo. View-only shared tabs block editing actions and keep reading, find, help, and fullscreen available.

## Find and Replace

Open Find and Replace with the toolbar, `Ctrl+F`, or `Cmd+F`. Open replacement focus with `Ctrl+H` or `Cmd+H`.

Supported options:

- Case-sensitive search.
- Whole-word search.
- Regular expressions.
- Regex capture replacements such as `$1` and `$<name>`.
- Preserve-case replacement.
- Search only within the selected text.
- Scope matching to the whole document, headings, code, Mermaid, or LaTeX.
- Replace current match or replace all.
- Diff preview before bulk replacement.
- Floating, docked, draggable, and resettable panel positions.

Scope matching uses Marked's lexer and is best-effort for unusual Markdown.

## Importing Documents

### Local Files

Use Import > From files, the mobile import button, or drag and drop to open local Markdown files.

- Supported file types are `.md`, `.markdown`, and `text/markdown`.
- Extension matching is case-insensitive.
- Dragging over the app shows a drop overlay.
- The app scans the first 8 KB for null bytes and rejects likely binary files.
- Local file content stays on the device unless you later share it.

### GitHub

Use Import > From GitHub and paste one of these URL types:

- `https://github.com/owner/repo`
- `https://github.com/owner/repo/tree/main/docs`
- `https://github.com/owner/repo/blob/main/README.md`
- `https://raw.githubusercontent.com/owner/repo/main/README.md`

Direct Markdown file URLs import immediately. Repository and folder URLs query GitHub's public API, show a tree of Markdown files, and let you import selected files into separate tabs. If more than 30 Markdown files exist, only the first 30 are shown.

GitHub import sends the repository/path request to GitHub and only works for public content. The app does not ask for GitHub credentials.

## Exporting

Export names use the active tab title when possible.

| Export | Behavior | Main Limitations |
| :--- | :--- | :--- |
| Markdown | Saves the raw `.md` text. | Browser downloads or desktop native save dialog only. |
| HTML | Saves standalone rendered HTML with styles and renderer support hooks. | External content referenced by the document may still load remotely when opened. |
| PDF: Browser Print | Calls `window.print()` and lets the browser save/print. Recommended for most long documents. | Browser print engines vary; complex images/diagrams may differ. |
| PDF: Legacy Raster | Uses `html2canvas` and `jsPDF` with page-break planning. | Memory-heavy for very long documents; cross-origin images need CORS. |
| PNG | Captures the rendered document to a PNG. | Browser canvas limits apply; cross-origin images need CORS. |

Raster PDF and PNG exports render Mermaid, ABC, and MathJax in an off-screen capture before saving. Export progress can be cancelled.

## Share Snapshot

Use Share Snapshot when you want to send a point-in-time copy.

1. Choose View only or Editable.
2. Click Share.
3. Copy the generated link.

View only opens the document in preview mode and hides editing. Editable opens the copy in split mode so the recipient can edit their own local copy. It is not real-time collaboration.

Small documents are compressed into the URL hash as `#share=...`. Large documents, or documents whose encoded URL would be too long, are stored through `/api/share` and opened with `#id=...`. Stored snapshots use Cloudflare KV for 90 days and can contain up to 500,000 characters.

Anyone with the link can open the snapshot. Shared snapshot tabs are temporary and are not saved into the recipient's workspace.

## Live Share

Use Live Share when you want a temporary real-time room.

1. Click Live Share.
2. Enter or accept a display name.
3. Choose Can edit or View only.
4. Start the session.
5. Copy the invite link after the room starts.

Live Share sends real-time Yjs updates through a Cloudflare Durable Object. It does not store the document in KV or a database. The invite URL contains a room id, room secret, and title, not the full document body.

Participants get a temporary live tab, presence avatars, and live cursor indicators. The host can end the session for everyone. Rooms are limited to 64 WebSocket participants and 1 MB live messages.

## Rendering Advanced Content

Use fenced code blocks for advanced renderers:

- `mermaid` for Mermaid diagrams.
- `plantuml`, `d2`, `graphviz`/`dot`, `vega-lite`, `wavedrom`, and `markmap` for diagrams and charts.
- `geojson` and `topojson` for maps.
- `stl` for 3D models.
- `abc` for sheet music and playback.
- `math` for display math.

Mermaid, Markmap, maps, STL, ABC, and MathJax use client-side libraries. PlantUML, D2, Graphviz, Vega-Lite, WaveDrom, and some diagram previews can send source to remote rendering endpoints such as PlantUML, Kroki, or mermaid.ink.

## Keyboard Shortcuts

| Action | Shortcut |
| :--- | :--- |
| Save/export Markdown | `Ctrl+S` / `Cmd+S` |
| Copy selected text, or whole Markdown when nothing is selected | `Ctrl+C` / `Cmd+C` |
| Toggle scroll sync in Split view | `Ctrl+Shift+S` / `Cmd+Shift+S` |
| Find | `Ctrl+F` / `Cmd+F` |
| Replace | `Ctrl+H` / `Cmd+H` |
| Undo | `Ctrl+Z` / `Cmd+Z` |
| Redo | `Ctrl+Shift+Z`, `Cmd+Shift+Z`, `Ctrl+Y`, or `Cmd+Y` |
| New tab | Desktop: `Ctrl+T` / `Cmd+T`; web and desktop: `Alt+Shift+T` |
| Close tab | Desktop: `Ctrl+W` / `Cmd+W`; web and desktop: `Alt+Shift+W` |
| Indent | `Tab` |
| Outdent | `Shift+Tab` |
| Close modals, panels, tab menus, and diagram modals | `Escape` |

Browser shortcuts are intentionally not all intercepted on the web. For example, web tab creation/closing uses `Alt+Shift+T/W` so the app does not hijack browser tab shortcuts.
