const staticJournalism = require('../data/auis-voice');
const staticWritings = require('../data/writings');
const {
  enrichMany,
  enrichWithCover,
  isGenericSiteOg,
  isDirectImageUrl,
  isUnreliableCoverUrl,
} = require('./linkPreview');

function pickJournalismCover(item) {
  const staticItem =
    staticJournalism.getBySlug(item.slug) ||
    staticJournalism.getAll().find((a) => a.id === item.id);

  const candidates = [item.heroImageUrl, staticItem?.heroImageUrl, item.ogImageUrl].filter(Boolean);

  for (const url of candidates) {
    if (isGenericSiteOg(url)) continue;
    if (isDirectImageUrl(url) || url.includes('i.ibb.co')) return url;
  }
  return null;
}

const PEXELS_ONLY_TYPES = new Set(['essay', 'story', 'research', 'note', 'idea']);

function usesPexels(item) {
  if (item.imageSource === 'external') return false;
  if (item.imageSource === 'pexels') return true;
  if (item.type && PEXELS_ONLY_TYPES.has(item.type)) return true;
  if (item.category && !item.url && !item.linkedinUrl && !item.projectUrl) return true;
  return false;
}

async function enrichActivities(items) {
  return enrichMany(items, { allowPexelsFallback: false });
}

async function enrichJournalism(items) {
  return items.map((item) => {
    const cover = pickJournalismCover(item);
    return cover ? { ...item, heroImageUrl: cover, coverUrl: cover } : { ...item, heroImageUrl: null, coverUrl: null };
  });
}

async function enrichArticlesRead(items) {
  return enrichMany(items, { allowPexelsFallback: false });
}

function pickProjectCover(item) {
  const staticItem =
    staticWritings.getBySlug(item.slug) ||
    staticWritings.getAll().find((w) => w.id === item.id);

  const candidates = [
    item.heroImageUrl,
    staticItem?.heroImageUrl,
    item.ogImageUrl,
    staticItem?.ogImageUrl,
  ].filter(Boolean);

  for (const url of candidates) {
    if (isUnreliableCoverUrl(url)) continue;
    if (isDirectImageUrl(url) || url.includes('i.ibb.co')) return url;
  }
  return null;
}

async function enrichProject(project) {
  if (usesPexels(project)) return project;
  const cover = pickProjectCover(project);
  if (cover) return { ...project, heroImageUrl: cover, coverUrl: cover };
  return enrichWithCover(project, { allowPexelsFallback: false });
}

async function enrichProjects(items) {
  const projects = items.filter((i) => i.type === 'project');
  const enriched = projects.map((project) => {
    if (usesPexels(project)) return project;
    const cover = pickProjectCover(project);
    return cover
      ? { ...project, heroImageUrl: cover, coverUrl: cover }
      : { ...project, heroImageUrl: null, coverUrl: null };
  });
  const map = new Map(enriched.map((p) => [p.id || p.slug, p]));
  return items.map((i) => map.get(i.id || i.slug) || i);
}

module.exports = {
  enrichActivities,
  enrichJournalism,
  enrichArticlesRead,
  enrichProjects,
  enrichProject,
  usesPexels,
};
