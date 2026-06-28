// Iconic Bitch — curated reading list from Notion
// https://www.notion.so/Iconic-Bitch-30f2eae24c0449f895e8f8e1730572dc

const items = [
  {
    id: 'bad-science',
    title: "Bad Science",
    author: "Ben Goldacre",
    type: 'book',
    url: "https://www.goodreads.com/book/show/638055.Bad_Science",
    excerpt: "A demolition of bad science journalism, dodgy statistics, and the misuse of research in the media.",
    notes: "Ben Goldacre's demolition of dodgy statistics and media misuse of research is foundational for everything I do in science communication. Reading it early inoculated me against headline epidemiology and \"brain supplement\" logic — the same instincts I later applied writing about AI diagnosis and pandemic misinformation for The AUIS Voice. It teaches skepticism without cynicism: respect evidence, distrust packaging.",
    tags: ["science communication","skepticism","medicine"],
    coverUrl: "https://images.pexels.com/photos/9170539/pexels-photo-9170539.jpeg?auto=compress&cs=tinysrgb&w=1920",
    status: 'have-read',
    isPublic: true,
    dateAdded: new Date('2024-01-10'),
  },
  {
    id: 'hitchhikers-guide',
    title: "The Hitchhiker's Guide to the Galaxy",
    author: "Douglas Adams",
    type: 'book',
    url: "https://www.goodreads.com/book/show/11.The_Hitchhiker_s_Guide_to_the_Galaxy",
    excerpt: "Don't panic. The absurd, brilliant sci-fi classic that asks the ultimate question about life, the universe, and everything.",
    notes: "Douglas Adams gave me permission to be serious through absurdity — the answer is 42 because the question was never properly formed. As a bridge between engineering and storytelling, Hitchhiker's is anti-hubris literature: the universe is vast, bureaucracy is eternal, and panic is never the right response. I reread it when building PopSci AI and need reminding that wonder beats jargon.",
    tags: ["science fiction","humor","philosophy"],
    coverUrl: "https://images.pexels.com/photos/37895768/pexels-photo-37895768.jpeg?auto=compress&cs=tinysrgb&w=1920",
    status: 'have-read',
    isPublic: true,
    dateAdded: new Date('2023-11-20'),
  }
];

function getAll() {
  return [...items].sort((a, b) => b.dateAdded - a.dateAdded);
}

module.exports = { items, getAll };
