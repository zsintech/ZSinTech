const meta = require('../data/writing-ideas-meta');
const rich = require('../data/writing-ideas-rich');

function normalizeTitle(value) {
  return String(value || '').toLowerCase().replace(/\s+/g, ' ').trim();
}

function parseArticlesFromNotes(notes, links = []) {
  if (!notes) return [];

  const articles = [];
  const usedUrls = new Set();

  for (const block of notes.split('\n\n')) {
    const trimmed = block.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const urlMatch = trimmed.match(/(https?:\/\/[^\s]+)/);
    const url = urlMatch ? urlMatch[1] : null;

    const dashParts = trimmed.split(/\s[—–-]\s/);
    if (dashParts.length >= 2) {
      const title = dashParts[0].replace(/https?:\/\/[^\s]+/g, '').trim();
      let excerpt = dashParts.slice(1).join(' — ').replace(/https?:\/\/[^\s]+/g, '').trim();
      if (title.length > 3 && title.length < 180) {
        articles.push({ title, url: url || '', excerpt });
        if (url) usedUrls.add(url);
        continue;
      }
    }

    if (url && trimmed.length < 220) {
      const title = trimmed.replace(url, '').trim() || url;
      articles.push({ title, url, excerpt: '' });
      usedUrls.add(url);
    }
  }

  for (const link of links) {
    if (!link.url || usedUrls.has(link.url)) continue;
    articles.push({ title: link.title, url: link.url, excerpt: '' });
  }

  return articles;
}

function dedupeArticles(articles) {
  const seen = new Set();
  return articles.filter((a) => {
    const key = a.url || normalizeTitle(a.title);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function enrichWritingIdea(idea) {
  if (!idea) return null;

  const extra = meta[idea.id] || {};
  const richContent = rich[idea.id] || {};
  const links = [...(idea.links || []), ...(richContent.links || [])];
  const parsedArticles = parseArticlesFromNotes(
    [idea.notes, richContent.notes].filter(Boolean).join('\n\n'),
    links
  );
  const articles = dedupeArticles([
    ...(extra.articles || []),
    ...parsedArticles,
  ]);

  const concepts = extra.concepts || [];
  const concept = extra.concept || richContent.concept || null;
  const workspaceLabel = extra.workspaceLabel || richContent.workspaceLabel || null;
  const sections = [...(extra.sections || []), ...(richContent.sections || [])];
  const asides = richContent.asides || [];
  const quotes = richContent.quotes || [];

  const notes = [idea.notes, richContent.notes].filter(Boolean).join('\n\n');

  return {
    ...idea,
    notes,
    concept,
    concepts,
    workspaceLabel,
    sections,
    asides,
    quotes,
    articles,
    articleCount: articles.length,
    conceptCount: concepts.length,
  };
}

function enrichWritingIdeas(ideas) {
  return ideas.map(enrichWritingIdea);
}

module.exports = { enrichWritingIdea, enrichWritingIdeas, parseArticlesFromNotes };
