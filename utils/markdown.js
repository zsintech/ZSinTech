const { marked } = require('marked');

marked.setOptions({
  breaks: true,
  gfm: true,
});

function toMarkdown(text) {
  if (!text) return '';
  // Plain prose from Netlify — wrap paragraphs if not already markdown/HTML
  if (!/^#|<[a-z]|^\*\*|^-\s/m.test(text)) {
    return text
      .split(/\n{2,}/)
      .map(p => p.trim())
      .filter(Boolean)
      .join('\n\n');
  }
  return text;
}

function renderMarkdown(text) {
  return marked(toMarkdown(text));
}

module.exports = { renderMarkdown, toMarkdown };
