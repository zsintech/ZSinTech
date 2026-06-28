const contentStore = require('./contentStore');

const staticArticles = require('../data/articles-read');

const staticIdeas = require('../data/writing-ideas');

const { enrichWritingIdea, enrichWritingIdeas } = require('./enrichWritingIdea');

const staticIconicBitch = require('../data/iconic-bitch');

const staticResearchPapers = require('../data/research-papers');

const staticSoloDates = require('../data/solo-dates');

const staticTravel = require('../data/travel');

const staticJournalism = require('../data/auis-voice');

const staticReflections = require('../data/reflections');

const staticPopSciReels = require('../data/popsci-reels');

const staticCourses = require('../data/courses');

const staticBooks = require('../data/books');

const { splitByReadingStatus } = require('./readingStatus');
const notebookStore = require('./notebooks');

async function getArticlesRead(filters = {}) {

  const items = await contentStore.list('articles_read', { ...filters, publicOnly: true });

  if (items.length) return items;

  return staticArticles.getAll(filters.tag ? { tag: filters.tag } : {});

}



async function getWritingIdeas(filters = {}) {

  const items = await contentStore.list('writing_ideas', { ...filters, publicOnly: true });

  const source = items.length ? items : staticIdeas.getAll(filters);

  return enrichWritingIdeas(source);

}



async function getWritingIdeaById(id) {

  const item = await contentStore.getById('writing_ideas', id) || staticIdeas.getById(id);

  return enrichWritingIdea(item);

}



function getWritingIdeaCategories() {

  return staticIdeas.getCategories();

}



async function getWritingIdeasGrouped() {
  const items = await getWritingIdeas();
  const groups = {};
  items.forEach(idea => {
    if (!groups[idea.category]) groups[idea.category] = [];
    groups[idea.category].push(idea);
  });
  return groups;
}



async function getIconicBitchItems() {

  const items = await contentStore.list('iconic_bitch', { publicOnly: true });

  return items.length ? items : staticIconicBitch.getAll();

}



async function getResearchPapers(filters = {}) {

  const items = await contentStore.list('research_papers', { ...filters, publicOnly: true });

  return items.length ? items : staticResearchPapers.getAll(filters);

}



function getResearchPaperTags() {

  return staticResearchPapers.getAllTags();

}



function getResearchPaperTypes() {

  return staticResearchPapers.types;

}



async function getSoloDates() {

  const items = await contentStore.list('solo_dates', { publicOnly: true });

  return items.length ? items : staticSoloDates.getAll();

}



function getSoloDateActivities() {

  return staticSoloDates.activities;

}



async function getTravelTrips(publicOnly = true) {

  const items = await contentStore.list('travel', { publicOnly });

  if (items.length) return items;

  return staticTravel.getAll(publicOnly);

}



async function getTravelBySlug(slug, publicOnly = true) {

  const item = await contentStore.getById('travel', slug);

  if (item && (!publicOnly || item.isPublic)) return item;

  return staticTravel.getBySlug(slug, publicOnly);

}



function getTravelStatuses() {

  return staticTravel.getStatuses();

}



async function getJournalismArticles() {

  const items = await contentStore.list('journalism', { publicOnly: true });

  return items.length ? items : staticJournalism.getAll();

}



async function getJournalismBySlug(slug) {

  const item = await contentStore.getById('journalism', slug);

  if (item) return item;

  return staticJournalism.getBySlug(slug);

}



async function getReflections() {

  const items = await contentStore.list('reflections', { publicOnly: true, orderBy: 'date' });

  if (items.length) return items;

  return staticReflections.getAll();

}



async function getPopSciReels() {

  const items = await contentStore.list('popsci_reels', { publicOnly: true });

  return items.length ? items : staticPopSciReels.getAll();

}



async function getPopSciReelBySlug(slug) {

  const item = await contentStore.getById('popsci_reels', slug);

  if (item) return item;

  return staticPopSciReels.getBySlug(slug);

}



async function getBooks(filters = {}) {
  const items = await contentStore.list('books', { ...filters, publicOnly: true });
  if (items.length) return items;
  return staticBooks.getAll({ ...filters, publicOnly: true });
}

function getBookShelfTypes() {
  return staticBooks.getShelfTypes();
}

function groupBooksByReadingStatus(books) {
  return splitByReadingStatus(books);
}

async function getCourses(filters = {}) {
  return contentStore.list('courses', { ...filters, publicOnly: true });
}



function getCourseStatuses() {

  return staticCourses.getStatuses();

}



function groupCoursesByStatus(courses) {

  const groups = { 'want-to-take': [], 'in-progress': [], completed: [] };

  courses.forEach(c => {

    if (groups[c.status]) groups[c.status].push(c);

  });

  return groups;

}



module.exports = {

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

  getSoloDateActivities,

  getTravelTrips,

  getTravelBySlug,

  getTravelStatuses,

  getJournalismArticles,

  getJournalismBySlug,

  getReflections,

  getPopSciReels,

  getPopSciReelBySlug,

  getBooks,

  getBookShelfTypes,

  groupBooksByReadingStatus,

  getCourses,

  getCourseStatuses,

  groupCoursesByStatus,

  splitByReadingStatus,

  getNotebooks: (filters = {}) => notebookStore.listNotebooks({ ...filters, publicOnly: true }),
  getNotebook: (id) => notebookStore.getNotebook(id),
  getNotebookNotes: (notebookId, publicOnly = true) => notebookStore.listNotes(notebookId, { publicOnly }),
  getNote: (id) => notebookStore.getNote(id),

};

