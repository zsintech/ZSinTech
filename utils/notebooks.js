const { db, isConfigured, admin } = require('../firebase-admin');
const { createSlug } = require('./slug');
const { parseIsPublic } = require('./parsePublic');
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

function parseTags(raw) {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  return String(raw).split(',').map(t => t.trim()).filter(Boolean);
}

function toTimestamp(val) {
  if (!val) return admin.firestore.Timestamp.now();
  if (val.toDate) return val;
  if (val instanceof Date) return admin.firestore.Timestamp.fromDate(val);
  return admin.firestore.Timestamp.fromDate(new Date(val));
}

function parseNotebookFields(data) {
  return {
    title: data.title || '',
    subject: data.subject || '',
    description: data.description || '',
    emoji: data.emoji || '',
    color: data.color || '',
    category: data.category || '',
    semester: data.semester || '',
    coverUrl: data.coverUrl || '',
    tags: parseTags(data.tags),
    isPublic: parseIsPublic(data.isPublic),
  };
}

function parseNoteFields(data) {
  return {
    title: data.title || 'Untitled',
    body: data.body || '',
    category: data.category || '',
    coverUrl: data.coverUrl || '',
    sourceUrl: data.sourceUrl || '',
    excerpt: data.excerpt || '',
    tags: parseTags(data.tags),
    isPublic: parseIsPublic(data.isPublic),
  };
}

async function ensureNotebookInFirestore(notebookId) {
  if (!isConfigured || !db || !notebookId) return;
  const ref = db.collection(COL_NOTEBOOKS).doc(notebookId);
  const doc = await ref.get();
  if (doc.exists) return;

  const staticNb = staticNotebooks.getById(notebookId);
  const now = admin.firestore.Timestamp.now();
  if (staticNb) {
    const payload = {
      title: staticNb.title || '',
      subject: staticNb.subject || '',
      description: staticNb.description || '',
      slug: staticNb.slug || staticNb.id,
      isPublic: staticNb.isPublic === true,
      dateAdded: toTimestamp(staticNb.dateAdded),
      dateUpdated: now,
    };
    await ref.set(payload, { merge: true });
    return;
  }

  await ref.set({
    title: notebookId,
    slug: notebookId,
    isPublic: false,
    dateAdded: now,
    dateUpdated: now,
  }, { merge: true });
}

async function touchNotebook(notebookId, now) {
  if (!notebookId) return;
  await ensureNotebookInFirestore(notebookId);
  await db.collection(COL_NOTEBOOKS).doc(notebookId).set({ dateUpdated: now }, { merge: true });
}

async function uniqueNoteId(preferred) {
  let id = preferred || createSlug('note');
  const existing = await db.collection(COL_NOTES).doc(id).get();
  if (!existing.exists) return id;
  return `${id}-${Date.now()}`;
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
    } catch {
      try {
        const snap = await db.collection(COL_NOTEBOOKS).get();
        if (!snap.empty) {
          let items = snap.docs.map(d => normalizeItem({ id: d.id, ...d.data() }));
          if (filters.publicOnly) items = items.filter(n => n.isPublic === true);
          return items.sort((a, b) => new Date(b.dateUpdated || b.dateAdded) - new Date(a.dateUpdated || a.dateAdded));
        }
      } catch { /* fall through */ }
    }
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
  const firestoreItems = [];
  if (isConfigured && db) {
    try {
      const snap = await db.collection(COL_NOTEBOOKS).orderBy('dateUpdated', 'desc').get();
      firestoreItems.push(...snap.docs.map(d => normalizeItem({ id: d.id, ...d.data(), _inFirestore: true })));
    } catch {
      try {
        const snap = await db.collection(COL_NOTEBOOKS).get();
        firestoreItems.push(...snap.docs.map(d => normalizeItem({ id: d.id, ...d.data(), _inFirestore: true })));
      } catch { /* fall through */ }
    }
  }

  const map = new Map();
  staticNotebooks.getAll().forEach(nb => {
    map.set(nb.id, { ...nb, _inFirestore: false, _staticOnly: true });
  });
  firestoreItems.forEach(nb => {
    map.set(nb.id, { ...map.get(nb.id), ...nb, _inFirestore: true, _staticOnly: false });
  });

  return [...map.values()].sort((a, b) =>
    new Date(b.dateUpdated || b.dateAdded) - new Date(a.dateUpdated || a.dateAdded)
  );
}

async function createNotebook(data) {
  if (!isConfigured || !db) throw new Error('Database not configured');
  const id = data.slug || createSlug(data.title || 'notebook');
  const now = admin.firestore.Timestamp.now();
  const fields = parseNotebookFields(data);
  const payload = {
    ...fields,
    slug: id,
    dateAdded: now,
    dateUpdated: now,
  };
  await db.collection(COL_NOTEBOOKS).doc(id).set(payload);
  return id;
}

async function updateNotebook(id, data) {
  if (!isConfigured || !db) throw new Error('Database not configured');
  await ensureNotebookInFirestore(id);
  const fields = parseNotebookFields(data);
  const payload = {
    ...fields,
    dateUpdated: admin.firestore.Timestamp.now(),
  };
  if (data.slug) payload.slug = data.slug;
  await db.collection(COL_NOTEBOOKS).doc(id).set(payload, { merge: true });
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
  await ensureNotebookInFirestore(id);
  const ref = db.collection(COL_NOTEBOOKS).doc(id);
  const doc = await ref.get();
  if (!doc.exists) throw new Error('Not found');
  const current = doc.data().isPublic || false;
  await ref.update({
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
      try {
        const snap = await db.collection(COL_NOTES).where('notebookId', '==', notebookId).get();
        if (!snap.empty) {
          let items = snap.docs.map(d => normalizeItem({ id: d.id, ...d.data() }));
          if (filters.publicOnly) items = items.filter(n => n.isPublic === true);
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
  await ensureNotebookInFirestore(notebookId);

  const fields = parseNoteFields(data);
  const preferredId = data.slug || createSlug(fields.title);
  const id = await uniqueNoteId(preferredId);
  const now = admin.firestore.Timestamp.now();
  const payload = {
    ...fields,
    notebookId,
    slug: id,
    dateAdded: now,
    dateUpdated: now,
  };
  await db.collection(COL_NOTES).doc(id).set(payload);
  await touchNotebook(notebookId, now);
  return id;
}

async function updateNote(id, data) {
  if (!isConfigured || !db) throw new Error('Database not configured');

  const fields = parseNoteFields(data);
  const now = admin.firestore.Timestamp.now();
  const noteRef = db.collection(COL_NOTES).doc(id);
  const doc = await noteRef.get();

  const notebookId = (doc.exists && doc.data().notebookId) || data.notebookId;
  if (notebookId) await ensureNotebookInFirestore(notebookId);

  const payload = {
    ...fields,
    dateUpdated: now,
  };
  if (data.slug) payload.slug = data.slug;

  if (doc.exists) {
    await noteRef.update(payload);
  } else {
    const staticNote = staticNotes.getById(id);
    await noteRef.set({
      ...(staticNote || {}),
      ...payload,
      notebookId: notebookId || staticNote?.notebookId,
      slug: staticNote?.slug || id,
      dateAdded: staticNote?.dateAdded ? toTimestamp(staticNote.dateAdded) : now,
    }, { merge: true });
  }

  if (notebookId) await touchNotebook(notebookId, now);
}

async function deleteNote(id) {
  if (!isConfigured || !db) throw new Error('Database not configured');
  const doc = await db.collection(COL_NOTES).doc(id).get();
  if (doc.exists && doc.data().notebookId) {
    await touchNotebook(doc.data().notebookId, admin.firestore.Timestamp.now());
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
