import { spawn } from 'node:child_process';
import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import process from 'node:process';
import { chromium } from '@playwright/test';

const ROOT = new URL('../', import.meta.url);
const ROOT_PATH = fileURLToPath(ROOT);
const OUTPUT_DIR = new URL('../assets/i18n/', import.meta.url);
const PORT = 4197;
const HOST = '127.0.0.1';
const FORCE = process.argv.includes('--force');
const REPAIR_TERMS = process.argv.includes('--repair-terms');

const LOCALES = {
  zh: 'zh-CN',
  ja: 'ja',
  ko: 'ko',
  pt: 'pt',
  es: 'es',
  fr: 'fr',
  de: 'de',
  ru: 'ru',
  it: 'it',
  tr: 'tr',
  pl: 'pl',
  tw: 'zh-TW',
  uk: 'uk'
};

const PROTECTED_TERMS = [
  { pattern: /Markdown Viewer/g, token: '__MVTERM_MARKDOWN_VIEWER__', value: 'Markdown Viewer' },
  { pattern: /Markdown/g, token: '__MVTERM_MARKDOWN__', value: 'Markdown' }
];

const CURATED_OVERRIDES = {
  de: {
    'Report': 'Melden', 'Light mode': 'Heller Modus', 'Use light mode': 'Hellen Modus verwenden',
    'Use dark mode': 'Dunklen Modus verwenden'
  },
  es: {
    'Report': 'Informar', 'Light mode': 'Modo claro', 'Use light mode': 'Usar modo claro'
  },
  fr: {
    'Workspace menu': 'Menu de l’espace de travail', 'Document tools': 'Outils de document',
    'Report': 'Signaler', 'Light mode': 'Mode clair', 'Use light mode': 'Utiliser le mode clair'
  },
  it: {
    'Report': 'Segnala', 'Light mode': 'Modalità chiara', 'Use light mode': 'Usa la modalità chiara',
    'Close menu': 'Chiudi il menu'
  },
  ja: { 'Settings': '設定', 'About': '情報' },
  ko: { 'Explorer': '탐색기' },
  pl: {
    'New': 'Nowy', 'Report': 'Zgłoś', 'Theme': 'Motyw', 'Light mode': 'Tryb jasny'
  },
  pt: {
    'Report': 'Relatar', 'Light mode': 'Modo claro', 'Share Snapshot': 'Compartilhar captura'
  },
  ru: {
    'New': 'Новый', 'Report': 'Сообщить', 'About': 'О программе',
    'Review mode': 'Режим рецензирования', 'Live Share': 'Совместный доступ'
  },
  tr: {
    'Sync scrolling': 'Kaydırmayı eşitle', 'Report': 'Bildir', 'Light mode': 'Açık mod',
    'Dark mode': 'Koyu mod', 'Use light mode': 'Açık modu kullan', 'Use dark mode': 'Koyu modu kullan'
  },
  tw: {
    'View': '檢視', 'Split': '分割', 'Actions': '操作', 'New': '新增', 'New document': '新增文件',
    'From files': '從檔案', 'From GitHub': '從 GitHub', 'Export': '匯出', 'Live Share': '即時共享',
    'Report': '回報問題', 'Theme': '外觀', 'Light mode': '淺色模式', 'Use light mode': '使用淺色模式',
    'Private mode': '隱私模式', 'Reset workspace': '重設工作區', 'Explorer': '檔案總管'
  },
  uk: {
    'View': 'Вигляд', 'Split': 'Розділити', 'Review mode': 'Режим рецензування', 'New': 'Новий',
    'Export': 'Експортувати', 'Live Share': 'Спільний доступ наживо', 'Report': 'Повідомити',
    'About': 'Про програму', 'Theme': 'Оформлення', 'Use light mode': 'Увімкнути світлу тему',
    'Use dark mode': 'Увімкнути темну тему'
  },
  zh: {
    'View': '视图', 'Split': '分屏', 'Actions': '操作', 'New': '新建', 'New document': '新建文档',
    'From files': '从文件', 'From GitHub': '从 GitHub', 'Live Share': '实时共享', 'Report': '报告问题',
    'Theme': '外观', 'Light mode': '浅色模式', 'Use light mode': '使用浅色模式',
    'Private mode': '隐私模式', 'Explorer': '文件资源管理器'
  }
};

const EXTRA_STRINGS = [
  'All changes saved', 'Saving...', 'Saved', 'Copied!', 'Copy failed',
  'Import complete', 'Import completed with errors', 'Import failed', 'Preparing import…',
  'No data is stored', 'Data is stored locally', 'Use light mode', 'Use dark mode',
  'Turn private mode off', 'Turn private mode on', 'Enable synchronized scrolling',
  'Disable synchronized scrolling', 'Open Explorer', 'Close Explorer', 'Expand all folders',
  'Collapse all folders', 'Show sidebar', 'Hide sidebar', 'Open menu', 'Close menu',
  'No recent documents', 'No matching files', 'No files selected', 'No document is open',
  'File created', 'Folder created', 'File renamed', 'Folder renamed', 'File deleted',
  'Folder deleted', 'Files deleted', 'Items deleted', 'Download started', 'Link copied',
  'Session active', 'Session ended', 'Connection lost', 'Reconnect', 'Try again',
  'Loading...', 'Loading emojis...', 'Fetching file tree...', 'Searching...',
  'Open comments and suggestions', 'Close comments and suggestions',
  'Add feedback', 'Edit feedback', 'Delete feedback', 'Resolve feedback',
  'Workspace menu', 'Document tools', 'Sync scrolling', 'Copy Markdown', 'Review mode',
  'Light mode', 'Dark mode', 'Private mode', 'Reset workspace', 'Share Snapshot',
  'Live Share', 'Report an issue', 'About Markdown Viewer', 'Workspace settings',
  'file', 'files', 'folder', 'folders', 'item', 'items', 'selected', 'of', 'match',
  'matches', 'open review item', 'open review items', 'No results', 'No documents open',
  'Delete {{0}} selected items?', 'Delete “{{0}}”?', '{{0}} of {{1}} files',
  '{{0}} file selected', '{{0}} files selected', '{{0}} words', '{{0}} characters',
  '{{0}} Min Read', 'Welcome, {{0}}', 'Importing {{0}}', '{{0}} imported',
  'Failed to import {{0}}', 'Move {{0}} selected items', 'Rename {{0}}',
  'Close {{0}}', 'Download {{0}}', 'Duplicate {{0}}'
];

function normalize(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function isTranslatable(value) {
  const text = normalize(value);
  if (text.length < 2 || text.length > 420) return false;
  if (!/\p{L}/u.test(text)) return false;
  if (/^(?:https?:\/\/|data:|blob:|#[0-9a-f]{3,8}$)/i.test(text)) return false;
  if (/<[^>]*>|(?:class|aria-hidden|data-[\w-]+)=|\\u200b/i.test(text)) return false;
  if (/[{}]=>|document\.|window\.|console\.|function\s*\(/.test(text)) return false;
  if (/^[-+*/=<>()[\]{}.,:;!?\\|_`~]+$/.test(text)) return false;
  return true;
}

function extractScriptStrings(source) {
  const values = new Set();
  const patterns = [
    /(?:alert|confirm|prompt|announceToScreenReader)\(\s*(['"])([^'"\r\n]{2,420})\1/g,
    /\.(?:textContent|title|placeholder)\s*=\s*(['"])([^'"\r\n]{2,420})\1/g,
    /setAttribute\(\s*['"](?:title|aria-label|placeholder)['"]\s*,\s*(['"])([^'"\r\n]{2,420})\1/g
  ];
  patterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(source))) {
      const value = normalize(match[2]);
      if (isTranslatable(value)) values.add(value);
    }
  });

  const templatePattern = /\.(?:textContent|innerHTML|title|placeholder)\s*=\s*`([^`]{2,500})`/g;
  let templateMatch;
  while ((templateMatch = templatePattern.exec(source))) {
    let placeholderIndex = 0;
    const template = templateMatch[1].replace(/\$\{[^}]+\}/g, () => `{{${placeholderIndex++}}}`);
    const templateValue = normalize(template.replace(/<[^>]+>/g, ' '));
    if (isTranslatable(templateValue)) values.add(templateValue);
    templateMatch[1].split(/\$\{[^}]+\}/g).forEach(part => {
      const value = normalize(part);
      if (isTranslatable(value)) values.add(value);
    });
  }
  return values;
}

function decodeHtml(value) {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&gt;', '>')
    .replaceAll('&lt;', '<')
    .replaceAll('&amp;', '&');
}

function restoreProtectedTerms(value) {
  return PROTECTED_TERMS.reduce(
    (result, term) => result.replaceAll(term.token, term.value),
    value
  );
}

function chunkStrings(strings) {
  const chunks = [];
  let current = [];
  let currentLength = 0;
  strings.forEach(value => {
    const cost = value.length + 40;
    if (current.length && (current.length >= 24 || currentLength + cost > 3400)) {
      chunks.push(current);
      current = [];
      currentLength = 0;
    }
    current.push(value);
    currentLength += cost;
  });
  if (current.length) chunks.push(current);
  return chunks;
}

async function translateChunk(values, targetLanguage) {
  const protectedValues = values.map(value => PROTECTED_TERMS.reduce(
    (result, term) => result.replace(term.pattern, term.token),
    value
  ));
  const markup = protectedValues.map((value, index) => `[[MV${index}]] ${value}`).join('\n');
  const params = new URLSearchParams({
    client: 'gtx', sl: 'en', tl: targetLanguage, dt: 't', q: markup
  });
  const response = await fetch(`https://translate.googleapis.com/translate_a/single?${params}`);
  if (!response.ok) throw new Error(`Translation request failed: ${response.status}`);
  const payload = await response.json();
  const translatedMarkup = (payload[0] || []).map(segment => segment[0] || '').join('');
  const translated = new Array(values.length);
  const pattern = /\[\[MV(\d+)\]\]\s*([\s\S]*?)(?=\s*\[\[MV\d+\]\]|$)/gi;
  let match;
  while ((match = pattern.exec(translatedMarkup))) {
    translated[Number(match[1])] = decodeHtml(match[2]).replace(/\[\[MV\d+\]\]/gi, '').trim();
  }
  if (translated.some(value => typeof value !== 'string' || !value)) {
    if (values.length === 1) {
      return [restoreProtectedTerms(decodeHtml(translatedMarkup).replace(/\[\[MV\d+\]\]/gi, '').trim())];
    }
    return Promise.all(values.map(async value => (await translateChunk([value], targetLanguage))[0]));
  }
  return translated.map(restoreProtectedTerms);
}

async function repairProtectedTerms() {
  const englishCatalog = JSON.parse(await readFile(new URL('en.json', OUTPUT_DIR), 'utf8'));
  const sources = Object.keys(englishCatalog).filter(source =>
    PROTECTED_TERMS.some(term => source.includes(term.value))
  );
  for (const [locale, targetLanguage] of Object.entries(LOCALES)) {
    const outputUrl = new URL(`${locale}.json`, OUTPUT_DIR);
    const catalog = JSON.parse(await readFile(outputUrl, 'utf8'));
    const chunks = chunkStrings(sources);
    for (let index = 0; index < chunks.length; index += 4) {
      const group = chunks.slice(index, index + 4);
      const translatedGroup = await Promise.all(group.map(chunk => translateChunk(chunk, targetLanguage)));
      group.forEach((chunk, groupIndex) => {
        chunk.forEach((source, itemIndex) => { catalog[source] = translatedGroup[groupIndex][itemIndex]; });
      });
    }
    Object.assign(catalog, CURATED_OVERRIDES[locale] || {});
    await writeFile(outputUrl, JSON.stringify(catalog, null, 2) + '\n', 'utf8');
    console.log(`Repaired protected terms for ${locale}.`);
  }
}

async function waitForServer(url) {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch (_) {}
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  throw new Error('Timed out waiting for the local application server.');
}

async function collectDomStrings() {
  console.log('Collecting interface strings from the application…');
  const server = spawn('python', ['-m', 'http.server', String(PORT), '--bind', HOST], {
    cwd: ROOT_PATH, stdio: 'ignore', windowsHide: true
  });
  let browser;
  try {
    await waitForServer(`http://${HOST}:${PORT}/`);
    browser = await chromium.launch({ channel: process.platform === 'win32' ? 'msedge' : undefined });
    const page = await browser.newPage({ locale: 'en-US' });
    await page.goto(`http://${HOST}:${PORT}/`, { waitUntil: 'domcontentloaded', timeout: 30_000 });
    await page.waitForTimeout(1_500);
    return await page.evaluate(() => {
      const values = new Set();
      const skipSelector = [
        'script', 'style', 'code', 'pre', 'textarea', '.editor-pane', '.preview-pane',
        '#markdown-editor', '#markdown-preview', '.lang-select-item', '[data-i18n-skip]'
      ].join(',');
      const normalize = value => String(value || '').replace(/\s+/g, ' ').trim();
      const add = value => {
        const text = normalize(value);
        if (text) values.add(text);
      };
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) {
        if (node.parentElement?.closest(skipSelector)) continue;
        add(node.nodeValue);
      }
      document.querySelectorAll('*').forEach(element => {
        if (element.closest('.lang-select-item, [data-i18n-skip]')) return;
        ['title', 'aria-label', 'placeholder'].forEach(name => add(element.getAttribute(name)));
      });
      return Array.from(values);
    });
  } finally {
    if (browser) await browser.close();
    server.kill();
  }
}

async function main() {
  if (REPAIR_TERMS) {
    await repairProtectedTerms();
    return;
  }
  const domStrings = await collectDomStrings();
  const scriptSource = await readFile(new URL('../script.js', import.meta.url), 'utf8');
  const allStrings = new Set([...domStrings, ...extractScriptStrings(scriptSource), ...EXTRA_STRINGS]);
  const strings = Array.from(allStrings).map(normalize).filter(isTranslatable).sort((a, b) => a.localeCompare(b));

  await mkdir(OUTPUT_DIR, { recursive: true });
  const englishCatalog = Object.fromEntries(strings.map(value => [value, value]));
  await writeFile(new URL('en.json', OUTPUT_DIR), JSON.stringify(englishCatalog, null, 2) + '\n', 'utf8');
  console.log(`Collected ${strings.length} English interface strings.`);

  for (const [locale, targetLanguage] of Object.entries(LOCALES)) {
    const outputUrl = new URL(`${locale}.json`, OUTPUT_DIR);
    if (!FORCE) {
      try {
        await access(outputUrl);
        console.log(`Keeping existing ${locale} catalog.`);
        continue;
      } catch (_) {}
    }

    const catalog = {};
    const chunks = chunkStrings(strings);
    console.log(`Translating ${locale}: ${chunks.length} batches...`);
    for (let index = 0; index < chunks.length; index += 4) {
      const group = chunks.slice(index, index + 4);
      const translatedGroup = await Promise.all(group.map(chunk => translateChunk(chunk, targetLanguage)));
      group.forEach((chunk, groupIndex) => {
        const translations = translatedGroup[groupIndex];
        chunk.forEach((source, itemIndex) => { catalog[source] = translations[itemIndex] || source; });
      });
      await new Promise(resolve => setTimeout(resolve, 120));
    }
    Object.assign(catalog, CURATED_OVERRIDES[locale] || {});
    await writeFile(outputUrl, JSON.stringify(catalog, null, 2) + '\n', 'utf8');
  }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
