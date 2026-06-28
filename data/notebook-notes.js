const notes = [
  {
    id: 'welcome-note',
    slug: 'welcome-note',
    notebookId: 'example-course',
    title: 'Getting started',
    body: 'This is your first note. Click to edit and start writing.\n\nUse this space for lecture notes, reading summaries, or anything you are studying.',
    isPublic: false,
    dateAdded: new Date('2025-06-01'),
    dateUpdated: new Date('2025-06-01'),
  },
];

function getAll(filters = {}) {
  let result = [...notes];
  if (filters.notebookId) result = result.filter(n => n.notebookId === filters.notebookId);
  if (filters.publicOnly) result = result.filter(n => n.isPublic !== false);
  return result.sort((a, b) => new Date(b.dateUpdated || b.dateAdded) - new Date(a.dateUpdated || a.dateAdded));
}

function getById(id) {
  return notes.find(n => n.id === id || n.slug === id) || null;
}

function getByNotebook(notebookId, publicOnly = false) {
  return getAll({ notebookId, publicOnly });
}

module.exports = { notes, getAll, getById, getByNotebook };
