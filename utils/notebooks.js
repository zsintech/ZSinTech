const { db, isConfigured, admin } = require('../firebase-admin');
const { createSlug } = require('./slug');
const staticNotebooks = require('../data/notebooks');
const staticNotes = require('../data/notebook-notes');

const COL_NOTEBOOKS = 'notebooks';
const COL_NOTES = 'notebook_notes';

function normalizeItem(item) {
  const copy = { ...item };
  if (copy.dateAdded?.toDate) copy.dateAdded = copy.dateAdded.toDate();
  if (copy.dateUpdated?.toDate) copy.dateUpdated = copy.dateUpdated.toDate();
  return copy;
}

async function listNotebooks(filters = {}) {
  if (isConfigured && db) {
    try {
      let query = db.collection(COL_NOTEBOOKS);
      if (filters.publicOnly) query = query.where('isPublic', '==', true);
      query = query.orderBy('dateUpdated', 'desc');
      const snap = await query.get();
      if (!snap.empty) {
        return snap.docs.map(d => normalizeItem({ id: d.id, ...d.data() }));
      }
    } catch { /* fall through */ }
  }
  return staticNotebooks.getAll(filters);
}

async function getNotebook(id) {
  if (isConfigured && db) {
    try {
      const doc = await db.collection(COL_NOTEBOOKS).doc(id).get();
      if (doc.exists) return normalizeItem({ id: doc.id, ...doc.data() });
      const bySlug = await db.collection(COL_NOTEBOOKS).where('slug', '==', id).limit(1).get();
      if (!bySlug.empty) {
        const d = bySlug.docs[0];
        return normalizeItem({ id: d.id, ...d.data() });
      }
    } catch { /* fall through */ }
  }
  return staticNotebooks.getById(id);
}

async function adminListNotebooks() {
  return listNotebooks({});
}

async function createNotebook(data) {
  if (!isConfigured || !db) throw new Error('Database not configured');
  const id = data.slug || createSlug(data.title || 'notebook');
  const now = admin.firestore.Timestamp.now();
  const payload = {
    title: data.title || '',
    subject: data.subject || '',
    description: data.description || '',
    slug: id,
    isPublic: data.isPublic === true || data.isPublic === 'true',
    dateAdded: now,
    dateUpdated: now,
  };
  await db.collection(COL_NOTEBOOKS).doc(id).set(payload);
  return id;
}

async function updateNotebook(id, data) {
  if (!isConfigured || !db) throw new Error('Database not configured');
  const payload = {
    title: data.title || '',
    subject: data.subject || '',
    description: data.description || '',
    isPublic: data.isPublic === true || data.isPublic === 'true',
    dateUpdated: admin.firestore.Timestamp.now(),
  };
  if (data.slug) payload.slug = data.slug;
  await db.collection(COL_NOTEBOOKS).doc(id).update(payload);
}

async function deleteNotebook(id) {
  if (!isConfigured || !db) throw new Error('Database not configured');
  const notesSnap = await db.collection(COL_NOTES).where('notebookId', '==', id).get();
  const batch = db.batch();
  notesSnap.docs.forEach(d => batch.delete(d.ref));
  batch.delete(db.collection(COL_NOTEBOOKS).doc(id));
  await batch.commit();
}

async function toggleNotebookPublic(id) {
  if (!isConfigured || !db) throw new Error('Database not configured');
  const doc = await db.collection(COL_NOTEBOOKS).doc(id).get();
  if (!doc.exists) throw new Error('Not found');
  const current = doc.data().isPublic || false;
  await db.collection(COL_NOTEBOOKS).doc(id).update({
    isPublic: !current,
    dateUpdated: admin.firestore.Timestamp.now(),
  });
  return !current;
}

async function listNotes(notebookId, filters = {}) {
  if (isConfigured && db) {
    try {
      let query = db.collection(COL_NOTES).where('notebookId', '==', notebookId);
      if (filters.publicOnly) query = query.where('isPublic', '==', true);
      query = query.orderBy('dateUpdated', 'desc');
      const snap = await query.get();
      if (!snap.empty) {
        return snap.docs.map(d => normalizeItem({ id: d.id, ...d.data() }));
      }
    } catch {
      /* composite index may be missing — fetch and filter in memory */
      try {
        const snap = await db.collection(COL_NOTES).where('notebookId', '==', notebookId).get();
        if (!snap.empty) {
          let items = snap.docs.map(d => normalizeItem({ id: d.id, ...d.data() }));
          if (filters.publicOnly) items = items.filter(n => n.isPublic !== false);
          return items.sort((a, b) => new Date(b.dateUpdated || b.dateAdded) - new Date(a.dateUpdated || a.dateAdded));
        }
      } catch { /* fall through */ }
    }
  }
  return staticNotes.getByNotebook(notebookId, filters.publicOnly);
}

async function getNote(id) {
  if (isConfigured && db) {
    try {
      const doc = await db.collection(COL_NOTES).doc(id).get();
      if (doc.exists) return normalizeItem({ id: doc.id, ...doc.data() });
      const bySlug = await db.collection(COL_NOTES).where('slug', '==', id).limit(1).get();
      if (!bySlug.empty) {
        const d = bySlug.docs[0];
        return normalizeItem({ id: d.id, ...d.data() });
      }
    } catch { /* fall through */ }
  }
  return staticNotes.getById(id);
}

async function createNote(notebookId, data) {
  if (!isConfigured || !db) throw new Error('Database not configured');
  const id = data.slug || createSlug(data.title || 'note');
  const now = admin.firestore.Timestamp.now();
  const payload = {
    notebookId,
    title: data.title || 'Untitled',
    body: data.body || '',
    slug: id,
    isPublic: data.isPublic === true || data.isPublic === 'true',
    dateAdded: now,
    dateUpdated: now,
  };
  await db.collection(COL_NOTES).doc(id).set(payload);
  await db.collection(COL_NOTEBOOKS).doc(notebookId).update({ dateUpdated: now });
  return id;
}

async function updateNote(id, data) {
  if (!isConfigured || !db) throw new Error('Database not configured');
  const now = admin.firestore.Timestamp.now();
  const payload = {
    title: data.title || 'Untitled',
    body: data.body || '',
    isPublic: data.isPublic === true || data.isPublic === 'true',
    dateUpdated: now,
  };
  if (data.slug) payload.slug = data.slug;
  const doc = await db.collection(COL_NOTES).doc(id).get();
  if (doc.exists && doc.data().notebookId) {
    await db.collection(COL_NOTEBOOKS).doc(doc.data().notebookId).update({ dateUpdated: now });
  }
  await db.collection(COL_NOTES).doc(id).update(payload);
}

async function deleteNote(id) {
  if (!isConfigured || !db) throw new Error('Database not configured');
  const doc = await db.collection(COL_NOTES).doc(id).get();
  if (doc.exists && doc.data().notebookId) {
    await db.collection(COL_NOTEBOOKS).doc(doc.data().notebookId).update({
      dateUpdated: admin.firestore.Timestamp.now(),
    });
  }
  await db.collection(COL_NOTES).doc(id).delete();
}

async function toggleNotePublic(id) {
  if (!isConfigured || !db) throw new Error('Database not configured');
  const doc = await db.collection(COL_NOTES).doc(id).get();
  if (!doc.exists) throw new Error('Not found');
  const current = doc.data().isPublic || false;
  await db.collection(COL_NOTES).doc(id).update({
    isPublic: !current,
    dateUpdated: admin.firestore.Timestamp.now(),
  });
  return !current;
}

async function importStatic() {
  if (!isConfigured || !db) throw new Error('Database not configured');
  let count = 0;
  for (const nb of staticNotebooks.getAll()) {
    const id = nb.id || nb.slug;
    const payload = { ...nb, slug: nb.slug || id };
    delete payload.id;
    if (payload.dateAdded instanceof Date) {
      payload.dateAdded = admin.firestore.Timestamp.fromDate(payload.dateAdded);
    }
    if (payload.dateUpdated instanceof Date) {
      payload.dateUpdated = admin.firestore.Timestamp.fromDate(payload.dateUpdated);
    }
    await db.collection(COL_NOTEBOOKS).doc(id).set(payload, { merge: true });
    count++;
  }
  for (const note of staticNotes.getAll()) {
    const id = note.id || note.slug;
    const payload = { ...note, slug: note.slug || id };
    delete payload.id;
    if (payload.dateAdded instanceof Date) {
      payload.dateAdded = admin.firestore.Timestamp.fromDate(payload.dateAdded);
    }
    if (payload.dateUpdated instanceof Date) {
      payload.dateUpdated = admin.firestore.Timestamp.fromDate(payload.dateUpdated);
    }
    await db.collection(COL_NOTES).doc(id).set(payload, { merge: true });
    count++;
  }
  return count;
}

module.exports = {
  listNotebooks,
  getNotebook,
  adminListNotebooks,
  createNotebook,
  updateNotebook,
  deleteNotebook,
  toggleNotebookPublic,
  listNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
  toggleNotePublic,
  importStatic,
};
