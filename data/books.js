// Books — vocational & literary reading lists

const books = [
  {
    id: 'how-to-read-a-paper',
    title: 'How to Read a Paper',
    author: 'Trisha Greenhalgh',
    shelfType: 'vocational',
    status: 'to-read',
    category: 'Medicine & Research',
    tags: ['evidence', 'research methods', 'medicine'],
    notes: 'Essential for paleopathology and medical-history writing — how to appraise studies without drowning in jargon.',
    coverUrl: 'https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg?auto=compress&cs=tinysrgb&w=800',
    isPublic: true,
    dateAdded: new Date('2024-06-01'),
  },
  {
    id: 'bad-science-vocational',
    title: 'Bad Science',
    author: 'Ben Goldacre',
    shelfType: 'vocational',
    status: 'have-read',
    category: 'Science Communication',
    tags: ['skepticism', 'medicine', 'media'],
    notes: 'Already on Iconic Bitch — foundational for calling out dodgy stats in health journalism.',
    coverUrl: 'https://images.pexels.com/photos/9170539/pexels-photo-9170539.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 5,
    isPublic: true,
    dateAdded: new Date('2024-05-01'),
  },
  {
    id: 'lincolns-melancholy',
    title: "Lincoln's Melancholy",
    author: 'Joshua Wolf Shenk',
    shelfType: 'vocational',
    status: 'to-read',
    category: 'Medical History',
    tags: ['mental health', 'biography', 'history'],
    notes: 'Writing-ideas cluster on Lincoln, depression, and leadership.',
    coverUrl: 'https://images.pexels.com/photos/37072/abraham-lincoln-lincoln-memorial-washington-dc-lincoln.jpg?auto=compress&cs=tinysrgb&w=800',
    isPublic: true,
    dateAdded: new Date('2024-04-15'),
  },
  {
    id: 'the-emperor-of-all-maladies',
    title: 'The Emperor of All Maladies',
    author: 'Siddhartha Mukherjee',
    shelfType: 'vocational',
    status: 'to-read',
    category: 'Medicine',
    tags: ['oncology', 'history', 'science writing'],
    notes: 'Biography of cancer — model for narrative medical history.',
    coverUrl: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=800',
    isPublic: true,
    dateAdded: new Date('2024-03-20'),
  },
  {
    id: 'structure-scientific-revolutions',
    title: 'The Structure of Scientific Revolutions',
    author: 'Thomas Kuhn',
    shelfType: 'vocational',
    status: 'have-read',
    category: 'Philosophy of Science',
    tags: ['paradigms', 'historiography'],
    notes: 'Directly tied to my Kuhn paradigm essay on the site.',
    coverUrl: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 5,
    isPublic: true,
    dateAdded: new Date('2024-02-10'),
  },
  {
    id: 'things-fall-apart',
    title: 'Things Fall Apart',
    author: 'Chinua Achebe',
    shelfType: 'literary',
    status: 'to-read',
    category: 'Fiction',
    tags: ['colonialism', 'masculinity', 'Africa'],
    notes: 'Essay seed on hypermasculinity and stoicism — need a full re-read with that lens.',
    coverUrl: 'https://images.pexels.com/photos/10874581/pexels-photo-10874581.jpeg?auto=compress&cs=tinysrgb&w=800',
    isPublic: true,
    dateAdded: new Date('2024-06-10'),
  },
  {
    id: 'lord-of-the-flies',
    title: 'Lord of the Flies',
    author: 'William Golding',
    shelfType: 'literary',
    status: 'have-read',
    category: 'Fiction',
    tags: ['war', 'allegory', 'civilization'],
    notes: 'Writing idea on war off the page — Golding\'s naval WWII background.',
    coverUrl: 'https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4,
    isPublic: true,
    dateAdded: new Date('2024-05-20'),
  },
  {
    id: 'hitchhikers-guide-book',
    title: "The Hitchhiker's Guide to the Galaxy",
    author: 'Douglas Adams',
    shelfType: 'literary',
    status: 'have-read',
    category: 'Science Fiction',
    tags: ['humor', 'philosophy', 'absurdity'],
    notes: 'Iconic Bitch shelf — serious through absurdity.',
    coverUrl: 'https://images.pexels.com/photos/37895768/pexels-photo-37895768.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 5,
    isPublic: true,
    dateAdded: new Date('2024-04-01'),
  },
  {
    id: 'kafka-complete-stories',
    title: 'The Complete Stories',
    author: 'Franz Kafka',
    shelfType: 'literary',
    status: 'to-read',
    category: 'Fiction',
    tags: ['modernism', 'illness', 'Kafka'],
    notes: 'Compelling narratives essay — Hunger Artist, TB, empathy in patient writing.',
    coverUrl: 'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=800',
    isPublic: true,
    dateAdded: new Date('2024-03-15'),
  },
  {
    id: 'a-little-life',
    title: 'A Little Life',
    author: 'Hanya Yanagihara',
    shelfType: 'literary',
    status: 'have-read',
    category: 'Fiction',
    tags: ['trauma', 'literary fiction'],
    notes: 'Writing idea: tired of trauma porn — need to articulate why.',
    coverUrl: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800',
    isPublic: true,
    dateAdded: new Date('2024-02-28'),
  },
];

const shelfTypes = ['vocational', 'literary'];

function getAll(filters = {}) {
  let items = [...books];
  if (filters.shelfType) items = items.filter(b => b.shelfType === filters.shelfType);
  if (filters.status) items = items.filter(b => b.status === filters.status);
  if (filters.publicOnly) items = items.filter(b => b.isPublic);
  return items.sort((a, b) => b.dateAdded - a.dateAdded);
}

function getById(id) {
  return books.find(b => b.id === id) || null;
}

function getShelfTypes() {
  return shelfTypes;
}

module.exports = { books, getAll, getById, getShelfTypes };
