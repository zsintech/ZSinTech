const SIZES = {
  thumb: 480,
  card: 800,
  hero: 1600,
  full: 1920,
};

/** Normalize Pexels (or any) image URL to a target width for fast SSR pages. */
function pexelsUrl(url, size = 'hero') {
  if (!url) return '';
  const w = SIZES[size] || SIZES.hero;

  if (url.includes('images.pexels.com')) {
    const base = url.split('?')[0];
    return `${base}?auto=compress&cs=tinysrgb&w=${w}&fit=crop`;
  }

  if (
    url.includes('media.licdn.com') ||
    url.includes('static.licdn.com') ||
    url.includes('voice.auis.edu.krd') ||
    url.includes('auisvoice') ||
    url.includes('storiesofkhasa.xyz') ||
    url.includes('pbs.twimg.com') ||
    url.includes('i.ibb.co') ||
    url.includes('upload.wikimedia.org') ||
    url.includes('opengraph.githubassets.com') ||
    url.includes('cdninstagram.com')
  ) {
    return url.split('?')[0];
  }

  if (/\.(png|jpe?g|webp|gif|svg)(\?|$)/i.test(url)) {
    return url.split('?')[0];
  }

  if (url.includes('w=')) return url.replace(/w=\d+/, `w=${w}`);
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}w=${w}`;
}

function normalizePexelsResult(result, size = 'hero') {
  if (!result?.url) return null;
  return {
    ...result,
    url: pexelsUrl(result.url, size),
  };
}

module.exports = { pexelsUrl, normalizePexelsResult, SIZES };
