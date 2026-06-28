// PopSci AI — science communication reels from @zsintech on Instagram
// Full catalog lives on Instagram (QR-linked articles in bio/posts)

const reels = [
  {
    id: 'whale-falls',
    slug: 'whale-falls',
    title: 'Whale Falls',
    topic: 'Marine Biology',
    excerpt: 'When a whale dies, its body becomes an entire deep-sea ecosystem — a whale fall can sustain life for decades.',
    sourceNote: 'Featured on @zsintech — scan QR in reel for full article',
    instagramUrl: 'https://www.instagram.com/zsintech/',
    tags: ['marine biology', 'ecology', 'deep sea'],
    heroImageUrl: 'https://images.pexels.com/photos/128756/pexels-photo-128756.jpeg?auto=compress&cs=tinysrgb&w=1920',
    datePublished: new Date('2025-11-15'),
    isPublic: true,
  },
  {
    id: 'quantum-computing',
    slug: 'quantum-computing',
    title: 'Quantum Computing Fundamentals',
    topic: 'Physics',
    excerpt: 'Qubits, superposition, and why quantum computers might crack problems classical machines never could.',
    sourceNote: 'Featured on @zsintech — scan QR in reel for full article',
    instagramUrl: 'https://www.instagram.com/zsintech/',
    tags: ['quantum', 'computing', 'physics'],
    heroImageUrl: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1920',
    datePublished: new Date('2025-10-20'),
    isPublic: true,
  },
  {
    id: 'neuroscience-breakthroughs',
    slug: 'neuroscience-breakthroughs',
    title: 'Neuroscience Breakthroughs',
    topic: 'Neuroscience',
    excerpt: 'From connectomics to brain-computer interfaces — the discoveries reshaping how we understand the mind.',
    sourceNote: 'Featured on @zsintech — scan QR in reel for full article',
    instagramUrl: 'https://www.instagram.com/zsintech/',
    tags: ['neuroscience', 'brain', 'research'],
    heroImageUrl: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=1920',
    datePublished: new Date('2025-09-08'),
    isPublic: true,
  },
  {
    id: 'climate-science',
    slug: 'climate-science',
    title: 'Climate Science Updates',
    topic: 'Climate',
    excerpt: 'Making climate research accessible — tipping points, carbon cycles, and what the data actually says.',
    sourceNote: 'Featured on @zsintech — scan QR in reel for full article',
    instagramUrl: 'https://www.instagram.com/zsintech/',
    tags: ['climate', 'environment', 'science communication'],
    heroImageUrl: 'https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&w=1920',
    datePublished: new Date('2025-08-12'),
    isPublic: true,
  },
  {
    id: 'evolutionary-biology',
    slug: 'evolutionary-biology',
    title: 'Evolutionary Biology',
    topic: 'Biology',
    excerpt: 'Speciation, adaptation, and the stories evolution tells when you know where to look.',
    sourceNote: 'Featured on @zsintech — scan QR in reel for full article',
    instagramUrl: 'https://www.instagram.com/zsintech/',
    tags: ['evolution', 'biology', 'speciation'],
    heroImageUrl: 'https://images.pexels.com/photos/847393/pexels-photo-847393.jpeg?auto=compress&cs=tinysrgb&w=1920',
    datePublished: new Date('2025-07-01'),
    isPublic: true,
  },
];

function getAll() {
  return [...reels].sort((a, b) => b.datePublished - a.datePublished);
}

function getBySlug(slug) {
  return reels.find(r => r.slug === slug) || null;
}

module.exports = { reels, getAll, getBySlug };
