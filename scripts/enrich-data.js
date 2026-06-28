/**
 * Enrich articles-read, research-papers, iconic-bitch with notes + Pexels images
 * Run: node scripts/enrich-data.js
 */
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const KEY = process.env.PEXELS_API_KEY;
if (!KEY) {
  console.error('PEXELS_API_KEY required');
  process.exit(1);
}

function pexelsUrl(photoId) {
  return `https://images.pexels.com/photos/${photoId}/pexels-photo-${photoId}.jpeg?auto=compress&cs=tinysrgb&w=1920`;
}

async function search(query) {
  const res = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
    { headers: { Authorization: KEY } }
  );
  const data = await res.json();
  const id = data.photos?.[0]?.id;
  return id ? pexelsUrl(id) : '';
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

const articleNotes = {
  'getting-things-done': 'Allen\'s GTD system promised clarity through capture and review, but the New Yorker dissection showed how productivity culture became another performance metric at work. Reading this alongside my frustration with optimization articles helped me see why "inbox zero" rarely fixes structural overload. The takeaway: systems help, but they cannot substitute for sane expectations about what one person can carry.',
  'productivity-culture': 'Sullivan\'s cultural-comment piece names the ambient guilt of always needing to be "on" — deep work rhetoric included. It connected directly to Andrew Sullivan\'s distraction essay and my own ADHD hyperfocus cycles: optimization culture treats attention as a moral virtue. I keep returning to it when I catch myself measuring worth in output rather than insight.',
  'career-identity': 'HBR\'s framing of work-as-identity hit during a semester when engineering felt like my whole personality. The article\'s warning about brittle self-concept when jobs change mirrors what I saw in friends who tied worth to titles. Useful counterweight to hustle narratives, especially for students entering tech.',
  'life-change-phases': 'The three-phase model — ending, neutral zone, new beginning — gave language to transitions I had only felt as chaos. It pairs well with the career-identity piece: major change is not just a calendar event but a psychological reordering. I bookmarked this for any future pivot between science communication and pure engineering.',
  'stoicism-rebrand': 'The Atlantic traced how Silicon Valley repackaged Stoicism as a performance hack, stripping Epictetus of context. This matters because I read Modern Stoicism essays too — the gap between ancient practice and startup Twitter wisdom is huge. Key takeaway: philosophy imported without history becomes self-help with better branding.',
  'imposter-mental-illness': 'The Times piece on ADHD imposter syndrome named something I had not articulated: feeling like a fraud about the diagnosis itself because it seemed "too easy." It sits in conversation with my essay on imposter syndromes and hyperlink thinking — validation and skepticism arrive together. One of the most personally precise articles in this list.',
  'nasa-era-end': 'Apollo\'s living memory is disappearing with the astronauts who walked on the Moon — a generational hinge The Atlantic captures well. As someone who wrote about Artemis and space policy for The AUIS Voice, this reframed nostalgia as an archival problem, not just sentiment. The end of an era is also the start of myth-making.',
  'artemisia-gentileschi': 'The New Yorker asks whether feminist recovery of Gentileschi\'s biography overshadows her canvases — a question I carry into Botticelli and art-history writing ideas. Her violence and mastery deserve both, but the article warns against reducing women artists to trauma plots. Connects to my "Case Against the Trauma Plot" read below.',
  'long-live-work': 'Paris Review\'s essay on a Bulgarian grocery in Amsterdam treats work as dignity, not hustle — rare in English-language discourse. It resonated with "Long Live Work" against productivity culture: labor can anchor identity without consuming it. I thought of immigrant family shops and what "essential work" meant before the pandemic made it a slogan.',
  'hard-to-be-rational': 'Rationality is not winning arguments but calibrating how wrong you might be — the New Yorker\'s Kahneman-adjacent tour de force. Pairs with my Kuhn essay instincts: epistemic humility beats cleverness. I quote this mentally when reviewing code or science journalism drafts where certainty sells better than nuance.',
  'how-gay-was-sappho': 'Newly discovered papyrus scraps reopen ancient sexuality without modern labels — classicists arguing over "how gay" miss the point and prove it simultaneously. As someone interested in classics and LGBTQ+ history, this is a masterclass in how evidence and desire interact. The takeaway: we project, but the fragments still push back.',
  'platform-failure': 'Anil Dash reframes "cancel culture" as platform design failure — moderation, incentives, and scale, not morality plays. Essential for my PopSci AI and platform-economy writing ideas. The insight that infrastructure shapes discourse as much as individuals do still feels underapplied in tech policy conversations.',
  'king-croesus': 'Herodotus\' Croesus story — happiness until the end, fate beyond human knowledge — is philosophy in narrative form. Reading it while collecting stoicism and classics articles clarified why ancient historians embedded ethics in anecdote. Solon\'s warning to the wealthy king is a template for humility I prefer to modern hustle parables.',
  'monstrous-women': 'Electric Literature on villainous women in folklore: lawful-good heroines rarely wield the power that "monstrous" figures do. Connects to trauma-plot critique and feminist art-history threads in my writing backlog. The collection sounded like the kind of fiction that treats anger as plot, not pathology.',
  'first-christmas-meal': 'Atlas Obscura on how British and American Christmas tables converged — food history as cultural negotiation. I saved it while researching ritual and diaspora identity: meals carry politics quietly. A reminder that "tradition" is usually recent synthesis, not ancient purity.',
  'stoics-ascetics': 'Stankiewicz asks whether Stoics are ascetics and complicates the Silicon Valley stoicism I read about elsewhere. Denial of pleasure is not the program; discipline is. This nuance matters for my Things Fall Apart / stoic masculinity essay seed — philosophy misread becomes lifestyle branding.',
  'housewives-white-supremacy': 'The Times on women sustaining far-right movements online — gender analysis often absent from extremism reporting. Hard read, but necessary alongside platform-failure thinking: who participates in harm when architecture amplifies it. Informs how I think about "nice" communities and hidden radicalization pipelines.',
  'jane-austen-bonds': 'The Economist linking perpetual bonds to Pride and Prejudice is delightfully nerdy — literature as finance literacy. Money, obligation, and marriage markets in Austen mirror instruments economists still debate. Perfect bridge between my economics curiosity and fiction shelf.',
  'battery-sucking': 'NYMag on folk remedies gone lethal — a battery-sucking case study in medical folklore. Pairs with paleopathology and science-communication interests: people optimize with what they have, even when harmful. Darkly funny headline, serious epistemology underneath.',
  'distraction-sickness': 'Andrew Sullivan\'s 2016 confession of losing himself to the internet predated the attention-economy canon but named the ache clearly. Reading it years later still feels prophetic — and personal alongside ADHD and hyperlink-thinking notes. The sickness is structural, not individual weakness.',
  'single-family-homes': 'Washington Post on pandemic housing obsession — single-family zoning as policy choice, not natural order. Connects to urbanism tags and my interest in who cities serve. COVID made home legible as infrastructure; this essay asks why we privatized that infrastructure so thoroughly.',
  'obesity-paradigm': 'STAT on a "fatally flawed" obesity paradigm stuck despite evidence — Kuhnian science in real time. As someone who writes about paradigm shifts, this is medicine\'s version: careers, journals, and public health trapped in one frame. Demands the same humility as the rationality article.',
  'quit-accommodating': 'A 1922 Farnam Street reprint on stopping people-pleasing — boundaries before the word was trendy. The voice is dated but the mechanism is not: over-accommodation as self-erasure. I filed it near career-identity and mental-health reads as a quiet corrective.',
  'trauma-plot': 'The New Yorker\'s case against backstory-as-identity in fiction — Woolf versus the trauma plot. Artemisia and monstrous-women reads circle the same question: when does pain become the only lens? As a writer, this challenged me to let characters exist beyond their worst day.',
  'love-magic': 'The Conversation on erotic spells and dolls in the ancient Mediterranean — historians hid magic because it seemed irrational. Connects to classics shelf, Sappho, and Croesus: antiquity was weird and embodied. Great source for an essay on suppressed archives of desire.',
  'new-mom-relaxing': 'McSweeney\'s satire on impossible motherhood standards — laughter as critique. Pairs with housewives/extremism read in a different register: gendered expectations delivered with a smile. Short, sharp, and shareable when someone needs permission to ignore the optimization cult.',
};

const articleQueries = {
  'getting-things-done': 'productivity planner desk',
  'productivity-culture': 'busy office stress',
  'career-identity': 'professional identity office',
  'life-change-phases': 'life transition crossroads',
  'stoicism-rebrand': 'ancient philosophy statue',
  'imposter-mental-illness': 'mental health journal',
  'nasa-era-end': 'apollo moon astronaut',
  'artemisia-gentileschi': 'baroque painting art museum',
  'long-live-work': 'grocery store worker',
  'hard-to-be-rational': 'thinking decision chess',
  'how-gay-was-sappho': 'ancient greek manuscript',
  'platform-failure': 'social media smartphone',
  'king-croesus': 'ancient greece ruins',
  'monstrous-women': 'dark fairy tale forest',
  'first-christmas-meal': 'christmas dinner table',
  'stoics-ascetics': 'stoic meditation minimal',
  'housewives-white-supremacy': 'protest crowd politics',
  'jane-austen-bonds': 'classic literature books finance',
  'battery-sucking': 'vintage battery medical',
  'distraction-sickness': 'person scrolling phone',
  'single-family-homes': 'suburban houses neighborhood',
  'obesity-paradigm': 'medical research laboratory',
  'quit-accommodating': 'boundaries saying no',
  'trauma-plot': 'open book fiction writing',
  'love-magic': 'ancient mediterranean archaeology',
  'new-mom-relaxing': 'new mother coffee humor',
};

const paperNotes = {
  'bilingual-code-switching': 'Saved while researching the code-switching writing idea — McNeill\'s syntactic vs. imagistic thinking and the neuroscience of bilingual brains. Relevant to my own trilingual experience and to healthcare language-barrier essays: switching is not confusion but cognitive architecture.',
  'paleopathology-diet': 'Core source for the paleopathology essay cluster — diet reconstruction from bone, isotope analysis, and the irony of "ancient diet" wellness marketing. Connects infections visible in skeletal remains to modern pseudo-archaeology of nutrition.',
  'george-iii-porphyria': 'The Lancet porphyria hypothesis that launched a thousand historical diagnoses — linked from the George III madness writing idea. Useful for tracing how medicine retrofits syndromes onto archival kings, with contested Hanoverian genetics.',
  'george-iii-bipolar': 'Counterpaper arguing bipolar disorder over porphyria — essential paired reading that shows diagnostic fashions in historical psychiatry. The writing-idea notes flag arsenic from medicines and Lucy Worsley\'s skepticism; historians must hold multiple etiologies.',
  'narcolepsy-nord': 'Clinical reference saved for the Harriet Tubman & narcolepsy thread — retrospective diagnosis of historical figures and the politics of disability narratives. NORD overview grounds speculation about Tubman\'s head injury and sleep attacks in neurology.',
  'bone-pathology-forensic': 'ScienceDirect primer supporting paleopathology research — fractures, syphilis, leprosy markers in bone. Feeds the three-part essay structure: infection, diet, and disease visible in remains; also forensics crossover.',
};

const paperQueries = {
  'bilingual-code-switching': 'bilingual brain languages',
  'paleopathology-diet': 'archaeology skeleton bones',
  'george-iii-porphyria': 'british monarchy history portrait',
  'george-iii-bipolar': 'historical medical records',
  'narcolepsy-nord': 'sleep neurology brain',
  'bone-pathology-forensic': 'forensic anthropology bones',
};

const bookNotes = {
  'bad-science': 'Ben Goldacre\'s demolition of dodgy statistics and media misuse of research is foundational for everything I do in science communication. Reading it early inoculated me against headline epidemiology and "brain supplement" logic — the same instincts I later applied writing about AI diagnosis and pandemic misinformation for The AUIS Voice. It teaches skepticism without cynicism: respect evidence, distrust packaging.',
  'hitchhikers-guide': 'Douglas Adams gave me permission to be serious through absurdity — the answer is 42 because the question was never properly formed. As a bridge between engineering and storytelling, Hitchhiker\'s is anti-hubris literature: the universe is vast, bureaucracy is eternal, and panic is never the right response. I reread it when building PopSci AI and need reminding that wonder beats jargon.',
};

const bookQueries = {
  'bad-science': 'science books reading stack',
  'hitchhikers-guide': 'book reading cozy aesthetic',
};

const LINKEDIN_BODY = `This is not a required reading in our Software Design class, but it is a highly highly recommended one, and now that I finished reading it I can see why. This class is one that I was lucky enough to postpone to my last semester after I took all my electives and advanced programming classes. Its a class that provided me with great insights but also just a general observation I want to share in hopes of compelling you to read the book: A Philosophy of Software Design by John Ousterhout

The experience prompted me to think about how different software engineering is from other fields. Students of law, medicine or philosophy are expected to read works that frame how they think about their discipline. In software engineering the tacit assumption is that design judgement comes "on the job"; many developers never read a single book about their craft. In fact, some prominent voices argue that the internet has made books obsolete and that programmers mostly learn by writing code while consulting online resources. This is the cultural backdrop against which Ousterhout's book lands.

We are insistently taught that software design is a problem of managing complexity and that good design demands taking on work so that others don't have to. In perspective though, Ousterhout notes that "most modules have more users than developers" and therefore it is better for the developer to suffer than for the user. This principle underlies his famous mantra that "it is more important for a module to have a simple interface than a simple implementation". He demonstrates this with experiments from his classes, but what I found fun to discern was that the book also implicitly answers a broader question: Why bother reading theory if software changes so quickly? One answer is that design principles do not change as fast as tools. Another answer lies outside software engineering altogether. Recent work arguing that engineers should study philosophy notes that philosophical training "trains the mind in critical thinking, logic, and the formation of clear, structured arguments. These are skills that are invaluable". These authors also observe that critical thinking becomes more important as AI systems democratise knowledge and lower the barriers to obtaining information. In other words, engineers who can reason from first principles will have an advantage over those who only know the "how."`;

function escapeStr(s) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

async function fetchAll(queries) {
  const out = {};
  for (const [id, q] of Object.entries(queries)) {
    out[id] = await search(q);
    console.log(`  ${id}: ${out[id] ? 'ok' : 'miss'}`);
    await sleep(250);
  }
  return out;
}

function patchArticles(src, images) {
  let count = 0;
  for (const [id, notes] of Object.entries(articleNotes)) {
    const hero = images[id];
    if (!hero) continue;
    const re = new RegExp(
      `(id: '${id}',[\\s\\S]*?dateAdded: new Date\\('[^']+'\\),)\\n(  \\},)`,
      'm'
    );
    if (re.test(src) && !src.includes(`id: '${id}'`) === false) {
      const insert = `$1\n    notes: '${escapeStr(notes)}',\n    heroImageUrl: '${hero}',`;
      src = src.replace(re, `${insert}\n$2`);
      count++;
    }
  }
  return { src, count };
}

async function main() {
  console.log('Fetching Pexels for articles (26)...');
  const articleImages = await fetchAll(articleQueries);

  console.log('\nFetching Pexels for research papers (6)...');
  const paperImages = await fetchAll(paperQueries);

  console.log('\nFetching Pexels for iconic-bitch (2)...');
  const bookImages = await fetchAll(bookQueries);

  // Build articles-read.js
  delete require.cache[require.resolve('../data/articles-read.js')];
  const articlesMod = require('../data/articles-read.js');
  const articles = articlesMod.articles.map(a => ({
    ...a,
    notes: articleNotes[a.id] || a.notes,
    heroImageUrl: articleImages[a.id] || a.heroImageUrl || '',
  }));

  const articlesJs = `// Articles Read — imported from Notion
// https://www.notion.so/Articles-Read-6539067f0ff84d5b9c64c742fdc8dc13

const articles = [
${articles.map(a => `  {
    id: '${a.id}',
    title: ${JSON.stringify(a.title)},
    url: ${JSON.stringify(a.url)},
    source: ${JSON.stringify(a.source)},
    excerpt: ${JSON.stringify(a.excerpt)},
    tags: ${JSON.stringify(a.tags)},
    notes: ${JSON.stringify(a.notes)},
    heroImageUrl: ${JSON.stringify(a.heroImageUrl)},
    status: '${a.status}',
    isPublic: ${a.isPublic},
    dateAdded: new Date('${a.dateAdded.toISOString().split('T')[0]}'),
  }`).join(',\n')}
];

function getAll() {
  return [...articles].sort((a, b) => b.dateAdded - a.dateAdded);
}

function getByTag(tag) {
  return getAll().filter(a => a.tags && a.tags.includes(tag));
}

module.exports = { articles, getAll, getByTag };
`;

  // research-papers.js
  delete require.cache[require.resolve('../data/research-papers.js')];
  const papersMod = require('../data/research-papers.js');
  const papers = papersMod.papers.map(p => ({
    ...p,
    notes: paperNotes[p.id] || p.notes,
    heroImageUrl: paperImages[p.id] || p.heroImageUrl || '',
  }));

  const papersJs = `// Research Papers — from Notion
// https://www.notion.so/Research-Papers-2043e559e5c14edd86d0eff678392054

const papers = [
${papers.map(p => `  {
    id: '${p.id}',
    title: ${JSON.stringify(p.title)},
    authors: ${JSON.stringify(p.authors)},
    journal: ${JSON.stringify(p.journal)},
    url: ${JSON.stringify(p.url)},
    excerpt: ${JSON.stringify(p.excerpt)},
    notes: ${JSON.stringify(p.notes)},
    tags: ${JSON.stringify(p.tags)},
    type: '${p.type}',
    year: ${p.year === null ? 'null' : p.year},
    heroImageUrl: ${JSON.stringify(p.heroImageUrl)},
    isPublic: ${p.isPublic},
    dateAdded: new Date('${p.dateAdded.toISOString().split('T')[0]}'),
  }`).join(',\n')}
];

const types = ['paper', 'review', 'reference'];

function getAll(filters = {}) {
  let items = [...papers];
  if (filters.type) items = items.filter(p => p.type === filters.type);
  if (filters.tag) items = items.filter(p => p.tags && p.tags.includes(filters.tag));
  return items.sort((a, b) => b.dateAdded - a.dateAdded);
}

function getAllTags() {
  return [...new Set(papers.flatMap(p => p.tags || []))].sort();
}

module.exports = { papers, getAll, getAllTags, types };
`;

  // iconic-bitch.js
  delete require.cache[require.resolve('../data/iconic-bitch.js')];
  const iconicMod = require('../data/iconic-bitch.js');
  const items = iconicMod.items.map(i => ({
    ...i,
    notes: bookNotes[i.id] || i.notes,
    coverUrl: bookImages[i.id] || i.coverUrl || '',
  }));

  const iconicJs = `// Iconic Bitch — curated reading list from Notion
// https://www.notion.so/Iconic-Bitch-30f2eae24c0449f895e8f8e1730572dc

const items = [
${items.map(i => `  {
    id: '${i.id}',
    title: ${JSON.stringify(i.title)},
    author: ${JSON.stringify(i.author)},
    type: '${i.type}',
    url: ${JSON.stringify(i.url)},
    excerpt: ${JSON.stringify(i.excerpt)},
    notes: ${JSON.stringify(i.notes)},
    tags: ${JSON.stringify(i.tags)},
    coverUrl: ${JSON.stringify(i.coverUrl)},
    status: '${i.status}',
    isPublic: ${i.isPublic},
    dateAdded: new Date('${i.dateAdded.toISOString().split('T')[0]}'),
  }`).join(',\n')}
];

function getAll() {
  return [...items].sort((a, b) => b.dateAdded - a.dateAdded);
}

module.exports = { items, getAll };
`;

  // reflections.js — full LinkedIn body
  const reflectionsJs = `// Static reflections — used when Firestore is unavailable
// Source: LinkedIn post on A Philosophy of Software Design by John Ousterhout

const reflections = [
  {
    id: 'philosophy-of-software-design',
    title: 'Reflections on A Philosophy of Software Design',
    body: \`${LINKEDIN_BODY.replace(/`/g, '\\`')}\`,
    mood: 'thoughtful, convinced, slightly evangelical',
    tags: ['software design', 'Ousterhout', 'philosophy', 'engineering'],
    isPublic: true,
    date: new Date('2026-03-01'),
  },
];

function getAll(publicOnly = true) {
  let items = [...reflections];
  if (publicOnly) items = items.filter(r => r.isPublic);
  return items.sort((a, b) => b.date - a.date);
}

function getById(id) {
  return reflections.find(r => r.id === id) || null;
}

module.exports = { reflections, getAll, getById };
`;

  const dataDir = path.join(__dirname, '../data');
  fs.writeFileSync(path.join(dataDir, 'articles-read.js'), articlesJs);
  fs.writeFileSync(path.join(dataDir, 'research-papers.js'), papersJs);
  fs.writeFileSync(path.join(dataDir, 'iconic-bitch.js'), iconicJs);
  fs.writeFileSync(path.join(dataDir, 'reflections.js'), reflectionsJs);

  const articleNotesCount = articles.filter(a => a.notes).length;
  const articleHeroCount = articles.filter(a => a.heroImageUrl).length;
  const paperNotesCount = papers.filter(p => p.notes).length;
  const paperHeroCount = papers.filter(p => p.heroImageUrl).length;
  const bookNotesCount = items.filter(i => i.notes).length;
  const bookCoverCount = items.filter(i => i.coverUrl).length;

  console.log('\n=== COUNTS ===');
  console.log(`articles-read.js: ${articles.length} articles, ${articleNotesCount} notes, ${articleHeroCount} heroImageUrl`);
  console.log(`research-papers.js: ${papers.length} papers, ${paperNotesCount} notes, ${paperHeroCount} heroImageUrl`);
  console.log(`iconic-bitch.js: ${items.length} items, ${bookNotesCount} notes, ${bookCoverCount} coverUrl`);
  console.log(`reflections.js: 1 reflection, body ${LINKEDIN_BODY.length} chars (full LinkedIn post)`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
