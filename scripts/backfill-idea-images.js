const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../data/writing-ideas.js');
let content = fs.readFileSync(file, 'utf8');

const pool = [
  'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
  'https://images.pexels.com/photos/3862139/pexels-photo-3862139.jpeg',
  'https://images.pexels.com/photos/256514/pexels-photo-256514.jpeg',
  'https://images.pexels.com/photos/159711/books-book-pages-read-literature-159711.jpeg',
  'https://images.pexels.com/photos/577210/pexels-photo-577210.jpeg',
  'https://images.pexels.com/photos/159832/book-reading-glasses-159832.jpeg',
  'https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg',
  'https://images.pexels.com/photos/159751/book-address-book-learning-learning-159751.jpeg',
  'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg',
  'https://images.pexels.com/photos/356065/pexels-photo-356065.jpeg',
  'https://images.pexels.com/photos/159711/books-book-pages-read-literature-159711.jpeg',
  'https://images.pexels.com/photos/256514/pexels-photo-256514.jpeg',
];

let i = 0;
content = content.replace(/heroImageUrl: ""/g, () => {
  const url = pool[i++ % pool.length];
  return `heroImageUrl: '${url}'`;
});

fs.writeFileSync(file, content);
console.log(`Filled ${i} empty heroImageUrl fields in writing-ideas.js`);
