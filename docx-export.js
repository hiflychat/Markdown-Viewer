// Word (.docx) export for Markdown Viewer
// Uses ESM dynamic import from esm.sh (already allowlisted in CSP connect-src/script-src)
(function () {
  function getMdViewerMarkdown() {
    try {
      if (typeof markdownEditor !== 'undefined' && markdownEditor && typeof markdownEditor.value === 'string') {
        return markdownEditor.value;
      }
    } catch (e) {}
    var ta = document.getElementById('markdown-editor') || document.querySelector('textarea#editor');
    if (ta && typeof ta.value === 'string') return ta.value;
    return '';
  }

  function getMdViewerFilename() {
    try {
      if (typeof getExportFilename === 'function') return getExportFilename('docx', 'document.docx');
    } catch (e) {}
    return 'document.docx';
  }

  async function handleExportDocx(evt) {
    evt.preventDefault();
    try {
      var md = getMdViewerMarkdown();
      if (!md) { alert('No document content to export.'); return; }

      var mod = await import('https://esm.sh/markdown-docx@1.2.0');
      var markdownDocx = mod.default || mod;
      var Packer = mod.Packer;
      if (!Packer) {
        var docxMod = await import('https://esm.sh/docx@8.5.0');
        Packer = docxMod.Packer;
      }

      var doc = await markdownDocx(md, { gfm: true });
      var blob = await Packer.toBlob(doc);

      var filename = getMdViewerFilename();
      if (!/\.docx$/i.test(filename)) filename = filename.replace(/\.[^.]+$/, '') + '.docx';

      if (window.saveAs) {
        window.saveAs(blob, filename);
      } else {
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url; a.download = filename;
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
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
