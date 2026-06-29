/**
 * Refresh activity/project hero images with topic-relevant Pexels photos.
 * Run: node scripts/refresh-activity-images.js
 */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { BY_ID } = require('../data/topic-images');

const KEY = process.env.PEXELS_API_KEY;
if (!KEY) {
  console.error('PEXELS_API_KEY required');
  process.exit(1);
}

const TOPIC_QUERIES = {
  'philosophy-of-software-design': 'software engineering book desk',
  'auis-senior-day-2026': 'university graduation celebration',
  'auis-voice-april-2026': 'newspaper journalism desk',
  'auis-voice-first-issue': 'medical diagnosis healthcare',
  'wikipedia-beginner-session': 'wikipedia open knowledge',
  'seed-center-solidarity-session': 'mental health support group',
  'wikipedia-birthday-auib': 'library books knowledge',
  'final-club-day': 'university student club event',
  'repost-reckoning-science': 'climate science research',
  'sitak-hellofuture': 'biodiversity nature fieldwork',
  'university-day-2025': 'university science fair projects',
  'wikimedia-kickoff-auis': 'wikipedia editing laptop',
  'cyberproject-hamno-askary': 'tech startup entrepreneurship',
  'point-6-conference': 'political conference discussion',
  'harvard-aspire-storytelling': 'ancient mesopotamia clay tablet',
  'ases-earthquake-system': 'earthquake sensor engineering',
  'readbyte-capstone': 'science communication technology',
  'readbyte': 'science communication technology',
  'pioneers-of-change': 'youth civic engagement workshop',
  'repost-kurdish-opera-amsterdam': 'opera theater stage',
  'auis-wikimedians': 'wikipedia open knowledge',
};

async function search(query) {
  const res = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=3&orientation=landscape`,
    { headers: { Authorization: KEY } }
  );
  const data = await res.json();
  return data.photos?.[0]?.src?.large2x || null;
}

function replaceHeroUrl(src, id, url) {
  const re = new RegExp(
    `(id: '${id}'[\\s\\S]*?heroImageUrl:\\s*)'[^']+'`,
    'm'
  );
  if (!re.test(src)) return { src, ok: false };
  return { src: src.replace(re, `$1'${url}?auto=compress&cs=tinysrgb&w=1920'`), ok: true };
}

async function patchFile(relPath, arrayName) {
  const filePath = path.join(__dirname, '..', relPath);
  let src = fs.readFileSync(filePath, 'utf8');
  const mod = require(filePath);
  const items = mod[arrayName] || mod.getAll?.() || [];
  let count = 0;

  for (const item of items) {
    const key = item.id || item.slug;
    if (BY_ID[key]) {
      const { src: next, ok } = replaceHeroUrl(src, key, BY_ID[key].split('?')[0]);
      if (ok) {
        src = next;
        count++;
        console.log(`  ${relPath} ${key} ← curated (topic-images)`);
      }
      continue;
    }
    const query = TOPIC_QUERIES[key];
    if (!query) continue;
    const url = await search(query);
    if (!url) {
      console.log(`  skip ${key} — no result`);
      continue;
    }
    const { src: next, ok } = replaceHeroUrl(src, key, url.split('?')[0]);
    if (ok) {
      src = next;
      count++;
      console.log(`  ${relPath} ${key} ← ${query}`);
    }
  }

  if (count) fs.writeFileSync(filePath, src);
  return count;
}

async function main() {
  let total = 0;
  total += await patchFile('data/activities.js', 'activities');
  delete require.cache[require.resolve('../data/activities')];
  total += await patchFile('data/writings.js', 'writings');
  console.log(`Done. Updated ${total} images.`);
}

main();
