// Solo Date — personal log from Notion
// https://www.notion.so/Solo-Date-46ea920d7f7149249ca069662a5ade6d

const dates = [
  {
    id: 'museum-afternoon',
    title: 'Museum & Coffee',
    date: new Date('2024-05-18'),
    location: 'Local art museum',
    activity: 'culture',
    mood: 'inspired',
    notes: 'Spent the afternoon with Renaissance portraits and a notebook. Sometimes the best company is your own curiosity — sketched essay ideas about portraiture and power while the espresso went cold.',
    tags: ['art', 'writing', 'self-care'],
    heroImageUrl: 'https://images.pexels.com/photos/1191710/pexels-photo-1191710.jpeg?auto=compress&cs=tinysrgb&w=1920',
    isPublic: true,
  },
  {
    id: 'sunrise-walk',
    title: 'Sunrise Walk & Podcast',
    date: new Date('2024-04-02'),
    location: 'Riverside trail',
    activity: 'nature',
    mood: 'calm',
    notes: 'Early morning walk with a science podcast. No agenda, just movement and ideas — the kind of reset that makes afternoon writing feel possible again.',
    tags: ['nature', 'science', 'mindfulness'],
    heroImageUrl: 'https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&w=1920',
    isPublic: true,
  },
  {
    id: 'bookstore-solo',
    title: 'Bookstore Browsing',
    date: new Date('2024-03-10'),
    location: 'Independent bookstore',
    activity: 'reading',
    mood: 'curious',
    notes: 'Two hours among shelves without a shopping list — picked up a used philosophy of science title and a novel I might never finish. That is fine. Solo dates are for wandering, not optimizing.',
    tags: ['books', 'literary', 'slow living'],
    heroImageUrl: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1920',
    isPublic: true,
  },
  {
    id: 'cinema-alone',
    title: 'Matinee for One',
    date: new Date('2024-02-14'),
    location: 'Downtown cinema',
    activity: 'culture',
    mood: 'reflective',
    notes: 'Went to a documentary alone on a holiday everyone else treats as couples-only. Loved every minute — no one to negotiate snacks with, full attention on the screen.',
    tags: ['film', 'independence', 'self-care'],
    heroImageUrl: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1920',
    isPublic: true,
  },
  {
    id: 'cafe-journaling',
    title: 'Café Journaling',
    date: new Date('2024-01-20'),
    location: 'Corner café',
    activity: 'creative',
    mood: 'focused',
    notes: 'Brought a notebook instead of a laptop. Handwrote three writing-idea seeds and people-watched between paragraphs. Analog still wins for first drafts.',
    tags: ['writing', 'journaling', 'café'],
    heroImageUrl: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1920',
    isPublic: true,
  },
];

const activities = ['culture', 'nature', 'food', 'reading', 'creative', 'adventure'];

function getAll() {
  return [...dates].sort((a, b) => b.date - a.date);
}

module.exports = { dates, getAll, activities };
