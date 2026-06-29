/**
 * Fetch og:image from external URLs for activities, journalism, articles, projects.
 * Run: node scripts/fetch-og-images.js
 */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { getOgImage, externalUrlForItem } = require('../utils/linkPreview');
const { BY_ID } = require('../data/topic-images');

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function replaceField(src, id, field, value) {
  const re = new RegExp(`(id: '${id}'[\\s\\S]*?${field}:\\s*)'[^']*'`, 'm');
  if (!re.test(src)) return { src, ok: false };
  return { src: src.replace(re, `$1'${value.replace(/'/g, "\\'")}'`), ok: true };
}

function upsertField(src, id, field, value) {
  const hasField = new RegExp(`id: '${id}'[\\s\\S]*?${field}:`, 'm').test(src);
  if (hasField) return replaceField(src, id, field, value);
  const re = new RegExp(`(id: '${id}'[\\s\\S]*?)(tags:|datePublished:|isPublic:)`, 'm');
  if (!re.test(src)) return { src, ok: false };
  return {
    src: src.replace(re, `$1${field}: '${value.replace(/'/g, "\\'")}',\n    $2`),
    ok: true,
  };
}

async function patchCollection(relPath, arrayName, options = {}) {
  const filePath = path.join(__dirname, '..', relPath);
  let src = fs.readFileSync(filePath, 'utf8');
  delete require.cache[require.resolve(path.join(__dirname, '..', relPath))];
  const mod = require(path.join(__dirname, '..', relPath));
  const items = mod[arrayName] || mod.getAll?.() || [];
  let count = 0;

  for (const item of items) {
    const id = item.id || item.slug;
    if (options.types && !options.types.includes(item.type)) continue;
    let image = null;

    if (BY_ID[id]) {
      image = BY_ID[id];
      console.log(`  ${id} ← curated topic image`);
    } else {
      const external = externalUrlForItem(item);
      if (!external) continue;
      image = await getOgImage(external);
      console.log(`  ${id} ← ${external}${image ? '' : ' (no og:image)'}`);
      await sleep(400);
    }

    if (!image) continue;
    if (!require('../utils/linkPreview').isValidOgImage(image)) continue;

    let r = upsertField(src, id, 'ogImageUrl', image);
    if (r.ok) src = r.src;
    r = replaceField(src, id, 'heroImageUrl', image);
    if (r.ok) {
      src = r.src;
      count++;
    }
    r = upsertField(src, id, 'imageSource', 'external');
    if (r.ok) src = r.src;
  }

  if (count) fs.writeFileSync(filePath, src);
  return count;
}

async function main() {
  let total = 0;
  console.log('Activities…');
  total += await patchCollection('data/activities.js', 'activities');
  console.log('Journalism…');
  total += await patchCollection('data/auis-voice.js', 'articles');
  console.log('Articles read…');
  total += await patchCollection('data/articles-read.js', 'articles');
  console.log('Projects (writings)…');
  total += await patchCollection('data/writings.js', 'writings', { types: ['project'] });
  console.log(`Done. Updated ${total} cover images.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
