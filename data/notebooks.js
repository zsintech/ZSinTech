const notebooks = [
  {
    id: 'web-applications',
    slug: 'web-applications',
    title: 'Web Applications',
    subject: 'Software Engineering · AUIS',
    description: 'Sessions, DNS, TCP/IP, HTTP, Express, EJS, cookies, and MySQL — full stack lecture notes.',
    emoji: '🌐',
    color: '#2563eb',
    category: 'Course',
    semester: 'Fall 2025',
    isPublic: true,
    dateAdded: new Date('2026-08-11'),
    dateUpdated: new Date('2026-08-11'),
  },
  {
    id: 'java-programming',
    slug: 'java-programming',
    title: 'Java Programming',
    subject: 'Software Engineering · AUIS',
    description: 'Methods, OOP, memory model, inheritance, UML, and design — lecture notes with exam traps highlighted.',
    emoji: '☕',
    color: '#c2410c',
    category: 'Course',
    semester: 'Fall 2025',
    isPublic: true,
    dateAdded: new Date('2026-08-11'),
    dateUpdated: new Date('2026-08-11'),
  },
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
