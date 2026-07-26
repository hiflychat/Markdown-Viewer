// Word (.docx) export for Markdown Viewer
// Converts the rendered HTML preview (not raw markdown) into DOCX using
// the official Pandoc WASM build (pandoc.org/app), giving high-fidelity
// conversion for headings, tables, code blocks, highlights, footnotes, etc.
(function () {
  var pandocModPromise = null;

  function loadPandoc() {
    if (!pandocModPromise) {
            pandocModPromise = import('/pandoc/pandoc.js');
    }
    return pandocModPromise;
  }

  function getPreviewHtml() {
    var el = document.getElementById('markdown-preview') ||
      document.querySelector('.markdown-preview') ||
      document.querySelector('[aria-label="Rendered Markdown live preview"]');
    if (el) return el.innerHTML;
    return '';
  }

  function getMdViewerFilename() {
    try {
      if (typeof getExportFilename === 'function') return getExportFilename('docx', 'document.docx');
    } catch (e) {}
    return 'document.docx';
  }

  function buildFullHtml(bodyHtml) {
    return '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>' +
      bodyHtml + '</body></html>';
  }

  async function handleExportDocx(evt) {
    evt.preventDefault();
    try {
      var bodyHtml = getPreviewHtml();
      if (!bodyHtml || !bodyHtml.trim()) {
        alert('No document content to export.');
        return;
      }

      var pandoc = await loadPandoc();
      var fullHtml = buildFullHtml(bodyHtml);

      var files = {};
      var result = await pandoc.convert(
        {
          reader: 'html',
          writer: 'docx',
          'output-file': 'output.docx'
        },
        fullHtml,
        files
      );

      if (!files['output.docx']) {
        throw new Error((result && result.stderr) || 'Pandoc produced no output');
      }

      var blob = files['output.docx'];
      var filename = getMdViewerFilename();
      if (!/\.docx$/i.test(filename)) filename = filename.replace(/\.[^.]+$/, '') + '.docx';

      if (window.saveAs) {
        window.saveAs(blob, filename);
      } else {
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error('Word export failed:', err);
      alert('Word export failed: ' + (err && err.message ? err.message : err));
    }
  }

  function initDocxExport() {
    var btn = document.getElementById('export-docx');
    if (!btn) return;
    btn.addEventListener('click', handleExportDocx);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDocxExport);
  } else {
    initDocxExport();
  }
})();
