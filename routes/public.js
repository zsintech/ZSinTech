const express = require('express');
const router = express.Router();
const { db, isConfigured } = require('../firebase-admin');
const { renderMarkdown } = require('../utils/markdown');
const { formatDate, groupByMonth } = require('../utils/dates');
const { getPublicWritings, getWritingBySlug } = require('../utils/content');

router.get('/', async (req, res) => {
  const writings = await getPublicWritings();
  const essays = writings.filter(w => w.type === 'essay');
  const featured = writings[0] || null;
  const project = writings.find(w => w.type === 'project') || null;

  let books = [];
  let latestReflection = null;
  if (isConfigured && db) {
    try {
      const booksSnap = await db.collection('books').where('isPublic', '==', true).where('status', '==', 'reading').limit(3).get();
      books = booksSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      const reflectionsSnap = await db.collection('reflections').where('isPublic', '==', true).orderBy('date', 'desc').limit(1).get();
      if (!reflectionsSnap.empty) latestReflection = { id: reflectionsSnap.docs[0].id, ...reflectionsSnap.docs[0].data() };
    } catch { /* optional */ }
  }

  res.render('public/home', {
    title: 'ZsinTech',
    writings,
    essays,
    featured,
    project,
    books,
    latestReflection,
    formatDate,
    heroImage: featured?.heroImageUrl || essays[0]?.heroImageUrl,
  });
});

router.get('/writings', async (req, res) => {
  const { type, tag } = req.query;
  const writings = await getPublicWritings({ type, tag });
  res.render('public/writings', {
    title: 'Writings',
    writings,
    formatDate,
    currentType: type || '',
    currentTag: tag || '',
  });
});

router.get('/writings/:slug', async (req, res) => {
  const writing = await getWritingBySlug(req.params.slug);
  if (!writing) return res.status(404).redirect('/writings');

  writing.bodyHtml = renderMarkdown(writing.body || '');
  const allWritings = await getPublicWritings();
  const related = allWritings.filter(w => w.slug !== writing.slug && w.type === writing.type).slice(0, 2);

  res.render('public/writing-single', {
    title: writing.title,
    writing,
    related,
    formatDate,
  });
});

router.get('/shelf', async (req, res) => {
  if (!isConfigured || !db) {
    return res.render('public/shelf', { title: 'Shelf', books: [], courses: [], articles: [], movies: [], formatDate, groupByMonth });
  }
  try {
    const [booksSnap, coursesSnap, articlesSnap, moviesSnap] = await Promise.all([
      db.collection('books').where('isPublic', '==', true).orderBy('dateAdded', 'desc').get(),
      db.collection('courses').where('isPublic', '==', true).orderBy('dateAdded', 'desc').get(),
      db.collection('articles_saved').where('isPublic', '==', true).orderBy('dateAdded', 'desc').get(),
      db.collection('movies').where('isPublic', '==', true).orderBy('dateAdded', 'desc').get(),
    ]);
    res.render('public/shelf', {
      title: 'Shelf',
      books: booksSnap.docs.map(d => ({ id: d.id, ...d.data() })),
      courses: coursesSnap.docs.map(d => ({ id: d.id, ...d.data() })),
      articles: articlesSnap.docs.map(d => ({ id: d.id, ...d.data() })),
      movies: moviesSnap.docs.map(d => ({ id: d.id, ...d.data() })),
      formatDate,
      groupByMonth,
    });
  } catch {
    res.render('public/shelf', { title: 'Shelf', books: [], courses: [], articles: [], movies: [], formatDate, groupByMonth });
  }
});

router.get('/reflections', async (req, res) => {
  if (!isConfigured || !db) {
    return res.render('public/reflections', { title: 'Reflections', reflections: [], formatDate });
  }
  try {
    const snap = await db.collection('reflections').where('isPublic', '==', true).orderBy('date', 'desc').get();
    res.render('public/reflections', { title: 'Reflections', reflections: snap.docs.map(d => ({ id: d.id, ...d.data() })), formatDate });
  } catch {
    res.render('public/reflections', { title: 'Reflections', reflections: [], formatDate });
  }
});

router.get('/about', (req, res) => {
  res.render('public/about', { title: 'About' });
});

module.exports = router;
