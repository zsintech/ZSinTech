// Courses I want to take — shelf / learning queue

const courses = [
  {
    id: 'machine-learning-ng',
    title: 'Machine Learning',
    instructor: 'Andrew Ng',
    platform: 'Coursera',
    url: 'https://www.coursera.org/learn/machine-learning',
    status: 'want-to-take',
    category: 'Computer Science',
    tags: ['AI', 'machine learning', 'statistics'],
    notes: 'Foundational supervised and unsupervised learning — revisit for PopSci AI and writing on AI diagnosis.',
    isPublic: true,
    dateAdded: new Date('2024-06-01'),
  },
  {
    id: 'mit-intro-philosophy',
    title: 'Introduction to Philosophy',
    instructor: 'MIT Faculty',
    platform: 'MIT OCW',
    url: 'https://ocw.mit.edu/courses/24-00-introduction-to-philosophy-fall-2004/',
    status: 'want-to-take',
    category: 'Philosophy',
    tags: ['philosophy', 'ethics', 'dualism'],
    notes: 'Pairs with Descartes/dualism writing cluster and Cultural Literacy Newman thread.',
    isPublic: true,
    dateAdded: new Date('2024-05-15'),
  },
  {
    id: 'human-anatomy-future-learn',
    title: 'Human Anatomy and Physiology',
    instructor: 'FutureLearn',
    platform: 'FutureLearn',
    url: 'https://www.futurelearn.com/courses/human-anatomy',
    status: 'want-to-take',
    category: 'Medicine',
    tags: ['anatomy', 'physiology', 'medical history'],
    notes: 'Background for paleopathology, medical history essays, and doctor-in-literature piece.',
    isPublic: true,
    dateAdded: new Date('2024-04-20'),
  },
  {
    id: 'greek-mythology-coursera',
    title: 'Greek and Roman Mythology',
    instructor: 'Peter Struck',
    platform: 'Coursera',
    url: 'https://www.coursera.org/learn/greek-roman-mythology',
    status: 'in-progress',
    category: 'Classics',
    tags: ['classics', 'mythology', 'Homer'],
    notes: 'Western Resources / Iliad-Odyssey cluster — context for cultural literacy essay.',
    isPublic: true,
    dateAdded: new Date('2024-03-10'),
  },
  {
    id: 'logic-intro-stanford',
    title: 'Introduction to Logic',
    instructor: 'Stanford Online',
    platform: 'Stanford Online',
    url: 'https://online.stanford.edu/courses/sohs-philosophy-introduction-logic',
    status: 'want-to-take',
    category: 'Philosophy',
    tags: ['logic', 'rhetoric', 'literacy'],
    notes: 'Literacy and Logic writing idea — fuzzy logic vs. digital literacy.',
    isPublic: true,
    dateAdded: new Date('2024-02-01'),
  },
];

const statuses = ['want-to-take', 'in-progress', 'completed'];

function getAll(filters = {}) {
  let items = [...courses];
  if (filters.status) items = items.filter(c => c.status === filters.status);
  if (filters.publicOnly) items = items.filter(c => c.isPublic);
  return items.sort((a, b) => b.dateAdded - a.dateAdded);
}

function getById(id) {
  return courses.find(c => c.id === id) || null;
}

function getStatuses() {
  return statuses;
}

module.exports = { courses, getAll, getById, getStatuses };
