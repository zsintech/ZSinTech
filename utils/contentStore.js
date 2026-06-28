const { db, isConfigured, admin } = require('../firebase-admin');
const { createSlug } = require('./slug');

const STATIC_LOADERS = {
  books: () => require('../data/books').getAll(),
  courses: () => require('../data/courses').getAll(),
  writing_ideas: () => require('../data/writing-ideas').getAll(),
  research_papers: () => require('../data/research-papers').getAll(),
  iconic_bitch: () => require('../data/iconic-bitch').getAll(),
  articles_read: () => require('../data/articles-read').getAll(),
  journalism: () => require('../data/auis-voice').getAll(),
  popsci_reels: () => require('../data/popsci-reels').getAll(),
  solo_dates: () => require('../data/solo-dates').getAll(),
  travel: () => require('../data/travel').getAll(),
  reflections: () => require('../data/reflections').getAll(),
  writings: () => require('../data/writings').getAll(),
};

function normalizeItem(item) {
  const copy = { ...item };
  if (copy.dateAdded?.toDate) copy.dateAdded = copy.dateAdded.toDate();
  if (copy.date?.toDate) copy.date = copy.date.toDate();
  if (copy.dateWritten?.toDate) copy.dateWritten = copy.dateWritten.toDate();
  if (copy.datePublished?.toDate) copy.datePublished = copy.datePublished.toDate();
  return copy;
}

function applyFilters(items, filters = {}) {
  let result = [...items];
  if (filters.publicOnly) result = result.filter(i => i.isPublic !== false);
  if (filters.status) result = result.filter(i => i.status === filters.status);
  if (filters.category) result = result.filter(i => i.category === filters.category);
  if (filters.type) result = result.filter(i => i.type === filters.type);
  if (filters.tag) result = result.filter(i => i.tags && i.tags.includes(filters.tag));
  if (filters.shelfType) result = result.filter(i => i.shelfType === filters.shelfType);
  return result;
}

function getStaticList(collection, filters = {}) {
  const loader = STATIC_LOADERS[collection];
  if (!loader) return [];
  return applyFilters(loader(), filters);
}

async function listFromFirestore(collection, filters = {}) {
  if (!isConfigured || !db) return null;
  try {
    let query = db.collection(collection);
    if (filters.publicOnly) query = query.where('isPublic', '==', true);
    if (filters.status) query = query.where('status', '==', filters.status);
    if (filters.category) query = query.where('category', '==', filters.category);
    if (filters.type) query = query.where('type', '==', filters.type);

    const orderField = filters.orderBy || 'dateAdded';
    query = query.orderBy(orderField, 'desc');

    const snap = await query.get();
    if (snap.empty) return null;
    let items = snap.docs.map(d => normalizeItem({ id: d.id, ...d.data() }));
    if (filters.tag) items = items.filter(i => i.tags && i.tags.includes(filters.tag));
    return items;
  } catch {
    return null;
  }
}

async function list(collection, filters = {}) {
  const stored = await listFromFirestore(collection, filters);
  if (stored && stored.length) return stored;
  return getStaticList(collection, filters);
}

async function getById(collection, id) {
  if (isConfigured && db) {
    try {
      const doc = await db.collection(collection).doc(id).get();
      if (doc.exists) return normalizeItem({ id: doc.id, ...doc.data() });

      const bySlug = await db.collection(collection).where('slug', '==', id).limit(1).get();
      if (!bySlug.empty) {
        const d = bySlug.docs[0];
        return normalizeItem({ id: d.id, ...d.data() });
      }
    } catch { /* fall through */ }
  }

  const staticItems = getStaticList(collection);
  return staticItems.find(i => i.id === id || i.slug === id) || null;
}

async function adminList(collection, filters = {}) {
  if (!isConfigured || !db) return getStaticList(collection, filters);
  try {
    let query = db.collection(collection);
    if (filters.status) query = query.where('status', '==', filters.status);
    query = query.orderBy('dateAdded', 'desc');
    const snap = await query.get();
    if (snap.empty) return getStaticList(collection, filters);
    return applyFilters(
      snap.docs.map(d => normalizeItem({ id: d.id, ...d.data() })),
      filters
    );
  } catch {
    return getStaticList(collection, filters);
  }
}

async function create(collection, data) {
  if (!isConfigured || !db) throw new Error('Database not configured');
  const id = data.id || data.slug || createSlug(data.title || 'item');
  const payload = {
    ...data,
    slug: data.slug || id,
    isPublic: data.isPublic === true || data.isPublic === 'true',
    dateAdded: admin.firestore.Timestamp.now(),
  };
  delete payload.id;
  await db.collection(collection).doc(id).set(payload);
  return id;
}

async function update(collection, id, data) {
  if (!isConfigured || !db) throw new Error('Database not configured');
  const payload = { ...data };
  delete payload.id;
  payload.isPublic = payload.isPublic === true || payload.isPublic === 'true';
  await db.collection(collection).doc(id).update(payload);
}

async function remove(collection, id) {
  if (!isConfigured || !db) throw new Error('Database not configured');
  await db.collection(collection).doc(id).delete();
}

async function togglePublic(collection, id) {
  if (!isConfigured || !db) throw new Error('Database not configured');
  const doc = await db.collection(collection).doc(id).get();
  if (!doc.exists) throw new Error('Not found');
  const current = doc.data().isPublic || false;
  await db.collection(collection).doc(id).update({ isPublic: !current });
  return !current;
}

async function importStaticCollection(collection) {
  if (!isConfigured || !db) throw new Error('Database not configured');
  const items = getStaticList(collection);
  let count = 0;
  for (const item of items) {
    const id = item.id || item.slug || createSlug(item.title);
    const payload = { ...item, slug: item.slug || id, isPublic: item.isPublic !== false };
    if (payload.dateAdded instanceof Date) {
      payload.dateAdded = admin.firestore.Timestamp.fromDate(payload.dateAdded);
    } else if (!payload.dateAdded) {
      payload.dateAdded = admin.firestore.Timestamp.now();
    }
    delete payload.id;
    await db.collection(collection).doc(id).set(payload, { merge: true });
    count++;
  }
  return count;
}

async function importAllStatic() {
  const results = {};
  for (const collection of Object.keys(STATIC_LOADERS)) {
    results[collection] = await importStaticCollection(collection);
  }
  return results;
}

module.exports = {
  list,
  getById,
  adminList,
  create,
  update,
  remove,
  togglePublic,
  importStaticCollection,
  importAllStatic,
  getStaticList,
  STATIC_LOADERS,
};
