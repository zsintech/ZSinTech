/**
 * Enrich static data from Notion scrape + AUIS Voice Firebase + Pexels
 * Run: node scripts/enrich-from-sources.js
 */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const https = require('https');

const PEXELS_KEY = process.env.PEXELS_API_KEY;
const NOTION_SCRAPE = path.join(__dirname, '../../agent-tools/75da8081-fa1b-4682-a648-adb460b49acf.txt');
const OUT_AUIS = path.join(__dirname, '../data/auis-voice.js');

function slugify(title) {
  return title.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
}

function stripHtml(html) {
  if (!html || !html.includes('<')) return html || '';
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, '\n\n').trim();
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { Authorization: PEXELS_KEY } }, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try { resolve(JSON.parse(d)); } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve(d));
    }).on('error', reject);
  });
}

async function pexelsSearch(query) {
  if (!PEXELS_KEY) return null;
  try {
    const data = await fetchJson(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`
    );
    return data.photos?.[0]?.src?.large2x || null;
  } catch {
    return null;
  }
}

async function exportAuisVoice() {
  const raw = await fetchText('https://auis-voice-website-default-rtdb.europe-west1.firebasedatabase.app/articles.json');
  const articles = JSON.parse(raw);
  const slugs = {
    'Pressure? What Pressure?': 'pressure-what-pressure',
    '"Try Not to Think of It" ; Hope as a Cognitive Process': 'hope-cognitive-process',
    'MoonWalkers': 'moonwalkers',
    'The Diagnosis': 'the-diagnosis',
  };

  const mine = Object.entries(articles)
    .filter(([, a]) => a.author && a.author.includes('Zheen'))
    .map(([id, a]) => {
      const body = stripHtml(a.body || '');
      const slug = slugs[a.title] || slugify(a.title);
      return {
        id: slug,
        slug,
        title: a.title.replace(/^"|"$/g, '').replace(/ ; /, ' — '),
        author: a.author,
        source: 'The AUIS Voice',
        sourceUrl: 'https://voice.auis.edu.krd/',
        url: a.url || 'https://voice.auis.edu.krd/',
        issue: a.issue,
        section: a.section || 'science',
        excerpt: (a.excerpt || body.slice(0, 200)).replace(/\s+/g, ' ').trim(),
        body,
        tags: inferTags(a.title, body),
        heroImageUrl: a.imageUrl || a.image || '',
        datePublished: new Date(a.date),
        isPublic: true,
      };
    })
    .sort((a, b) => b.datePublished - a.datePublished);

  for (const a of mine) {
    if (!a.heroImageUrl) {
      a.heroImageUrl = await pexelsSearch(a.title.split('?')[0]) || '';
      console.log('  Pexels:', a.title, a.heroImageUrl ? 'ok' : 'skip');
    }
  }

  const js = `// Journalism by Zheen Salih Abdullah — full text from The AUIS Voice Firebase
// https://voice.auis.edu.krd/

const articles = ${JSON.stringify(mine, null, 2).replace(/"datePublished": "([^"]+)"/g, (_, d) => `"datePublished": new Date('${d}')`)};

function getAll() {
  return [...articles].sort((a, b) => b.datePublished - a.datePublished);
}

function getBySlug(slug) {
  return articles.find(a => a.slug === slug) || null;
}

function getSections() {
  return [...new Set(articles.map(a => a.section).filter(Boolean))];
}

module.exports = { articles, getAll, getBySlug, getSections };
`;

  // Fix datePublished to use new Date()
  const fixed = js.replace(/"datePublished": "([^"]+)"/g, (_, iso) => `"datePublished": new Date('${iso}')`);
  fs.writeFileSync(OUT_AUIS, fixed);
  console.log(`✓ Wrote ${mine.length} full AUIS articles (${mine.map(a => a.body.length).join(', ')} chars)`);
}

function inferTags(title, body) {
  const text = (title + ' ' + body).toLowerCase();
  const tags = [];
  if (/moon|artemis|space|apollo/.test(text)) tags.push('space');
  if (/hope|cognitive|psycholog|stress|pressure|suppression/.test(text)) tags.push('psychology');
  if (/ai|algorithm|llm|diagnosis|medical/.test(text)) tags.push('AI', 'medicine');
  if (/epistemic|authority/.test(text)) tags.push('epistemology');
  return tags.length ? tags : ['journalism'];
}

async function fetchPexelsForDataModule(modulePath, itemsKey, titleFn, imageKey = 'heroImageUrl') {
  delete require.cache[require.resolve(modulePath)];
  const mod = require(modulePath);
  const items = mod[itemsKey] || mod.getAll?.() || [];
  let updated = 0;
  for (const item of items) {
    if (item[imageKey]) continue;
    const q = titleFn(item);
    const url = await pexelsSearch(q);
    if (url) {
      item[imageKey] = url;
      updated++;
      console.log('  + image:', q.slice(0, 40));
    }
    await new Promise(r => setTimeout(r, 200));
  }
  return { items, updated, modulePath, itemsKey, imageKey };
}

async function main() {
  console.log('Exporting full AUIS Voice articles...');
  await exportAuisVoice();

  if (!PEXELS_KEY) {
    console.log('No PEXELS_API_KEY — skipping image fetch');
    return;
  }

  console.log('\nFetching Pexels images for writing ideas...');
  const ideasPath = path.join(__dirname, '../data/writing-ideas.js');
  // Read and patch writing-ideas manually via separate step
  console.log('Run: node scripts/fetch-pexels-images.js for batch images');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
