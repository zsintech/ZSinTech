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
  const staticItems = staticContent.getAll();
  let items = await fetchFromFirestore(filters);

  if (!items || items.length === 0) {
    items = staticItems;
  } else {
    const bySlug = new Map(items.map(i => [i.slug, i]));
    for (const s of staticItems) {
      if (!bySlug.has(s.slug)) {
        bySlug.set(s.slug, { id: s.id || s.slug, ...s });
      }
    }
    items = [...bySlug.values()];
  }

  if (filters.type) items = items.filter(w => w.type === filters.type);
  else if (filters.excludeStories) items = items.filter(w => w.type !== 'story');
  if (filters.tag) items = items.filter(w => w.tags && w.tags.includes(filters.tag));

  return items.sort((a, b) => {
    const da = a.dateWritten?.toDate ? a.dateWritten.toDate() : a.dateWritten;
    const db = b.dateWritten?.toDate ? b.dateWritten.toDate() : b.dateWritten;
    return new Date(db) - new Date(da);
  });
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
