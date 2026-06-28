const slugify = require('slugify');
const { db } = require('../firebase-admin');

function createSlug(title) {
  return slugify(title, { lower: true, strict: true, trim: true });
}

async function generateSlug(title, collection) {
  const base = createSlug(title);
  let slug = base;
  let counter = 1;

  while (true) {
    const snap = await db.collection(collection)
      .where('slug', '==', slug)
      .limit(1)
      .get();
    if (snap.empty) return slug;
    slug = `${base}-${counter}`;
    counter++;
  }
}

module.exports = { createSlug, generateSlug };
