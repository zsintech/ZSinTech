// Solo Date — personal log from Notion
// https://www.notion.so/Solo-Date-46ea920d7f7149249ca069662a5ade6d
// Notion page is a blank template — structure ready for entries

const dates = [
  {
    id: 'museum-afternoon',
    title: 'Museum & Coffee',
    date: new Date('2024-05-18'),
    location: 'Local art museum',
    activity: 'culture',
    mood: 'inspired',
    notes: 'Spent the afternoon with Renaissance portraits and a notebook. Sometimes the best company is your own curiosity.',
    tags: ['art', 'writing', 'self-care'],
    isPublic: true,
  },
  {
    id: 'sunrise-walk',
    title: 'Sunrise Walk & Podcast',
    date: new Date('2024-04-02'),
    location: 'Riverside trail',
    activity: 'nature',
    mood: 'calm',
    notes: 'Early morning walk with a science podcast. No agenda, just movement and ideas.',
    tags: ['nature', 'science', 'mindfulness'],
    isPublic: true,
  },
];

const activities = ['culture', 'nature', 'food', 'reading', 'creative', 'adventure'];

function getAll() {
  return [...dates].sort((a, b) => b.date - a.date);
}

module.exports = { dates, getAll, activities };
