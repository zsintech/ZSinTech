const fs = require('fs');
const path = require('path');

const CACHE_PATH = path.join(__dirname, '..', 'data', 'og-cache.json');
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000;

let memoryCache = null;

function loadCache() {
  if (memoryCache) return memoryCache;
  try {
    memoryCache = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'));
  } catch {
    memoryCache = {};
  }
  return memoryCache;
}

function saveCache() {
  fs.writeFileSync(CACHE_PATH, JSON.stringify(memoryCache, null, 2));
}

function normalizeUrl(raw) {
  if (!raw || typeof raw !== 'string') return null;
  const trimmed = raw.trim();
  if (!trimmed || trimmed.includes('linkedin.com/in/') && trimmed.includes('recent-activity')) {
    return null;
  }
  if (trimmed.startsWith('http')) return trimmed;
  return `https://${trimmed}`;
}

function extractMetaImage(html) {
  const patterns = [
    /<meta[^>]+property=["']og:image(?::secure_url)?["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image(?::secure_url)?["']/i,
    /<meta[^>]+name=["']twitter:image(?::src)?["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image(?::src)?["']/i,
  ];
  for (const re of patterns) {
    const match = html.match(re);
    if (match?.[1]) {
      const img = decodeHtmlEntities(match[1].trim());
      if (isValidOgImage(img)) return img;
    }
  }
  return null;
}

function isDirectImageUrl(url) {
  if (!url || typeof url !== 'string') return false;
  const u = url.toLowerCase();
  if (isGenericSiteOg(url)) return false;
  return (
    /\.(jpg|jpeg|png|webp|gif|svg)(\?|$)/i.test(u) ||
    u.includes('i.ibb.co') ||
    u.includes('images.pexels.com') ||
    u.includes('upload.wikimedia.org') ||
    u.includes('media.licdn.com')
  );
}

function isGenericSiteOg(url) {
  if (!url || typeof url !== 'string') return false;
  const u = url.toLowerCase();
  return (
    u.includes('og-image') ||
    u.includes('og_image') ||
    u.includes('/logo.') ||
    u.includes('favicon')
  );
}

/** Hotlink-fragile or expiring URLs that should not be used as card covers. */
function isUnreliableCoverUrl(url) {
  if (!url || typeof url !== 'string') return false;
  const u = url.toLowerCase();
  return (
    u.includes('cdninstagram.com') ||
    u.includes('scontent.cdninstagram.com') ||
    u.includes('opengraph.githubassets.com') ||
    u.includes('avatars.githubusercontent.com') ||
    isGenericSiteOg(url)
  );
}

function isValidOgImage(url) {
  if (!url || typeof url !== 'string') return false;
  const u = url.toLowerCase();
  if (u.includes('favicon')) return false;
  if (u.includes('/logos/')) return false;
  if (u.endsWith('.ico')) return false;
  if (u.includes('static.licdn.com/scds/common')) return false;
  if (u.includes('apple-touch-icon')) return false;
  return true;
}

function decodeHtmlEntities(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

async function fetchHtml(url, redirects = 0) {
  if (redirects > 5) return null;
  const res = await fetch(url, {
    redirect: 'manual',
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; ZsinTechBot/1.0; +https://zsintech.onrender.com)',
      Accept: 'text/html,application/xhtml+xml',
    },
  });

  if (res.status >= 300 && res.status < 400) {
    const next = res.headers.get('location');
    if (!next) return null;
    const resolved = new URL(next, url).href;
    return fetchHtml(resolved, redirects + 1);
  }

  if (!res.ok) return null;
  const text = await res.text();
  return { html: text, finalUrl: res.url || url };
}

async function getOgImage(rawUrl) {
  const url = normalizeUrl(rawUrl);
  if (!url) return null;

  const cache = loadCache();
  const hit = cache[url];
  if (hit && Date.now() - hit.fetchedAt < CACHE_TTL_MS) {
    return hit.image || null;
  }

  try {
    const result = await fetchHtml(url);
    if (!result) {
      cache[url] = { image: null, fetchedAt: Date.now() };
      saveCache();
      return null;
    }
    const image = extractMetaImage(result.html);
    if (image && isValidOgImage(image)) {
      cache[url] = { image, fetchedAt: Date.now(), pageUrl: result.finalUrl };
      saveCache();
      return image;
    }
    cache[url] = { image: null, fetchedAt: Date.now() };
    saveCache();
    return null;
  } catch {
    cache[url] = { image: null, fetchedAt: Date.now() };
    saveCache();
    return null;
  }
}

function externalUrlForItem(item) {
  return normalizeUrl(item.projectUrl || item.url || item.linkedinUrl);
}

async function resolveCoverImage(item, { allowPexelsFallback = false } = {}) {
  if (item.heroImageUrl && isDirectImageUrl(item.heroImageUrl) && !isUnreliableCoverUrl(item.heroImageUrl)) {
    return item.heroImageUrl;
  }

  if (
    item.ogImageUrl &&
    isValidOgImage(item.ogImageUrl) &&
    isDirectImageUrl(item.ogImageUrl) &&
    !isUnreliableCoverUrl(item.ogImageUrl)
  ) {
    return item.ogImageUrl;
  }

  if (item.imageSource === 'pexels' && item.heroImageUrl && allowPexelsFallback) {
    return item.heroImageUrl;
  }

  const external = externalUrlForItem(item);
  if (external) {
    const og = await getOgImage(external);
    if (og && isValidOgImage(og) && !isGenericSiteOg(og)) return og;
  }

  if (
    item.heroImageUrl &&
    !String(item.heroImageUrl).includes('favicon') &&
    !isUnreliableCoverUrl(item.heroImageUrl)
  ) {
    return item.heroImageUrl;
  }

  if (allowPexelsFallback && item.heroImageUrl) return item.heroImageUrl;
  return null;
}

async function enrichWithCover(item, options) {
  const coverUrl = await resolveCoverImage(item, options);
  return coverUrl ? { ...item, heroImageUrl: coverUrl, coverUrl } : item;
}

async function enrichMany(items, options) {
  return Promise.all(items.map((item) => enrichWithCover(item, options)));
}

module.exports = {
  getOgImage,
  resolveCoverImage,
  enrichWithCover,
  enrichMany,
  externalUrlForItem,
  normalizeUrl,
  isValidOgImage,
  isDirectImageUrl,
  isGenericSiteOg,
  isUnreliableCoverUrl,
};
