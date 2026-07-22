# Localization and Internationalization

Markdown Viewer has a client-side translation dictionary in `script.js`. It changes visible UI labels, toolbar text, modal titles, stats labels, and common messages without sending text to a translation service.

## Supported Locales

| Code | Language |
| :--- | :--- |
| `en` | English |
| `zh` | Simplified Chinese |
| `ja` | Japanese |
| `ko` | Korean |
| `pt` | Portuguese (Brazil) |
| `es` | Spanish |
| `fr` | French |
| `de` | German |
| `ru` | Russian |
| `it` | Italian |
| `tr` | Turkish |
| `pl` | Polish |
| `tw` | Traditional Chinese |
| `uk` | Ukrainian |

## Selection Order

The app chooses a language in this order:

1. URL query parameter, such as `?lang=pt`.
2. Hash query parameter when present in a shared URL.
3. Saved `localStorage` key `app-lang`.
4. Browser language from `navigator.language`.
5. English fallback.

When a user picks a language from the dropdown, the app saves `app-lang` and updates the URL query parameter.

## What Gets Translated

The dictionary covers:

- Main toolbar labels.
- Import/export labels.
- Share Snapshot and Live Share labels.
- View mode labels.
- Stats labels.
- Theme labels.
- Modal titles for help, about, share, rename, link, reference, image, table, and find/replace.
- Loading messages for emoji lookup and GitHub file loading.
- Placeholder text.

Some strings remain English because they come from dynamic renderer output, browser APIs, third-party libraries, generated filenames, external services, or low-level error messages.

## Dictionary Shape

Translations are stored in `I18N_DICTS`:

```javascript
{
  title: "Markdown Viewer",
  import: "Import",
  export: "Export",
  exportMd: "Markdown (.md)",
  exportHtml: "HTML",
  exportPdf: "PDF",
  exportPng: "Image (.png)",
  copy: "Copy",
  shareSnapshot: "Share Snapshot",
  liveShare: "Live Share",
  reset: "Reset",
  editor: "Editor",
  split: "Split",
  preview: "Preview",
  minRead: "Min Read",
  words: "Words",
  chars: "Chars",
  darkMode: "Dark Mode",
  lightMode: "Light Mode",
  findReplace: "Find & Replace"
}
```

Add new keys to every locale when introducing new visible UI text. If a key is missing, code should fall back to English or a hard-coded safe label.

## Contributor Checklist

- Regenerate interface catalogs from the repository root with `node assets/i18n/generate-ui-locales.mjs`.
- Update `I18N_DICTS` for all supported locales.
- Update desktop resources by running the desktop prepare step.
- Check desktop and mobile menus.
- Check modal titles and buttons.
- Check Share Snapshot and Live Share labels.
- Check `?lang=` URLs.
- Keep language names readable in both desktop and mobile dropdowns.

## Privacy

Localization is local. The app does not send document text or UI text to machine translation APIs.
