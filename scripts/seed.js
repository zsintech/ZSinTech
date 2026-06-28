require('dotenv').config();

const { db, isConfigured, admin } = require('../firebase-admin');
const { fetchImage } = require('../services/imagePipeline');
const staticWritings = require('../data/writings');
const staticArticles = require('../data/articles-read');
const staticTravel = require('../data/travel');
const staticReflections = require('../data/reflections');
const staticBooks = require('../data/books');
const staticCourses = require('../data/courses');

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
      projectUrl: w.projectUrl || null,
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

    await db.collection('writings').doc(w.slug).set(data, { merge: true });
    console.log(`  ✓ ${w.title}`);
  }

  console.log('\nSeeding books...');
  for (const b of staticBooks.getAll()) {
    const id = b.id;
    const data = {
      ...b,
      slug: id,
      dateAdded: admin.firestore.Timestamp.fromDate(b.dateAdded),
    };
    delete data.id;

    if (!data.coverUrl) {
      try {
        const image = await fetchImage(b.title, b.author || '');
        if (image) data.coverUrl = image.url;
      } catch { /* skip */ }
    }

    await db.collection('books').doc(id).set(data, { merge: true });
    console.log(`  ✓ ${b.title} (${b.shelfType}, ${b.status})`);
  }

  console.log('\nSeeding courses...');
  for (const c of staticCourses.getAll()) {
    const id = c.id;
    const data = {
      ...c,
      slug: id,
      dateAdded: admin.firestore.Timestamp.fromDate(c.dateAdded),
      dateCompleted: c.status === 'completed' ? admin.firestore.Timestamp.now() : null,
    };
    delete data.id;
    await db.collection('courses').doc(id).set(data, { merge: true });
    console.log(`  ✓ ${c.title}`);
  }

  console.log('\nSeeding articles (Articles Read)...');
  for (const a of staticArticles.getAll()) {
    const data = {
      title: a.title,
      url: a.url,
      source: a.source,
      excerpt: a.excerpt,
      tags: a.tags,
      status: 'read',
      isPublic: true,
      dateAdded: admin.firestore.Timestamp.fromDate(a.dateAdded),
    };
    await db.collection('articles_saved').add(data);
    console.log(`  ✓ ${a.title}`);
  }

  console.log('\nSeeding trips (Travel)...');
  for (const t of staticTravel.getAll()) {
    const data = {
      title: t.title,
      slug: t.slug,
      destination: t.destination || '',
      status: t.status || 'planned',
      dateStart: t.dateStart || null,
      dateEnd: t.dateEnd || null,
      concept: t.concept || '',
      budget: t.budget || '',
      notes: t.notes || '',
      links: t.links || [],
      checklist: t.checklist || [],
      tags: t.tags || [],
      heroImageUrl: t.heroImageUrl || null,
      isPublic: t.isPublic === true,
      dateAdded: admin.firestore.Timestamp.fromDate(t.dateAdded || new Date()),
    };
    await db.collection('trips').add(data);
    console.log(`  ✓ ${t.title} (${data.isPublic ? 'public' : 'private'})`);
  }

  console.log('\nSeeding reflections...');
  for (const r of staticReflections.getAll(false)) {
    const data = {
      title: r.title || null,
      body: r.body,
      mood: r.mood || null,
      tags: r.tags || [],
      isPublic: r.isPublic === true,
      date: admin.firestore.Timestamp.fromDate(r.date || new Date()),
      dateAdded: admin.firestore.Timestamp.now(),
    };
    await db.collection('reflections').add(data);
    console.log(`  ✓ ${r.title || 'Untitled reflection'}`);
  }

  console.log('\nSeed complete!');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
