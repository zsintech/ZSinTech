function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function linkify(text) {
  return text.replace(
    /(https?:\/\/[^\s<>"')\]]+)/g,
    '<a href="$1" target="_blank" rel="noopener">$1</a>'
  );
}

/** Render idea notes: headings, paragraphs, inline URLs. */
function formatIdeaNotes(notes) {
  if (!notes) return '';

  const blocks = notes.split('\n\n');
  const html = [];

  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;

    if (/^###\s+/.test(trimmed)) {
      html.push(`<h4>${escapeHtml(trimmed.replace(/^###\s+/, ''))}</h4>`);
      continue;
    }
    if (/^##\s+/.test(trimmed)) {
      html.push(`<h3>${escapeHtml(trimmed.replace(/^##\s+/, ''))}</h3>`);
      continue;
    }
    if (/^#\s+/.test(trimmed)) {
      html.push(`<h3>${escapeHtml(trimmed.replace(/^#\s+/, ''))}</h3>`);
      continue;
    }

    const withLinks = linkify(escapeHtml(trimmed));
    html.push(`<p>${withLinks}</p>`);
  }

  return html.join('\n');
}

module.exports = { formatIdeaNotes, escapeHtml, linkify };
