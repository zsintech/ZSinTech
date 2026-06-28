require('dotenv').config();

const { db, isConfigured, admin } = require('../firebase-admin');
const { fetchImage } = require('../services/imagePipeline');
const staticWritings = require('../data/writings');

const sampleBooks = [
  {
    title: 'Gödel, Escher, Bach',
    author: 'Douglas Hofstadter',
    status: 'reading',
    category: 'philosophy',
    tags: ['consciousness', 'mathematics', 'AI'],
    rating: null,
    notes: 'Exploring strange loops and self-reference across music, art, and mathematics.',
    isPublic: true,
  },
  {
    title: 'The Structure of Scientific Revolutions',
    author: 'Thomas Kuhn',
    status: 'finished',
    category: 'philosophy of science',
    tags: ['paradigms', 'historiography'],
    rating: 5,
    notes: 'Foundational text for understanding how scientific knowledge evolves.',
    isPublic: true,
  },
  {
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    status: 'want-to-read',
    category: 'psychology',
    tags: ['cognitive science', 'decision making'],
    rating: null,
    notes: '',
    isPublic: true,
  },
];

const sampleCourses = [
  {
    title: 'Machine Learning',
    instructor: 'Andrew Ng',
    platform: 'Coursera',
    url: 'https://www.coursera.org/learn/machine-learning',
    status: 'completed',
    category: 'computer science',
    tags: ['AI', 'machine learning'],
    notes: 'Excellent foundational course covering supervised and unsupervised learning.',
    isPublic: true,
  },
  {
    title: 'Introduction to Philosophy',
    instructor: null,
    platform: 'MIT OCW',
    url: null,
    status: 'in-progress',
    category: 'philosophy',
    tags: ['philosophy', 'ethics'],
    notes: '',
    isPublic: true,
  },
];

async function seed() {
  if (!isConfigured || !db) {
    console.error('Firebase not configured. Add credentials to .env before seeding.');
    process.exit(1);
  }

  console.log('Starting seed...\n');
  const writings = staticWritings.getAll();

  console.log('Seeding writings...');
  for (const w of writings) {
    const data = {
      title: w.title,
      slug: w.slug,
      type: w.type,
      excerpt: w.excerpt,
      body: w.body,
      tags: w.tags,
      isPublic: w.isPublic,
      dateWritten: admin.firestore.Timestamp.fromDate(w.dateWritten),
      dateAdded: admin.firestore.Timestamp.now(),
      datePublished: admin.firestore.Timestamp.fromDate(w.dateWritten),
      heroImageUrl: w.heroImageUrl || null,
    };

    if (!data.heroImageUrl) {
      try {
        const image = await fetchImage(w.title, w.excerpt);
        if (image) {
          data.heroImageUrl = image.url;
          console.log(`  ✓ ${w.title} — fetched image`);
        } else {
          console.log(`  ✓ ${w.title} — no image found`);
        }
      } catch (err) {
        console.log(`  ✓ ${w.title} — image fetch failed: ${err.message}`);
      }
    } else {
      console.log(`  ✓ ${w.title} — using Pexels image`);
    }

    await db.collection('writings').add(data);
  }

  console.log('\nSeeding books...');
  for (const b of sampleBooks) {
    const data = {
      ...b,
      dateAdded: admin.firestore.Timestamp.now(),
      dateFinished: b.status === 'finished' ? admin.firestore.Timestamp.now() : null,
      coverUrl: null,
    };

    try {
      const image = await fetchImage(b.title, b.author);
      if (image) data.coverUrl = image.url;
    } catch { /* skip */ }

    await db.collection('books').add(data);
    console.log(`  ✓ ${b.title}`);
  }

  console.log('\nSeeding courses...');
  for (const c of sampleCourses) {
    const data = {
      ...c,
      dateAdded: admin.firestore.Timestamp.now(),
      dateCompleted: c.status === 'completed' ? admin.firestore.Timestamp.now() : null,
    };
    await db.collection('courses').add(data);
    console.log(`  ✓ ${c.title}`);
  }

  console.log('\nSeed complete!');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
