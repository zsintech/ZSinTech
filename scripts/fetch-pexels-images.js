/**
 * Add Pexels heroImageUrl to data modules missing images
 * Run: node scripts/fetch-pexels-images.js
 */
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const KEY = process.env.PEXELS_API_KEY;
if (!KEY) { console.error('PEXELS_API_KEY required'); process.exit(1); }

async function search(query) {
  const res = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
    { headers: { Authorization: KEY } }
  );
  const data = await res.json();
  return data.photos?.[0]?.src?.large2x || null;
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function patchFile(relPath, arrayName, queryFn) {
  const filePath = path.join(__dirname, '..', relPath);
  let src = fs.readFileSync(filePath, 'utf8');
  const mod = require(filePath);
  const items = mod[arrayName] || mod.getAll();
  let count = 0;
  for (const item of items) {
    if (item.heroImageUrl || item.coverUrl) continue;
    const q = queryFn(item);
    const url = await search(q);
    if (!url) continue;
    const id = item.id;
    const re = new RegExp(`(id: '${id}'[\\s\\S]*?)(isPublic: true,)`, 'm');
    if (re.test(src) && !src.includes(`id: '${id}'`) === false) {
      src = src.replace(re, `$1heroImageUrl: '${url}',\n    $2`);
      count++;
      console.log(`  ${relPath} + ${id}`);
    }
  }
  if (count) fs.writeFileSync(filePath, src);
  return count;
}

async function main() {
  const patches = [
    ['data/writing-ideas.js', 'ideas', i => i.title],
    ['data/articles-read.js', 'articles', i => i.tags?.[0] || i.source],
    ['data/research-papers.js', 'papers', i => i.tags?.[0] || 'research'],
    ['data/iconic-bitch.js', 'items', i => `${i.title} book`],
    ['data/solo-dates.js', 'dates', i => i.activity || 'solo adventure'],
    ['data/popsci-reels.js', 'reels', i => i.topic],
  ];
  let total = 0;
  for (const [file, name, qfn] of patches) {
    console.log(`Patching ${file}...`);
    total += await patchFile(file, name, qfn);
    await sleep(500);
  }
  console.log(`Done. Added ${total} images.`);
}

main();
