// Research Papers — from Notion
// https://www.notion.so/Research-Papers-2043e559e5c14edd86d0eff678392054

const papers = [
  {
    id: 'bilingual-code-switching',
    title: "How Brains Seamlessly Switch Between Languages",
    authors: "Scientific American",
    journal: "Scientific American",
    url: "https://www.scientificamerican.com/article/how-brains-seamlessly-switch-between-languages/",
    excerpt: "Billions of people worldwide speak two or more languages. One of the most common experiences is \"code switching\"—shifting from one language to another within a single conversation or even a sentence.",
    notes: "Saved while researching the code-switching writing idea — McNeill's syntactic vs. imagistic thinking and the neuroscience of bilingual brains. Relevant to my own trilingual experience and to healthcare language-barrier essays: switching is not confusion but cognitive architecture.",
    tags: ["neuroscience","linguistics","bilingualism"],
    type: 'review',
    year: 2021,
    heroImageUrl: "https://images.pexels.com/photos/9310202/pexels-photo-9310202.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isPublic: true,
    dateAdded: new Date('2024-06-15'),
  },
  {
    id: 'paleopathology-diet',
    title: "Assessment of Diet and Recognition of Nutritional Deficiencies in Paleopathological Studies",
    authors: "Various",
    journal: "PubMed",
    url: "https://pubmed.ncbi.nlm.nih.gov/26823189/",
    excerpt: "A review of how paleopathology studies diet, nutrition, and skeletal pathology in ancient populations.",
    notes: "Core source for the paleopathology essay cluster — diet reconstruction from bone, isotope analysis, and the irony of \"ancient diet\" wellness marketing. Connects infections visible in skeletal remains to modern pseudo-archaeology of nutrition.",
    tags: ["paleopathology","nutrition","archaeology"],
    type: 'paper',
    year: 2016,
    heroImageUrl: "https://images.pexels.com/photos/18416943/pexels-photo-18416943.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isPublic: true,
    dateAdded: new Date('2024-05-01'),
  },
  {
    id: 'george-iii-porphyria',
    title: "King George III and Porphyria: An Elemental Hypothesis and Investigation",
    authors: "Cox, Rocha, et al.",
    journal: "The Lancet",
    url: "https://www.thelancet.com/journals/lancet/article/PIIS0140673605669917/fulltext",
    excerpt: "Investigating the acute hereditary porphyria hypothesis for the episodic madness of King George III.",
    notes: "The Lancet porphyria hypothesis that launched a thousand historical diagnoses — linked from the George III madness writing idea. Useful for tracing how medicine retrofits syndromes onto archival kings, with contested Hanoverian genetics.",
    tags: ["medicine","history","genetics"],
    type: 'paper',
    year: 2005,
    heroImageUrl: "https://images.pexels.com/photos/28245666/pexels-photo-28245666.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isPublic: true,
    dateAdded: new Date('2024-04-20'),
  },
  {
    id: 'george-iii-bipolar',
    title: "King George III, Bipolar Disorder, Porphyria and Lessons for Historians",
    authors: "Peters, Wilkinson",
    journal: "Clinical Medicine (PMC)",
    url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4953321/",
    excerpt: "Re-examining the porphyria diagnosis and considering bipolar disorder as an alternative historical explanation.",
    notes: "Counterpaper arguing bipolar disorder over porphyria — essential paired reading that shows diagnostic fashions in historical psychiatry. The writing-idea notes flag arsenic from medicines and Lucy Worsley's skepticism; historians must hold multiple etiologies.",
    tags: ["medicine","history","psychiatry"],
    type: 'paper',
    year: 2016,
    heroImageUrl: "https://images.pexels.com/photos/5452229/pexels-photo-5452229.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isPublic: true,
    dateAdded: new Date('2024-04-15'),
  },
  {
    id: 'narcolepsy-nord',
    title: "Narcolepsy — National Organization for Rare Disorders",
    authors: "NORD",
    journal: "NORD Rare Disease Database",
    url: "https://rarediseases.org/rare-diseases/narcolepsy/",
    excerpt: "Clinical overview of narcolepsy—relevant to historical figures like Harriet Tubman and the politics of retrospective diagnosis.",
    notes: "Clinical reference saved for the Harriet Tubman & narcolepsy thread — retrospective diagnosis of historical figures and the politics of disability narratives. NORD overview grounds speculation about Tubman's head injury and sleep attacks in neurology.",
    tags: ["medicine","neurology","history"],
    type: 'reference',
    year: null,
    heroImageUrl: "https://images.pexels.com/photos/19034027/pexels-photo-19034027.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isPublic: true,
    dateAdded: new Date('2024-03-10'),
  },
  {
    id: 'bone-pathology-forensic',
    title: "Bone Pathology in Bioarchaeological and Forensic Investigations",
    authors: "ScienceDirect Topics",
    journal: "ScienceDirect",
    url: "https://www.sciencedirect.com/topics/medicine-and-dentistry/bone-pathology",
    excerpt: "Overview of bone pathology as a pillar of bioarchaeological investigation—fractures, syphilis, leprosy, and malnutrition markers.",
    notes: "ScienceDirect primer supporting paleopathology research — fractures, syphilis, leprosy markers in bone. Feeds the three-part essay structure: infection, diet, and disease visible in remains; also forensics crossover.",
    tags: ["paleopathology","forensics","medicine"],
    type: 'reference',
    year: null,
    heroImageUrl: "https://images.pexels.com/photos/8661757/pexels-photo-8661757.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isPublic: true,
    dateAdded: new Date('2024-02-28'),
  }
];

const types = ['paper', 'review', 'reference'];

function getAll(filters = {}) {
  let items = papers.map(p => ({ status: 'have-read', ...p }));
  if (filters.type) items = items.filter(p => p.type === filters.type);
  if (filters.tag) items = items.filter(p => p.tags && p.tags.includes(filters.tag));
  if (filters.status) items = items.filter(p => p.status === filters.status);
  return items.sort((a, b) => b.dateAdded - a.dateAdded);
}

function getAllTags() {
  return [...new Set(papers.flatMap(p => p.tags || []))].sort();
}

module.exports = { papers, getAll, getAllTags, types };
