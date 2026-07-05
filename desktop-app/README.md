# Markdown Viewer Desktop App

This folder contains the Neutralino desktop wrapper for Markdown Viewer v3.9.0. It turns the browser-based Markdown editor, viewer, and reader into a desktop app for opening local `.md` files, using split live preview, exporting documents, and working with native file dialogs. It reuses the root web app and adds native window lifecycle handling, desktop storage mirroring, and an offline-prepared resource bundle.

For the complete product behavior and privacy reference, see [../wiki/Features.md](../wiki/Features.md).

## Architecture

The desktop app shares the same core product code as the browser version:

- `../index.html`
- `../script.js`
- `../styles.css`
- `../preview-worker.js`
- `../assets/`

`prepare.js` copies those files into `desktop-app/resources`, rewrites paths for Neutralino, downloads external libraries into `resources/libs`, verifies SHA-384 integrity where available, and strips web-only SEO metadata from the desktop HTML.

Desktop-only files:

- `neutralino.config.json`: Neutralino runtime configuration and native API allowlist.
- `setup-binaries.js`: Idempotent Neutralino binary setup.
- `resources/js/main.js`: window close confirmation, tray setup, launch-file import, and external-open handling.
- `resources/js/neutralino.js`: Neutralino client library.

## Desktop Behavior

- Local editing, preview, document tabs, exports, and settings stay on the local machine.
- Normal app state is stored in localStorage and mirrored to Neutralino storage.
- Native Markdown/HTML save and Markdown open flows use Neutralino dialogs and filesystem APIs.
- A Markdown file passed as a launch argument is loaded into the editor.
- The app asks before closing the window.
- Prepared desktop resources load dynamic libraries from local `/libs/...` paths.

Network features still use the network when invoked: GitHub import, stored Share Snapshot, Live Share, remote diagram rendering, external images, and external links.

## Development

Requirements:

- Node.js and npm.
- Internet access for first setup and dependency preparation.

Run:

```bash
cd desktop-app
npm install
npm run setup
npm run dev
```

`npm run setup` downloads Neutralino binaries and runs `prepare.js`. Binaries are cached in `bin/` and refreshed when the configured Neutralino version changes.

## Build

```bash
npm run build
```

The current build script runs:

```bash
npx -y @neutralinojs/neu@11.7.0 build --release --clean
```

Build output is written under `desktop-app/dist/`.

## Configuration Highlights

| Setting | Value |
| :--- | :--- |
| Application id | `com.markdownviewer.desktop` |
| Version | `3.9.0` |
| Document root | `/resources/` |
| Default window | 1280 x 720 |
| Minimum window | 400 x 200 |
| Native API | Enabled |
| Token security | One-time |
| Logging | Disabled |
| Neutralino binary/client version | 6.5.0 |

Native APIs are intentionally allowlisted: app exit, open/save dialogs, message boxes, external URL open, tray setup, command execution, file read/write, and storage get/set.

## Docker Build

The desktop folder includes Docker files for building desktop artifacts in a container:

```bash
docker compose up --build
```

Check the compose file for the mounted output path used by the current build.

## Releases

Prebuilt desktop assets are published through GitHub Releases. Release workflows run setup, preparation, build, and checksum generation.

Unsigned desktop binaries may trigger Windows SmartScreen or macOS quarantine prompts. See [../wiki/Desktop-App.md](../wiki/Desktop-App.md) for platform launch notes.

## License

Markdown Viewer is licensed under the Apache License 2.0. Neutralinojs is licensed under MIT; see the bundled Neutralino license file in this folder.
