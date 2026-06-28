const notebooks = [
  {
    id: 'example-course',
    slug: 'example-course',
    title: 'Example Course Notes',
    subject: 'Sample subject',
    description: 'A placeholder notebook — edit or delete from admin.',
    isPublic: false,
    dateAdded: new Date('2025-06-01'),
    dateUpdated: new Date('2025-06-01'),
  },
];

function getAll(filters = {}) {
  let result = [...notebooks];
  if (filters.publicOnly) result = result.filter(n => n.isPublic !== false);
  return result.sort((a, b) => new Date(b.dateUpdated || b.dateAdded) - new Date(a.dateUpdated || a.dateAdded));
}

function getById(id) {
  return notebooks.find(n => n.id === id || n.slug === id) || null;
}

module.exports = { notebooks, getAll, getById };
