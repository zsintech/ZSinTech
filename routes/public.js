const express = require('express');
const router = express.Router();
const { db, isConfigured } = require('../firebase-admin');
const { renderMarkdown } = require('../utils/markdown');
const { formatDate, groupByMonth } = require('../utils/dates');
const { formatIdeaNotes } = require('../utils/richText');
const { getPublicWritings, getWritingBySlug } = require('../utils/content');
const staticWritings = require('../data/writings');
const {
  getArticlesRead,
  getWritingIdeas,
  getWritingIdeaById,
  getWritingIdeaCategories,
  getWritingIdeasGrouped,
  getIconicBitchItems,
  getResearchPapers,
  getResearchPaperTags,
  getResearchPaperTypes,
  getSoloDates,
  getTravelTrips,
  getTravelBySlug,
  getTravelStatuses,
  getJournalismArticles,
  getJournalismBySlug,
  getReflections,
  getPopSciReels,
  getPopSciReelBySlug,
  getCourses,
  getCourseStatuses,
  groupCoursesByStatus,
  getBooks,
  getBookShelfTypes,
  groupBooksByReadingStatus,
  splitByReadingStatus,
} = require('../utils/library');

router.get('/', async (req, res) => {
  const writings = await getPublicWritings({ excludeStories: true });
  const essays = writings.filter(w => w.type === 'essay');
  const projects = writings.filter(w => w.type === 'project');
  const featured = essays[0] || writings[0] || null;
  const stories = staticWritings.getStories();
  const journalism = await getJournalismArticles();
  const popsciReels = await getPopSciReels();
  const reflections = await getReflections();
  const latestReflection = reflections[0] || null;

  const courses = await getCourses();
  const articles = await getArticlesRead();
  const books = await getBooks();
  const vocationalBooks = books.filter(b => b.shelfType === 'vocational').slice(0, 3);
  const literaryBooks = books.filter(b => b.shelfType === 'literary').slice(0, 3);

  res.render('public/home', {
    title: 'ZsinTech',
    writings,
    essays,
    projects,
    featured,
    stories,
    journalism,
    popsciReels,
    latestReflection,
    courses: courses.slice(0, 4),
    articles: articles.slice(0, 4),
    vocationalBooks,
    literaryBooks,
    formatDate,
    heroImage: featured?.heroImageUrl || essays[0]?.heroImageUrl,
  });
});

router.get('/writings', async (req, res) => {
  const { type, tag } = req.query;
  const writings = type
    ? await getPublicWritings({ type, tag })
    : await getPublicWritings({ excludeStories: true, tag });
  res.render('public/writings', {
    title: 'Writings',
    writings,
    formatDate,
    currentType: type || '',
    currentTag: tag || '',
  });
});

router.get('/stories', async (req, res) => {
  const stories = staticWritings.getStories();
  res.render('public/stories', {
    title: 'Stories',
    stories,
    formatDate,
  });
});

router.get('/stories/:slug', async (req, res) => {
  const story = await getWritingBySlug(req.params.slug);
  if (!story || story.type !== 'story') return res.status(404).redirect('/stories');

  story.bodyHtml = renderMarkdown(story.body || '');
  const related = staticWritings.getStories().filter(s => s.slug !== story.slug).slice(0, 2);

  res.render('public/story-single', {
    title: story.title,
    story,
    related,
    formatDate,
  });
});

router.get('/writings/:slug', async (req, res) => {
  const writing = await getWritingBySlug(req.params.slug);
  if (!writing) return res.status(404).redirect('/writings');
  if (writing.type === 'story') return res.redirect('/stories/' + writing.slug);

  writing.bodyHtml = renderMarkdown(writing.body || '');
  const allWritings = await getPublicWritings({ excludeStories: true });
  const related = allWritings.filter(w => w.slug !== writing.slug && w.type === writing.type).slice(0, 2);

  res.render('public/writing-single', {
    title: writing.title,
    writing,
    related,
    formatDate,
  });
});

router.get('/shelf', async (req, res) => {
  const iconicBitch = await getIconicBitchItems();
  const courses = await getCourses();
  const books = await getBooks();
  let movies = [];

  if (isConfigured && db) {
    try {
      const moviesSnap = await db.collection('movies').where('isPublic', '==', true).orderBy('dateAdded', 'desc').get();
      movies = moviesSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch { /* optional */ }
  }

  const articles = await getArticlesRead();

  res.render('public/shelf', {
    title: 'Shelf',
    books,
    courses,
    articles,
    movies,
    iconicBitch,
    formatDate,
    groupByMonth,
    adminEditPath: res.locals.isAdmin ? '/admin/content' : null,
  });
});

const BOOK_SHELVES = {
  vocational: {
    label: 'Vocational Books',
    description: 'Medicine, research methods, philosophy of science, and the professional reading that feeds my writing.',
    other: { type: 'literary', label: 'Literary Books' },
  },
  literary: {
    label: 'Literary Books',
    description: 'Fiction, classics, and literary reads — the stories behind the essays.',
    other: { type: 'vocational', label: 'Vocational Books' },
  },
};

router.get('/books/:shelfType', async (req, res) => {
  const { shelfType } = req.params;
  const { view, category } = req.query;
  const meta = BOOK_SHELVES[shelfType];
  if (!meta) return res.status(404).render('public/404', { title: 'Not Found' });

  let allBooks = await getBooks({ shelfType });
  if (category) allBooks = allBooks.filter(b => b.category === category);
  const categories = [...new Set((await getBooks({ shelfType })).map(b => b.category).filter(Boolean))].sort();
  const { toRead, haveRead } = groupBooksByReadingStatus(allBooks);

  res.render('public/books-shelf', {
    title: meta.label,
    shelfType,
    shelfLabel: meta.label,
    shelfDescription: meta.description,
    otherShelf: meta.other,
    toRead,
    haveRead,
    categories,
    currentView: view || '',
    currentCategory: category || '',
    adminEditPath: res.locals.isAdmin ? `/admin/books?shelfType=${shelfType}` : null,
  });
});

router.get('/courses', async (req, res) => {
  const { status } = req.query;
  let courses = await getCourses(status ? { status } : {});
  const grouped = groupCoursesByStatus(courses);
  res.render('public/courses', {
    title: 'Courses',
    courses,
    grouped,
    statuses: getCourseStatuses(),
    currentStatus: status || '',
    adminEditPath: res.locals.isAdmin ? '/admin/courses' : null,
  });
});

router.get('/articles-read', async (req, res) => {
  const { tag, view } = req.query;
  let articles = await getArticlesRead({ tag });
  if (tag) articles = articles.filter(a => a.tags && a.tags.includes(tag));
  const { toRead, haveRead } = splitByReadingStatus(articles);
  const displayArticles = view === 'to-read' ? toRead : view === 'have-read' ? haveRead : articles;
  const allTags = [...new Set(articles.flatMap(a => a.tags || []))].sort();
  res.render('public/articles-read', {
    title: 'Articles',
    articles: displayArticles,
    toRead,
    haveRead,
    allTags,
    currentTag: tag || '',
    currentView: view || '',
    formatDate,
    adminEditPath: res.locals.isAdmin ? '/admin/content/articles_read' : null,
  });
});

router.get('/writing-ideas', async (req, res) => {
  const { category } = req.query;
  const categories = getWritingIdeaCategories();
  const grouped = category
    ? { [category]: await getWritingIdeas({ category }) }
    : await getWritingIdeasGrouped();
  res.render('public/writing-ideas', {
    title: 'Writing Ideas',
    grouped,
    categories,
    currentCategory: category || '',
    formatDate,
    adminEditPath: res.locals.isAdmin ? '/admin/content/writing_ideas' : null,
  });
});

router.get('/writing-ideas/:id', async (req, res) => {
  const idea = await getWritingIdeaById(req.params.id);
  if (!idea) return res.status(404).redirect('/writing-ideas');

  const related = (await getWritingIdeas({ category: idea.category }))
    .filter(i => i.id !== idea.id)
    .slice(0, 3);

  res.render('public/writing-idea-single', {
    title: idea.title,
    idea,
    related,
    formatDate,
    formatIdeaNotes,
  });
});

router.get('/iconic-bitch', async (req, res) => {
  const { view } = req.query;
  const items = await getIconicBitchItems();
  const { toRead, haveRead } = splitByReadingStatus(items);
  const displayItems = view === 'to-read' ? toRead : view === 'have-read' ? haveRead : items;
  res.render('public/iconic-bitch', {
    title: 'Iconic Bitch',
    items: displayItems,
    toRead,
    haveRead,
    currentView: view || '',
    formatDate,
    adminEditPath: res.locals.isAdmin ? '/admin/content/iconic_bitch' : null,
  });
});

router.get('/research-papers', async (req, res) => {
  const { type, tag, view } = req.query;
  let papers = await getResearchPapers({ type, tag });
  if (tag) papers = papers.filter(p => p.tags && p.tags.includes(tag));
  const { toRead, haveRead } = splitByReadingStatus(papers);
  const displayPapers = view === 'to-read' ? toRead : view === 'have-read' ? haveRead : papers;
  res.render('public/research-papers', {
    title: 'Research Papers',
    papers: displayPapers,
    toRead,
    haveRead,
    allTags: getResearchPaperTags(),
    types: getResearchPaperTypes(),
    currentType: type || '',
    currentTag: tag || '',
    currentView: view || '',
    formatDate,
    adminEditPath: res.locals.isAdmin ? '/admin/content/research_papers' : null,
  });
});

router.get('/solo-date', async (req, res) => {
  const dates = await getSoloDates();
  res.render('public/solo-date', {
    title: 'Solo Date',
    dates,
    formatDate,
    adminEditPath: res.locals.isAdmin ? '/admin/content/solo_dates' : null,
  });
});

router.get('/reflections', async (req, res) => {
  const reflections = await getReflections();
  res.render('public/reflections', { title: 'Reflections', reflections, formatDate });
});

router.get('/journalism', async (req, res) => {
  const articles = await getJournalismArticles();
  res.render('public/journalism', {
    title: 'Journalism',
    articles,
    formatDate,
  });
});

router.get('/journalism/:slug', async (req, res) => {
  const article = await getJournalismBySlug(req.params.slug);
  if (!article) return res.status(404).redirect('/journalism');

  const allArticles = await getJournalismArticles();
  const related = allArticles.filter(a => a.slug !== article.slug).slice(0, 3);

  res.render('public/journalism-single', {
    title: article.title,
    article,
    related,
    formatDate,
  });
});

router.get('/popsci', async (req, res) => {
  const reels = await getPopSciReels();
  res.render('public/popsci', {
    title: 'PopSci AI',
    reels,
    formatDate,
  });
});

router.get('/popsci/:slug', async (req, res) => {
  const reel = await getPopSciReelBySlug(req.params.slug);
  if (!reel) return res.status(404).redirect('/popsci');

  res.render('public/popsci-single', {
    title: reel.title,
    reel,
    formatDate,
  });
});

router.get('/travel', async (req, res) => {
  const { status } = req.query;
  let trips = await getTravelTrips(true);
  if (status) trips = trips.filter(t => t.status === status);
  res.render('public/travel', {
    title: 'Travel',
    trips,
    statuses: getTravelStatuses(),
    currentStatus: status || '',
    formatDate,
    adminEditPath: res.locals.isAdmin ? '/admin/trips' : null,
  });
});

router.get('/travel/:slug', async (req, res) => {
  const trip = await getTravelBySlug(req.params.slug, true);
  if (!trip) return res.status(404).redirect('/travel');

  const allTrips = await getTravelTrips(true);
  const related = allTrips.filter(t => t.slug !== trip.slug).slice(0, 3);

  res.render('public/travel-single', {
    title: trip.title,
    trip,
    related,
    formatDate,
    adminEditPath: res.locals.isAdmin ? '/admin/trips' : null,
  });
});

router.get('/about', (req, res) => {
  res.render('public/about', { title: 'About' });
});

module.exports = router;
