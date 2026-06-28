const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');
const { db } = require('../firebase-admin');
const { admin } = require('../firebase-admin');
const { parseTags } = require('../utils/tags');
const { generateSlug } = require('../utils/slug');
const { formatDate } = require('../utils/dates');
const { renderMarkdown } = require('../utils/markdown');
const { parseTripFields } = require('../utils/travel');
const { fetchImage } = require('../services/imagePipeline');
const { parseIsPublic } = require('../utils/parsePublic');
const contentStore = require('../utils/contentStore');
const contentSections = require('../config/content-sections');
const { isConfigured } = require('../firebase-admin');

router.use(requireAuth);

// ─── Dashboard ───────────────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const ts = admin.firestore.Timestamp.fromDate(sevenDaysAgo);

    const collections = ['books', 'courses', 'articles_saved', 'writings', 'movies', 'reflections', 'trips', 'notebooks'];
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
    const coursesSnap = await db.collection('courses').where('status', '==', 'want-to-take').get();
    let notebookCount = counts.notebooks || 0;
    if (!notebookCount) {
      try {
        const nbStore = require('../utils/notebooks');
        notebookCount = (await nbStore.adminListNotebooks()).length;
      } catch { notebookCount = 0; }
    }

    res.render('admin/dashboard', {
      title: 'Dashboard',
      counts,
      recentItems: recentItems.slice(0, 10),
      stats: {
        totalBooks: counts.books || 0,
        reading: readingSnap.size,
        articlesToRead: toReadSnap.size,
        moviesToWatch: toWatchSnap.size,
        coursesToTake: coursesSnap.size,
        notebooks: notebookCount,
      },
      formatDate,
    });
  } catch (err) {
    console.error('Dashboard error:', err);
    res.render('admin/dashboard', {
      title: 'Dashboard',
      counts: {},
      recentItems: [],
      stats: { totalBooks: 0, reading: 0, articlesToRead: 0, moviesToWatch: 0, coursesToTake: 0, notebooks: 0 },
      formatDate,
    });
  }
});

// ─── Generic CRUD helpers ────────────────────────────────────────────────────
function buildCrudRoutes(collection, options = {}) {
  const { singular, statusField, statusValues, hasSlug, parseBody } = options;

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
      let data = { ...req.body };
      if (parseBody) data = parseBody(data);
      data.tags = parseTags(data.tags);
      data.isPublic = parseIsPublic(data.isPublic);
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
      let data = { ...req.body };
      if (parseBody) data = parseBody(data);
      data.tags = parseTags(data.tags);
      data.isPublic = parseIsPublic(data.isPublic);

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

// Register CRUD for all content types (books use contentStore routes below)
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

buildCrudRoutes('trips', {
  singular: 'trip',
  title: 'Travel',
  statusValues: ['dream', 'planned', 'upcoming', 'completed'],
  hasSlug: true,
  parseBody: parseTripFields,
});

// ─── Books (contentStore — static fallback + Firestore) ───────────────────────
const bookStatusValues = ['to-read', 'have-read'];
const shelfTypeValues = ['vocational', 'literary'];

function parseBookBody(body) {
  const data = { ...body };
  data.tags = parseTags(data.tags);
  data.isPublic = parseIsPublic(data.isPublic);
  if (data.rating) data.rating = parseInt(data.rating, 10) || null;
  return data;
}

router.get('/books', async (req, res) => {
  try {
    const { status, category, shelfType } = req.query;
    let items = await contentStore.adminList('books', status ? { status } : {});
    if (shelfType) items = items.filter(i => i.shelfType === shelfType);
    if (category) items = items.filter(i => i.category === category);

    const categoriesSet = new Set(items.map(i => i.category).filter(Boolean));

    res.render('admin/books', {
      title: 'Books',
      items,
      categories: [...categoriesSet],
      statusValues: bookStatusValues,
      shelfTypeValues,
      formatDate,
      currentStatus: status || '',
      currentCategory: category || '',
      currentShelfType: shelfType || '',
    });
  } catch (err) {
    console.error('List books error:', err);
    res.render('admin/books', {
      title: 'Books',
      items: [],
      categories: [],
      statusValues: bookStatusValues,
      shelfTypeValues,
      formatDate,
      currentStatus: '',
      currentCategory: '',
      currentShelfType: '',
    });
  }
});

router.get('/books/new', async (req, res) => {
  const items = await contentStore.adminList('books');
  const categoriesSet = new Set(items.map(i => i.category).filter(Boolean));
  res.render('admin/book-form', {
    title: 'Add Book',
    item: null,
    categories: [...categoriesSet],
    statusValues: bookStatusValues,
    shelfTypeValues,
    defaultShelfType: req.query.shelfType || 'vocational',
  });
});

router.post('/books', async (req, res) => {
  try {
    const data = parseBookBody(req.body);
    if (!data.coverUrl && data.title) {
      try {
        const image = await fetchImage(data.title, data.author || data.notes || '');
        if (image) data.coverUrl = image.url;
      } catch { /* skip */ }
    }
    await contentStore.create('books', data);
    const redirect = data.shelfType ? `/admin/books?shelfType=${data.shelfType}` : '/admin/books';
    res.redirect(redirect);
  } catch (err) {
    console.error('Create book error:', err);
    res.redirect('/admin/books/new');
  }
});

router.get('/books/:id/edit', async (req, res) => {
  const item = await contentStore.getById('books', req.params.id);
  if (!item) return res.redirect('/admin/books');
  const items = await contentStore.adminList('books');
  const categoriesSet = new Set(items.map(i => i.category).filter(Boolean));
  res.render('admin/book-form', {
    title: 'Edit Book',
    item,
    categories: [...categoriesSet],
    statusValues: bookStatusValues,
    shelfTypeValues,
  });
});

router.post('/books/:id', async (req, res) => {
  try {
    const data = parseBookBody(req.body);
    await contentStore.update('books', req.params.id, data);
    const redirect = data.shelfType ? `/admin/books?shelfType=${data.shelfType}` : '/admin/books';
    res.redirect(redirect);
  } catch (err) {
    console.error('Update book error:', err);
    res.redirect(`/admin/books/${req.params.id}/edit`);
  }
});

router.post('/books/:id/delete', async (req, res) => {
  try {
    await contentStore.remove('books', req.params.id);
    res.redirect('/admin/books');
  } catch (err) {
    console.error('Delete book error:', err);
    res.redirect('/admin/books');
  }
});

router.post('/books/:id/toggle-public', async (req, res) => {
  try {
    const isPublic = await contentStore.togglePublic('books', req.params.id);
    res.json({ success: true, isPublic });
  } catch (err) {
    console.error('Toggle book error:', err);
    res.status(500).json({ error: 'Failed to toggle' });
  }
});

// ─── Content Hub (all site sections) ───────────────────────────────────────
router.get('/content', (req, res) => {
  res.render('admin/content-hub', {
    title: 'Content Hub',
    dbConfigured: isConfigured,
  });
});

router.post('/content/import-all', async (req, res) => {
  try {
    await contentStore.importAllStatic();
    const notebookStore = require('../utils/notebooks');
    await notebookStore.importStatic();
    res.redirect('/admin/content?imported=1');
  } catch (err) {
    console.error('Import error:', err);
    res.redirect('/admin/content?error=import');
  }
});

function findSection(collection) {
  return contentSections.find(s => s.collection === collection);
}

function parseGenericBody(body, section) {
  const data = { ...body };
  if (data.tags) data.tags = parseTags(data.tags);
  data.isPublic = parseIsPublic(data.isPublic);
  if (data.year) data.year = parseInt(data.year, 10) || null;
  if (section.hasSlug && data.title && !data.slug) {
    data.slug = require('../utils/slug').createSlug(data.title);
  }
  return data;
}

contentSections.forEach(section => {
  const col = section.collection;

  router.get(`/content/${col}`, async (req, res) => {
    const status = req.query.status || '';
    const items = await contentStore.adminList(col, status ? { status } : {});
    res.render('admin/generic-list', {
      title: section.title,
      section,
      items,
      formatDate,
      currentStatus: req.query.status || '',
    });
  });

  router.get(`/content/${col}/new`, (req, res) => {
    res.render('admin/generic-form', {
      title: `Add ${section.singular}`,
      section,
      item: null,
    });
  });

  router.post(`/content/${col}`, async (req, res) => {
    try {
      const data = parseGenericBody(req.body, section);
      await contentStore.create(col, data);
      res.redirect(`/admin/content/${col}`);
    } catch (err) {
      console.error(`Create ${col} error:`, err);
      res.redirect(`/admin/content/${col}/new`);
    }
  });

  router.get(`/content/${col}/:id/edit`, async (req, res) => {
    const item = await contentStore.getById(col, req.params.id);
    if (!item) return res.redirect(`/admin/content/${col}`);
    res.render('admin/generic-form', {
      title: `Edit ${section.singular}`,
      section,
      item,
    });
  });

  router.post(`/content/${col}/:id`, async (req, res) => {
    try {
      const data = parseGenericBody(req.body, section);
      await contentStore.update(col, req.params.id, data);
      res.redirect(`/admin/content/${col}`);
    } catch (err) {
      console.error(`Update ${col} error:`, err);
      res.redirect(`/admin/content/${col}/${req.params.id}/edit`);
    }
  });

  router.post(`/content/${col}/:id/delete`, async (req, res) => {
    try {
      await contentStore.remove(col, req.params.id);
    } catch (err) {
      console.error(`Delete ${col} error:`, err);
    }
    res.redirect(`/admin/content/${col}`);
  });

  router.post(`/content/${col}/:id/toggle-public`, async (req, res) => {
    try {
      const isPublic = await contentStore.togglePublic(col, req.params.id);
      res.json({ success: true, isPublic });
    } catch (err) {
      res.status(500).json({ error: 'Failed' });
    }
  });
});

// ─── Connections ─────────────────────────────────────────────────────────────
router.get('/connections', async (req, res) => {
  try {
    const snap = await db.collection('connections').orderBy('dateAdded', 'desc').get();
    const connections = snap.docs.map(d => ({ id: d.id, ...d.data() }));

    const collections = ['books', 'courses', 'articles_saved', 'writings', 'movies', 'reflections', 'trips'];
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

// ─── Notebooks & Study Notes ─────────────────────────────────────────────────
const notebookStore = require('../utils/notebooks');

router.get('/notebooks', async (req, res) => {
  try {
    const notebooks = await notebookStore.adminListNotebooks();
    const noteCounts = {};
    for (const nb of notebooks) {
      const notes = await notebookStore.listNotes(nb.id);
      noteCounts[nb.id] = notes.length;
    }
    res.render('admin/notebooks', {
      title: 'Notebooks',
      notebooks,
      noteCounts,
      formatDate,
    });
  } catch (err) {
    console.error('List notebooks error:', err);
    res.render('admin/notebooks', { title: 'Notebooks', notebooks: [], noteCounts: {}, formatDate });
  }
});

router.get('/notebooks/new', (req, res) => {
  res.render('admin/notebook-form', { title: 'New Notebook', notebook: null });
});

router.post('/notebooks', async (req, res) => {
  try {
    const id = await notebookStore.createNotebook(req.body);
    res.redirect(`/admin/notebooks/${id}`);
  } catch (err) {
    console.error('Create notebook error:', err);
    res.redirect('/admin/notebooks/new');
  }
});

router.get('/notebooks/:id', async (req, res) => {
  try {
    const notebook = await notebookStore.getNotebook(req.params.id);
    if (!notebook) return res.redirect('/admin/notebooks');
    const notes = await notebookStore.listNotes(notebook.id);
    res.render('admin/notebook-detail', {
      title: notebook.title,
      notebook,
      notes,
      formatDate,
    });
  } catch (err) {
    console.error('Notebook detail error:', err);
    res.redirect('/admin/notebooks');
  }
});

router.get('/notebooks/:id/edit', async (req, res) => {
  const notebook = await notebookStore.getNotebook(req.params.id);
  if (!notebook) return res.redirect('/admin/notebooks');
  res.render('admin/notebook-form', { title: 'Edit Notebook', notebook });
});

router.post('/notebooks/:id', async (req, res) => {
  try {
    await notebookStore.updateNotebook(req.params.id, req.body);
    res.redirect(`/admin/notebooks/${req.params.id}`);
  } catch (err) {
    console.error('Update notebook error:', err);
    res.redirect(`/admin/notebooks/${req.params.id}/edit`);
  }
});

router.post('/notebooks/:id/delete', async (req, res) => {
  try {
    await notebookStore.deleteNotebook(req.params.id);
  } catch (err) {
    console.error('Delete notebook error:', err);
  }
  res.redirect('/admin/notebooks');
});

router.post('/notebooks/:id/toggle-public', async (req, res) => {
  try {
    const isPublic = await notebookStore.toggleNotebookPublic(req.params.id);
    res.json({ success: true, isPublic });
  } catch (err) {
    res.status(500).json({ error: 'Failed' });
  }
});

router.get('/notebooks/:notebookId/notes/new', async (req, res) => {
  const notebook = await notebookStore.getNotebook(req.params.notebookId);
  if (!notebook) return res.redirect('/admin/notebooks');
  res.render('admin/note-form', { title: 'New Note', notebook, note: null });
});

router.get('/notebooks/:notebookId/notes/:noteId/edit', async (req, res) => {
  const notebook = await notebookStore.getNotebook(req.params.notebookId);
  const note = await notebookStore.getNote(req.params.noteId);
  if (!notebook || !note) return res.redirect(`/admin/notebooks/${req.params.notebookId}`);
    res.render('admin/note-form', { title: 'Edit Note', notebook, note, saved: req.query.saved === '1' });
});

router.post('/notebooks/:notebookId/notes', async (req, res) => {
  try {
    const id = await notebookStore.createNote(req.params.notebookId, req.body);
    res.redirect(`/admin/notebooks/${req.params.notebookId}/notes/${id}/edit`);
  } catch (err) {
    console.error('Create note error:', err);
    res.redirect(`/admin/notebooks/${req.params.notebookId}/notes/new`);
  }
});

router.post('/notebooks/:notebookId/notes/:noteId', async (req, res) => {
  try {
    await notebookStore.updateNote(req.params.noteId, req.body);
    res.redirect(`/admin/notebooks/${req.params.notebookId}/notes/${req.params.noteId}/edit?saved=1`);
  } catch (err) {
    console.error('Update note error:', err);
    res.redirect(`/admin/notebooks/${req.params.notebookId}/notes/${req.params.noteId}/edit`);
  }
});

router.post('/notebooks/:notebookId/notes/:noteId/delete', async (req, res) => {
  try {
    await notebookStore.deleteNote(req.params.noteId);
  } catch (err) {
    console.error('Delete note error:', err);
  }
  res.redirect(`/admin/notebooks/${req.params.notebookId}`);
});

router.post('/notebooks/:notebookId/notes/:noteId/toggle-public', async (req, res) => {
  try {
    const isPublic = await notebookStore.toggleNotePublic(req.params.noteId);
    res.json({ success: true, isPublic });
  } catch (err) {
    res.status(500).json({ error: 'Failed' });
  }
});

module.exports = router;
