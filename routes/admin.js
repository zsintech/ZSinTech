const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');
const { db } = require('../firebase-admin');
const { admin } = require('../firebase-admin');
const { parseTags } = require('../utils/tags');
const { generateSlug } = require('../utils/slug');
const { formatDate } = require('../utils/dates');
const { renderMarkdown } = require('../utils/markdown');
const { fetchImage } = require('../services/imagePipeline');

router.use(requireAuth);

// ─── Dashboard ───────────────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const ts = admin.firestore.Timestamp.fromDate(sevenDaysAgo);

    const collections = ['books', 'courses', 'articles_saved', 'writings', 'movies', 'reflections'];
    const counts = {};
    const recentItems = [];

    for (const col of collections) {
      const snap = await db.collection(col).get();
      counts[col] = snap.size;

      const recentSnap = await db.collection(col)
        .where('dateAdded', '>=', ts)
        .orderBy('dateAdded', 'desc')
        .limit(5)
        .get();
      recentSnap.docs.forEach(d => {
        recentItems.push({ id: d.id, collection: col, ...d.data() });
      });
    }

    recentItems.sort((a, b) => {
      const aTime = a.dateAdded?._seconds || 0;
      const bTime = b.dateAdded?._seconds || 0;
      return bTime - aTime;
    });

    const readingSnap = await db.collection('books').where('status', '==', 'reading').get();
    const toReadSnap = await db.collection('articles_saved').where('status', '==', 'want-to-read').get();
    const toWatchSnap = await db.collection('movies').where('status', '==', 'want-to-watch').get();

    res.render('admin/dashboard', {
      title: 'Dashboard',
      counts,
      recentItems: recentItems.slice(0, 10),
      stats: {
        totalBooks: counts.books || 0,
        reading: readingSnap.size,
        articlesToRead: toReadSnap.size,
        moviesToWatch: toWatchSnap.size,
      },
      formatDate,
    });
  } catch (err) {
    console.error('Dashboard error:', err);
    res.render('admin/dashboard', {
      title: 'Dashboard',
      counts: {},
      recentItems: [],
      stats: { totalBooks: 0, reading: 0, articlesToRead: 0, moviesToWatch: 0 },
      formatDate,
    });
  }
});

// ─── Generic CRUD helpers ────────────────────────────────────────────────────
function buildCrudRoutes(collection, options = {}) {
  const { singular, statusField, statusValues, hasSlug } = options;

  // List
  router.get(`/${collection}`, async (req, res) => {
    try {
      const { status, category, tag, sort } = req.query;
      let query = db.collection(collection);

      if (status) query = query.where('status', '==', status);
      if (category) query = query.where('category', '==', category);

      const orderField = sort || 'dateAdded';
      query = query.orderBy(orderField, 'desc');

      const snap = await query.get();
      let items = snap.docs.map(d => ({ id: d.id, ...d.data() }));

      if (tag) {
        items = items.filter(i => i.tags && i.tags.includes(tag));
      }

      const categoriesSet = new Set(items.map(i => i.category).filter(Boolean));

      res.render(`admin/${collection}`, {
        title: options.title || collection,
        items,
        categories: [...categoriesSet],
        statusValues: statusValues || [],
        formatDate,
        currentStatus: status || '',
        currentCategory: category || '',
        currentTag: tag || '',
      });
    } catch (err) {
      console.error(`List ${collection} error:`, err);
      res.render(`admin/${collection}`, {
        title: options.title || collection,
        items: [],
        categories: [],
        statusValues: statusValues || [],
        formatDate,
        currentStatus: '',
        currentCategory: '',
        currentTag: '',
      });
    }
  });

  // New form
  router.get(`/${collection}/new`, async (req, res) => {
    try {
      const snap = await db.collection(collection).get();
      const categoriesSet = new Set(snap.docs.map(d => d.data().category).filter(Boolean));
      const platformsSet = new Set(snap.docs.map(d => d.data().platform).filter(Boolean));

      res.render(`admin/${singular}-form`, {
        title: `Add ${singular}`,
        item: null,
        categories: [...categoriesSet],
        platforms: [...platformsSet],
        statusValues: statusValues || [],
      });
    } catch (err) {
      res.render(`admin/${singular}-form`, {
        title: `Add ${singular}`,
        item: null,
        categories: [],
        platforms: [],
        statusValues: statusValues || [],
      });
    }
  });

  // Create
  router.post(`/${collection}`, async (req, res) => {
    try {
      const data = { ...req.body };
      data.tags = parseTags(data.tags);
      data.isPublic = data.isPublic === 'true' || data.isPublic === true;
      data.dateAdded = admin.firestore.Timestamp.now();

      if (data.rating) data.rating = parseInt(data.rating) || null;
      if (data.year) data.year = parseInt(data.year) || null;
      if (collection === 'reflections') data.date = admin.firestore.Timestamp.now();
      if (collection === 'writings') data.dateWritten = admin.firestore.Timestamp.now();

      if (hasSlug && data.title) {
        data.slug = await generateSlug(data.title, collection);
      }

      if (data.isPublic && !data.datePublished && hasSlug) {
        data.datePublished = admin.firestore.Timestamp.now();
      }

      // Image pipeline
      if (!data.coverUrl && !data.heroImageUrl && data.title) {
        try {
          const image = await fetchImage(data.title, data.excerpt || data.notes || '');
          if (image) {
            if (hasSlug) data.heroImageUrl = image.url;
            else data.coverUrl = image.url;
          }
        } catch (e) { /* graceful fallback */ }
      }

      await db.collection(collection).add(data);
      res.redirect(`/admin/${collection}`);
    } catch (err) {
      console.error(`Create ${collection} error:`, err);
      res.redirect(`/admin/${collection}/new`);
    }
  });

  // Edit form
  router.get(`/${collection}/:id/edit`, async (req, res) => {
    try {
      const doc = await db.collection(collection).doc(req.params.id).get();
      if (!doc.exists) return res.redirect(`/admin/${collection}`);

      const snap = await db.collection(collection).get();
      const categoriesSet = new Set(snap.docs.map(d => d.data().category).filter(Boolean));
      const platformsSet = new Set(snap.docs.map(d => d.data().platform).filter(Boolean));

      // Get connections for this item
      const connectionsFrom = await db.collection('connections')
        .where('fromId', '==', req.params.id)
        .get();
      const connectionsTo = await db.collection('connections')
        .where('toId', '==', req.params.id)
        .get();
      const connections = [
        ...connectionsFrom.docs.map(d => ({ id: d.id, ...d.data() })),
        ...connectionsTo.docs.map(d => ({ id: d.id, ...d.data() })),
      ];

      res.render(`admin/${singular}-form`, {
        title: `Edit ${singular}`,
        item: { id: doc.id, ...doc.data() },
        categories: [...categoriesSet],
        platforms: [...platformsSet],
        statusValues: statusValues || [],
        connections,
      });
    } catch (err) {
      console.error(`Edit ${collection} error:`, err);
      res.redirect(`/admin/${collection}`);
    }
  });

  // Update
  router.post(`/${collection}/:id`, async (req, res) => {
    try {
      const data = { ...req.body };
      data.tags = parseTags(data.tags);
      data.isPublic = data.isPublic === 'true' || data.isPublic === true;

      if (data.rating) data.rating = parseInt(data.rating) || null;
      if (data.year) data.year = parseInt(data.year) || null;

      if (hasSlug && data.slug) {
        // keep user-edited slug
      } else if (hasSlug && data.title) {
        data.slug = await generateSlug(data.title, collection);
      }

      if (data.isPublic && !data.datePublished && hasSlug) {
        data.datePublished = admin.firestore.Timestamp.now();
      }

      await db.collection(collection).doc(req.params.id).update(data);
      res.redirect(`/admin/${collection}`);
    } catch (err) {
      console.error(`Update ${collection} error:`, err);
      res.redirect(`/admin/${collection}/${req.params.id}/edit`);
    }
  });

  // Delete
  router.post(`/${collection}/:id/delete`, async (req, res) => {
    try {
      await db.collection(collection).doc(req.params.id).delete();
      res.redirect(`/admin/${collection}`);
    } catch (err) {
      console.error(`Delete ${collection} error:`, err);
      res.redirect(`/admin/${collection}`);
    }
  });

  // Toggle public
  router.post(`/${collection}/:id/toggle-public`, async (req, res) => {
    try {
      const doc = await db.collection(collection).doc(req.params.id).get();
      if (!doc.exists) return res.status(404).json({ error: 'Not found' });

      const current = doc.data().isPublic || false;
      const update = { isPublic: !current };

      if (!current && hasSlug && !doc.data().datePublished) {
        update.datePublished = admin.firestore.Timestamp.now();
      }

      await db.collection(collection).doc(req.params.id).update(update);
      res.json({ success: true, isPublic: !current });
    } catch (err) {
      console.error(`Toggle ${collection} error:`, err);
      res.status(500).json({ error: 'Failed to toggle' });
    }
  });
}

// Register CRUD for all content types
buildCrudRoutes('books', {
  singular: 'book',
  title: 'Books',
  statusValues: ['want-to-read', 'reading', 'finished'],
});

buildCrudRoutes('courses', {
  singular: 'course',
  title: 'Courses',
  statusValues: ['want-to-take', 'in-progress', 'completed'],
});

buildCrudRoutes('articles_saved', {
  singular: 'article',
  title: 'Articles',
  statusValues: ['want-to-read', 'read'],
});

buildCrudRoutes('writings', {
  singular: 'writing',
  title: 'Writings',
  statusValues: [],
  hasSlug: true,
});

buildCrudRoutes('movies', {
  singular: 'movie',
  title: 'Movies',
  statusValues: ['want-to-watch', 'watched'],
});

buildCrudRoutes('reflections', {
  singular: 'reflection',
  title: 'Reflections',
  statusValues: [],
});

// ─── Connections ─────────────────────────────────────────────────────────────
router.get('/connections', async (req, res) => {
  try {
    const snap = await db.collection('connections').orderBy('dateAdded', 'desc').get();
    const connections = snap.docs.map(d => ({ id: d.id, ...d.data() }));

    const collections = ['books', 'courses', 'articles_saved', 'writings', 'movies', 'reflections'];
    const allItems = {};

    for (const col of collections) {
      const s = await db.collection(col).get();
      allItems[col] = s.docs.map(d => ({ id: d.id, title: d.data().title || d.data().body?.substring(0, 50) || 'Untitled' }));
    }

    res.render('admin/connections', {
      title: 'Connections',
      connections,
      allItems,
      collections,
      formatDate,
    });
  } catch (err) {
    console.error('Connections error:', err);
    res.render('admin/connections', {
      title: 'Connections',
      connections: [],
      allItems: {},
      collections: [],
      formatDate,
    });
  }
});

router.post('/connections', async (req, res) => {
  try {
    const { fromCollection, fromId, fromTitle, toCollection, toId, toTitle, label } = req.body;
    await db.collection('connections').add({
      fromCollection,
      fromId,
      fromTitle,
      toCollection,
      toId,
      toTitle,
      label: label || 'relates to',
      dateAdded: admin.firestore.Timestamp.now(),
    });
    res.redirect('/admin/connections');
  } catch (err) {
    console.error('Create connection error:', err);
    res.redirect('/admin/connections');
  }
});

router.post('/connections/:id/delete', async (req, res) => {
  try {
    await db.collection('connections').doc(req.params.id).delete();
    res.redirect('/admin/connections');
  } catch (err) {
    console.error('Delete connection error:', err);
    res.redirect('/admin/connections');
  }
});

// ─── Quick Add (from dashboard) ─────────────────────────────────────────────
router.post('/quick-add', async (req, res) => {
  try {
    const { collection, title, status, body } = req.body;
    const data = {
      title: title || '',
      status: status || '',
      body: body || '',
      tags: [],
      isPublic: false,
      dateAdded: admin.firestore.Timestamp.now(),
    };

    if (collection === 'writings' && title) {
      data.slug = await generateSlug(title, 'writings');
      data.type = 'note';
      data.excerpt = '';
    }

    if (collection === 'reflections') {
      data.date = admin.firestore.Timestamp.now();
    }

    await db.collection(collection).add(data);
    res.redirect('/admin');
  } catch (err) {
    console.error('Quick add error:', err);
    res.redirect('/admin');
  }
});

module.exports = router;
