// Plan All the Way — travel itineraries from Notion
// https://www.notion.so/bcaed1575dc54e42aa2db0546911f41e

const trips = [
  {
    id: 'athens',
    slug: 'athens',
    title: 'Athens',
    destination: 'Athens, Greece',
    status: 'planned',
    dateStart: null,
    dateEnd: null,
    concept: '',
    budget: '8 Past Papers',
    notes: 'History, museums, and one perfect night out — keep it simple and soak in the acropolis.',
    links: [
      { title: 'Acropolis Museum Tickets', url: 'https://etickets.theacropolismuseum.gr/?culture=en' },
      { title: 'Acropolis Travel Guide', url: 'https://www.planetware.com/athens/acropolis-gr-ath-acrop.htm' },
      { title: 'Athens Video', url: 'https://youtu.be/3BrPg4fVnOg' },
    ],
    checklist: [
      { text: 'Visit the Acropolis Museum (approximately 10 euros)', done: true },
      { text: 'Go to just 1 expensive drinking night', done: true },
      { text: 'Sit at one cafe on the street', done: true },
    ],
    tags: ['greece', 'history', 'europe'],
    heroImageUrl: 'https://images.pexels.com/photos/161844/athens-parthenon-acropolis-161844.jpeg?auto=compress&cs=tinysrgb&w=1920',
    isPublic: true,
    dateAdded: new Date('2022-08-22'),
  },
  {
    id: 'munich',
    slug: 'munich',
    title: 'Munich',
    destination: 'Munich, Germany',
    status: 'planned',
    dateStart: null,
    dateEnd: null,
    concept: '',
    budget: '',
    notes: 'Bavarian culture, beer gardens, and museums.',
    links: [],
    checklist: [],
    tags: ['germany', 'europe'],
    heroImageUrl: 'https://images.pexels.com/photos/2868248/pexels-photo-2868248.jpeg?auto=compress&cs=tinysrgb&w=1920',
    isPublic: true,
    dateAdded: new Date('2023-01-15'),
  },
  {
    id: 'italy',
    slug: 'italy',
    title: 'Italy',
    destination: 'Italy',
    status: 'dream',
    dateStart: null,
    dateEnd: null,
    concept: '',
    budget: '',
    notes: 'Art, food, and coastlines — Rome, Florence, or the Amalfi coast.',
    links: [],
    checklist: [],
    tags: ['italy', 'europe', 'art'],
    heroImageUrl: 'https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg?auto=compress&cs=tinysrgb&w=1920',
    isPublic: true,
    dateAdded: new Date('2023-03-01'),
  },
  {
    id: 'iran',
    slug: 'iran',
    title: 'Iran',
    destination: 'Iran',
    status: 'dream',
    dateStart: null,
    dateEnd: null,
    concept: '',
    budget: '',
    notes: 'Persian history, poetry, and bazaars.',
    links: [],
    checklist: [],
    tags: ['middle-east', 'history'],
    heroImageUrl: 'https://images.pexels.com/photos/358457/pexels-photo-358457.jpeg?auto=compress&cs=tinysrgb&w=1920',
    isPublic: false,
    dateAdded: new Date('2023-05-01'),
  },
  {
    id: 'baghdad',
    slug: 'baghdad',
    title: 'Baghdad',
    destination: 'Baghdad, Iraq',
    status: 'dream',
    dateStart: null,
    dateEnd: null,
    concept: '',
    budget: '',
    notes: 'The city of peace — Mesopotamian heritage and modern resilience.',
    links: [],
    checklist: [],
    tags: ['middle-east', 'history'],
    heroImageUrl: 'https://images.pexels.com/photos/162031/dubai-tower-arab-emirates-162031.jpeg?auto=compress&cs=tinysrgb&w=1920',
    isPublic: false,
    dateAdded: new Date('2023-05-15'),
  },
  {
    id: 'uni',
    slug: 'uni',
    title: 'Uni',
    destination: 'University trips',
    status: 'planned',
    dateStart: null,
    dateEnd: null,
    concept: '',
    budget: '',
    notes: 'Conference visits, campus tours, and academic travel.',
    links: [],
    checklist: [],
    tags: ['academic'],
    heroImageUrl: 'https://images.pexels.com/photos/207691/books-book-pages-read-literature-207691.jpeg?auto=compress&cs=tinysrgb&w=1920',
    isPublic: false,
    dateAdded: new Date('2023-09-01'),
  },
  {
    id: 'her',
    slug: 'her',
    title: 'HER',
    destination: 'HER',
    status: 'planned',
    dateStart: null,
    dateEnd: null,
    concept: '',
    budget: '',
    notes: '',
    links: [],
    checklist: [],
    tags: [],
    heroImageUrl: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=1920',
    isPublic: false,
    dateAdded: new Date('2024-01-01'),
  },
];

function getAll(publicOnly = false) {
  let items = [...trips];
  if (publicOnly) items = items.filter(t => t.isPublic);
  return items.sort((a, b) => b.dateAdded - a.dateAdded);
}

function getBySlug(slug, publicOnly = false) {
  const trip = trips.find(t => t.slug === slug);
  if (!trip) return null;
  if (publicOnly && !trip.isPublic) return null;
  return trip;
}

function getStatuses() {
  return ['dream', 'planned', 'upcoming', 'completed'];
}

module.exports = { trips, getAll, getBySlug, getStatuses };
