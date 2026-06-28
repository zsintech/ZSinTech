const { db, isConfigured } = require('../firebase-admin');
const staticContent = require('../data/writings');

async function fetchFromFirestore(filters = {}) {
  if (!isConfigured || !db) return null;
  try {
    let query = db.collection('writings').where('isPublic', '==', true);
    if (filters.type) query = query.where('type', '==', filters.type);
    query = query.orderBy('dateWritten', 'desc');
    const snap = await query.get();
    if (snap.empty) return null;
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch {
    return null;
  }
}

async function getPublicWritings(filters = {}) {
  let items = await fetchFromFirestore(filters);
  if (!items || items.length === 0) {
    items = staticContent.getAll();
    if (filters.type) items = items.filter(w => w.type === filters.type);
    else if (filters.excludeStories) items = items.filter(w => w.type !== 'story');
    if (filters.tag) items = items.filter(w => w.tags && w.tags.includes(filters.tag));
  }
  return items;
}

async function getWritingBySlug(slug) {
  if (!isConfigured || !db) return staticContent.getBySlug(slug);
  try {
    const snap = await db.collection('writings')
      .where('slug', '==', slug)
      .where('isPublic', '==', true)
      .limit(1)
      .get();
    if (!snap.empty) return { id: snap.docs[0].id, ...snap.docs[0].data() };
  } catch { /* fall through */ }
  return staticContent.getBySlug(slug);
}

module.exports = { getPublicWritings, getWritingBySlug };
