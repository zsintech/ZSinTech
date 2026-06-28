require('dotenv').config();

const { fetchImage } = require('../services/imagePipeline');
const staticWritings = require('../data/writings');

async function verifyImages() {
  const writings = staticWritings.getAll();
  console.log(`Checking ${writings.length} hero images...\n`);

  let ok = 0;
  let fail = 0;

  for (const w of writings) {
    if (!w.heroImageUrl) {
      console.log(`  ✗ ${w.slug} — no heroImageUrl`);
      fail++;
      continue;
    }

    try {
      const res = await fetch(w.heroImageUrl, { method: 'HEAD' });
      if (res.ok) {
        console.log(`  ✓ ${w.slug} — ${res.status}`);
        ok++;
      } else {
        console.log(`  ✗ ${w.slug} — HTTP ${res.status}`);
        fail++;
      }
    } catch (err) {
      console.log(`  ✗ ${w.slug} — ${err.message}`);
      fail++;
    }
  }

  console.log(`\n${ok} ok, ${fail} failed`);
  if (fail) process.exit(1);
}

async function fetchMissing() {
  if (!process.env.PEXELS_API_KEY) {
    console.error('PEXELS_API_KEY not set in .env');
    process.exit(1);
  }

  const writings = staticWritings.getAll();
  console.log('Fetching images via OpenAI + Pexels pipeline...\n');

  for (const w of writings) {
    try {
      const image = await fetchImage(w.title, w.excerpt);
      if (image) {
        console.log(`${w.slug}:\n  ${image.url}\n  photo by ${image.photographer}\n`);
      } else {
        console.log(`${w.slug}: no image found\n`);
      }
    } catch (err) {
      console.log(`${w.slug}: ${err.message}\n`);
    }
  }
}

const mode = process.argv[2] || 'verify';
if (mode === 'fetch') fetchMissing();
else verifyImages();
