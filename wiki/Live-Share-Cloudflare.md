# Live Share Cloudflare Architecture

Live Share uses a temporary Cloudflare-backed room instead of browser-local storage,
BroadcastChannel, or peer discovery. The normal Markdown editor remains local-first.

## Runtime Flow

1. A host starts Live Share for the active tab.
2. The browser creates a Yjs document for that tab and opens a WebSocket to
   `/live-room/<room-id>?secret=<room-secret>`.
3. Cloudflare Pages forwards that WebSocket to a `LIVE_ROOMS` Durable Object.
4. The Durable Object relays Yjs updates, sync requests, participant presence,
   cursor presence, participant leave events, and host session-end events.
5. Participants opening the invite link create a separate live tab, join the same
   room, request the current Yjs state, and render remote participants/cursors.
6. New invite links do not embed the Markdown document body. The URL contains
   only the room id, room secret, and tab title so link length does not grow with
   document size.

## Cloudflare Requirements

- The Pages project must expose a Durable Object binding named `LIVE_ROOMS`.
- The Durable Object class is `LiveRoom` in `workers/live-room-worker.js`.
- `wrangler.live-room.toml` deploys the worker and Durable Object migration.
- The root Pages project does not require a checked-in `wrangler.toml`.
- Live room document state is not written to KV or a database. Rooms are
  temporary and exist only while participants are connected.

`SHARE_KV` is still used only for normal snapshot share links, not for live
editing transport.
