// LinkedIn activity feed — synced from https://www.linkedin.com/in/zheen-salih-abdullah-b88854264/recent-activity/all/

const LINKEDIN_PROFILE =
  'https://www.linkedin.com/in/zheen-salih-abdullah-b88854264/recent-activity/all/';

const activities = [
  {
    id: 'stories-of-khasa-launch',
    slug: 'stories-of-khasa-launch',
    kind: 'project',
    title: 'Stories of Khasa — first website post-UG',
    excerpt:
      'Seed-funded extension of my Khasa River fieldwork: a digital archive for stories, photographs, and oral histories connected to Kirkuk and the Khasa River.',
    body: `Remember that National Geographic + The Nature Conservancy internship about the Khasa River I completed six months ago? That project was seed-funded into an extended initiative — and I just built and deployed my first website: Stories of Khasa.

For many people, the Khasa is more than a river. It is part of the city's collective memory — appearing in family stories, daily life, local history, and the identity of generations who grew up around it. Yet many of these stories remain undocumented and risk being lost over time.

The website is an early step toward creating an accessible digital archive where these narratives can be preserved and shared. English is live; Kurdish and Arabic versions are in development.

If you have stories, photographs, documents, recordings, research materials, or know people whose memories should be documented — especially historians, educators, archivists, journalists, photographers, and community members with ties to Kirkuk — I would love to connect.`,
    linkedinUrl: 'https://lnkd.in/dkpUtZT4',
    projectSlug: 'stories-of-khasa',
    projectUrl: 'https://storiesofkhasa.xyz',
    heroImageUrl: 'https://images.pexels.com/photos/38210595/pexels-photo-38210595.jpeg?auto=compress&cs=tinysrgb&w=1920',
    ogImageUrl: 'https://images.pexels.com/photos/38210595/pexels-photo-38210595.jpeg?auto=compress&cs=tinysrgb&w=1920',
    imageSource: 'external',
    tags: ['digital heritage', 'Kirkuk', 'oral history', 'web development'],
    datePublished: new Date('2025-06-15'),
    isPublic: true,
  },
  {
    id: 'philosophy-of-software-design',
    slug: 'philosophy-of-software-design',
    kind: 'post',
    title: 'Reflections on A Philosophy of Software Design',
    excerpt:
      'Why design principles outlast tools — and why engineers who reason from first principles will have an advantage as AI democratises knowledge.',
    body: `This is not required reading in our Software Design class, but it is highly recommended — and now that I finished John Ousterhout's A Philosophy of Software Design I can see why.

Students of law, medicine, or philosophy are expected to read works that frame how they think about their discipline. In software engineering the tacit assumption is that design judgement comes "on the job." Ousterhout lands against that backdrop with a clear mantra: it is more important for a module to have a simple interface than a simple implementation — because most modules have more users than developers.

Why bother reading theory if software changes so quickly? Design principles do not change as fast as tools. And as AI systems democratise knowledge, engineers who can reason from first principles will have an advantage over those who only know the how.`,
    linkedinUrl: LINKEDIN_PROFILE,
    heroImageUrl:
      'https://images.pexels.com/photos/8306407/pexels-photo-8306407.jpeg?auto=compress&cs=tinysrgb&w=1920',
    tags: ['software design', 'engineering', 'books'],
    datePublished: new Date('2025-06-01'),
    isPublic: true,
  },
  {
    id: 'auis-senior-day-2026',
    slug: 'auis-senior-day-2026',
    kind: 'video',
    title: 'AUIS Senior Day 2026 — I can put AUIS as my Alma Mater now',
    excerpt:
      'Graduation milestone at the American University of Iraq, Sulaimani — celebrating the class of 2026.',
    body: `I can put AUIS as my Alma Mater now!

Celebrating Senior Day 2026 with the American University of Iraq, Sulaimani community — a milestone after years of clubs, journalism, capstone work, and the people who made campus feel like home.`,
    linkedinUrl: LINKEDIN_PROFILE,
    heroImageUrl:
      'https://images.pexels.com/photos/29229903/pexels-photo-29229903.jpeg?auto=compress&cs=tinysrgb&w=1920',
    tags: ['AUIS', 'graduation', 'Kurdistan'],
    datePublished: new Date('2025-05-01'),
    isPublic: true,
  },
  {
    id: 'auis-voice-april-2026',
    slug: 'auis-voice-april-2026',
    kind: 'post',
    title: 'The April issue of AUIS Voice is live',
    excerpt:
      'Syrians returning from Germany, Artemis II, gold, environmental doomerism, Google RAM — real topics handled with optimism. My piece: MoonWalkers.',
    body: `The April issue of AUIS Voice is live and our team put together something genuinely good.

Syrians returning from Germany. Artemis II taking flight. Why humanity chose gold. Environmental doomerism. Google's RAM breakthrough. Campus closures and what they actually cost us. Real topics, handled with incredible optimism.

I have a piece in it called MoonWalkers — about scientific ambition, who keeps it alive, and what happens when they're gone. Since submission, Reid — one of the astronauts on Artemis II — asked to name an unnamed crater on the dark side of the moon after his wife who passed away from cancer. Talk about a real MoonWalker!

Go read the whole issue — worth it.`,
    linkedinUrl: 'https://lnkd.in/dfu5tgXi',
    projectSlug: 'auis-voice',
    heroImageUrl: 'https://i.ibb.co/TB2W9X9Q/3e7a8d082406.webp',
    ogImageUrl: 'https://i.ibb.co/TB2W9X9Q/3e7a8d082406.webp',
    imageSource: 'external',
    tags: ['journalism', 'AUIS Voice', 'Artemis'],
    datePublished: new Date('2025-04-01'),
    isPublic: true,
  },
  {
    id: 'auis-voice-first-issue',
    slug: 'auis-voice-first-issue',
    kind: 'post',
    title: 'First issue of the renewed AUIS Voice',
    excerpt:
      'The Diagnosis — on AI, medical accountability, and what happens when the chain of human reasoning gets quietly outsourced.',
    body: `Late post, but this was the first issue of the renewed AUIS Voice and I am really proud of what this team put together.

My piece, The Diagnosis, started with my mother walking out of a radiologist's office having just been told she had stage five cancer. She was there for her wrists. It became an article about AI, medical accountability, and what happens when the chain of human reasoning gets quietly outsourced.

But honestly the whole issue is worth your time — Trump's State of the Union, Munich Security Conference, silent recession, Newroz history, tea-break rituals, HP laptop subscriptions, and why student journalism on campus matters.`,
    linkedinUrl: 'https://lnkd.in/dCc3Wd3W',
    projectSlug: 'auis-voice',
    heroImageUrl: 'https://i.ibb.co/F48w0HvR/f49ace51f7cc.webp',
    ogImageUrl: 'https://i.ibb.co/F48w0HvR/f49ace51f7cc.webp',
    imageSource: 'external',
    tags: ['journalism', 'AI', 'medicine'],
    datePublished: new Date('2025-03-15'),
    isPublic: true,
  },
  {
    id: 'wikipedia-beginner-session',
    slug: 'wikipedia-beginner-session',
    kind: 'post',
    title: 'Online Wikipedia session with Iraqi Wikipedians',
    excerpt:
      'Beginner-friendly session on creating accounts, editing articles, adding references, and taking first steps as a Wikimedian.',
    body: `With so much happening around us, community matters even more. We hosted an online beginner-friendly session with Iraqi Wikipedians for those curious about Wikipedia, free knowledge, and how to start contributing.

We went through the basics of creating an account, editing articles, adding references, and taking first steps as a Wikimedian. A special thank you to Miss Ravan for her hard work helping make the session happen.

We are opening our April contribution competition to new members — if you have been thinking of joining, this is a very good time to start.`,
    linkedinUrl: 'https://lnkd.in/dJkNid4S',
    projectSlug: 'auis-wikimedians',
    heroImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/512px-Wikipedia-logo-v2.svg.png',
    imageSource: 'external',
    tags: ['Wikipedia', 'open knowledge', 'Iraq'],
    datePublished: new Date('2025-03-01'),
    isPublic: true,
  },
  {
    id: 'seed-center-solidarity-session',
    slug: 'seed-center-solidarity-session',
    kind: 'post',
    title: 'Recentering community with SEED Center therapists',
    excerpt:
      'Joint session with Whatsup Club and Creative Writing Club — grief, mental exhaustion, and healthier ways of coping during difficult times.',
    body: `During a joint session between the Whatsup Club and the Creative Writing Club, held with the SEED Center, we tried to do something simple and necessary: recenter ourselves as students who have carried grief and mental exhaustion while standing in solidarity with people we care about.

Two therapists joined us through SEED Center. Students shared stories, wrote small reflections, and sometimes simply sat in silence together — which was also enough.

Solidarity is not only protest or awareness; it is also rest, reflection, and sustaining one's capacity to act responsibly over time.`,
    linkedinUrl: LINKEDIN_PROFILE,
    heroImageUrl:
      'https://images.pexels.com/photos/7468213/pexels-photo-7468213.jpeg?auto=compress&cs=tinysrgb&w=1920',
    tags: ['mental health', 'community', 'AUIS'],
    datePublished: new Date('2025-02-01'),
    isPublic: true,
  },
  {
    id: 'wikipedia-birthday-auib',
    slug: 'wikipedia-birthday-auib',
    kind: 'video',
    title: "Wikipedia's birthday at AUIB with Wikimedia Iraq",
    excerpt:
      'Celebrating open knowledge in practice — from hesitant first edits to careful citations with AUIS Wikimedians.',
    body: `Being invited by Wikimedia Iraq to AUIB for Wikipedia's birthday felt like a quiet milestone. Through the AUIS Wikimedians Club I have seen what open knowledge actually looks like in practice — students asking if anyone reads their edits, then going from hesitant first edits to careful citations and late-night fact checking.

As software engineers, we should care about open source and open knowledge not just as ethos but as life philosophy. Every library we import, every dataset we study, every protocol we rely on was written by someone who believed knowledge should circulate rather than close.`,
    linkedinUrl: LINKEDIN_PROFILE,
    projectSlug: 'auis-wikimedians',
    heroImageUrl:
      'https://images.pexels.com/photos/28463480/pexels-photo-28463480.jpeg?auto=compress&cs=tinysrgb&w=1920',
    tags: ['Wikipedia', 'Wikimedia', 'open knowledge'],
    datePublished: new Date('2025-02-15'),
    isPublic: true,
  },
  {
    id: 'final-club-day',
    slug: 'final-club-day',
    kind: 'post',
    title: 'Final Club Day as co-leader of four clubs',
    excerpt:
      'Grey Area, Creative Writing Club, Cyberproject, and Wikimedians — roses for students who became leaders themselves.',
    body: `On my final Club Day at AUIS — my last as co-leader of four amazing clubs — I wanted to give students the opportunity to win some roses, because I certainly have gotten mine in leading these clubs.

I got to watch students become leaders themselves, some even at one of the four horsemen: Grey Area, Creative Writing Club, Cyberproject, and the Wikimedian's Club.

Getting to create connections and opportunities, to hold space for important conversations through seminars and Global Discourse under Cyberproject, has meant a great deal.`,
    linkedinUrl: LINKEDIN_PROFILE,
    heroImageUrl:
      'https://images.pexels.com/photos/36979662/pexels-photo-36979662.jpeg?auto=compress&cs=tinysrgb&w=1920',
    tags: ['AUIS', 'leadership', 'clubs'],
    datePublished: new Date('2025-01-15'),
    isPublic: true,
  },
  {
    id: 'repost-reckoning-science',
    slug: 'repost-reckoning-science',
    kind: 'repost',
    repostOf: 'Alexander Kaurov & Naomi Oreskes',
    title: 'Who owns climate knowledge?',
    excerpt:
      'Repost: Lineages of Science in a Warming World — on the asymmetry between academic datasets and platform-scale behavioral records.',
    body: `Reposted from Alexander Kaurov — on the contrast between state-of-the-art academic datasets with statistical power in the low thousands, while platform companies record the behavior of billions.

Climate science is beginning to drift toward a similar asymmetry. More in our recent essay on Reckoning Science, by Naomi Oreskes and Alexander Kaurov.`,
    linkedinUrl: 'https://lnkd.in/eN23mzwP',
    projectUrl: 'https://reckoningscience.org',
    heroImageUrl:
      'https://images.pexels.com/photos/76969/cold-front-warm-front-hurricane-felix-76969.jpeg?auto=compress&cs=tinysrgb&w=1920',
    tags: ['climate science', 'policy', 'research'],
    datePublished: new Date('2025-01-01'),
    isPublic: true,
  },
  {
    id: 'sitak-hellofuture',
    slug: 'sitak-hellofuture',
    kind: 'post',
    title: 'Sitak fieldwork with HelloFuture',
    excerpt:
      'Design thinking for climate and AI — biodiversity thinning, water misuse, and small-scale corrections rooted in mature attention.',
    body: `Through HelloFuture's design thinking for climate and AI, we walked Sitak with people who remember it as an ecosystem, not an Instagram backdrop.

The missing birds. The absence of pollinators. Hillsides eroding where roots used to anchor soil. Modernization arrived without an ecological imagination, and Sitak is bearing that cost in real time.

Sitak doesn't need a rescue narrative. It needs coherence — a way for biodiversity, water, land, and community to stop working against each other.`,
    linkedinUrl: LINKEDIN_PROFILE,
    heroImageUrl:
      'https://images.pexels.com/photos/30133449/pexels-photo-30133449.jpeg?auto=compress&cs=tinysrgb&w=1920',
    tags: ['climate', 'biodiversity', 'Kurdistan'],
    datePublished: new Date('2024-12-15'),
    isPublic: true,
  },
  {
    id: 'natgeo-khasa-externship',
    slug: 'natgeo-khasa-externship',
    kind: 'project',
    title: 'National Geographic & Nature Conservancy externship complete',
    excerpt:
      'Three months of fieldwork on the Khasa River basin — environmental challenges as communication, planning, and human problems.',
    body: `I completed the National Geographic Society & The Nature Conservancy Externship — three months of fieldwork, research, and on-ground investigation into the environmental realities shaping our region.

My project focused on the Khasa River basin in Kirkuk. What began as a simple question about a disappearing river turned into a much deeper exploration of miscommunication between scientists, engineers, policymakers, and the communities who depend on the water.

Environmental challenges aren't just ecological problems; they are communication problems, planning problems, and human problems.`,
    linkedinUrl: LINKEDIN_PROFILE,
    projectSlug: 'khasa-river-research',
    projectUrl: 'https://arcg.is/1Car1n1',
    heroImageUrl:
      'https://images.pexels.com/photos/38210172/pexels-photo-38210172.jpeg?auto=compress&cs=tinysrgb&w=1920',
    ogImageUrl: 'https://images.pexels.com/photos/38210172/pexels-photo-38210172.jpeg?auto=compress&cs=tinysrgb&w=1920',
    imageSource: 'external',
    tags: ['environment', 'GIS', 'Kirkuk', 'National Geographic'],
    datePublished: new Date('2024-11-01'),
    isPublic: true,
  },
  {
    id: 'university-day-2025',
    slug: 'university-day-2025',
    kind: 'post',
    title: 'University Day 2025 — four clubs, one coherent experiment',
    excerpt:
      'GreyArea, Creative Writing, AUIS Wikimedians, and CyberProject demonstrating interdisciplinary student-led inquiry.',
    body: `Four student clubs — GreyArea, Creative Writing Club, AUIS Wikimedians, and CyberProject — came together not merely to present projects, but to demonstrate the kind of interdisciplinary experimentation that university environments should cultivate.

What stands out is not the novelty of each project, but the coherence among them — how artistic, technical, and civic perspectives now intersect naturally within our student community.`,
    linkedinUrl: LINKEDIN_PROFILE,
    projectSlug: 'cyberproject',
    heroImageUrl:
      'https://images.pexels.com/photos/8471994/pexels-photo-8471994.jpeg?auto=compress&cs=tinysrgb&w=1920',
    tags: ['AUIS', 'clubs', 'innovation'],
    datePublished: new Date('2024-10-15'),
    isPublic: true,
  },
  {
    id: 'wikimedia-kickoff-auis',
    slug: 'wikimedia-kickoff-auis',
    kind: 'post',
    title: 'Wikimedia Foundation & Wikimedia Iraq visit AUIS',
    excerpt:
      'Kickoff of the AUIS Wikimedians Club — connecting students with the global movement for free and open knowledge.',
    body: `Honored to have played a small part in bringing the Wikimedia Foundation and Wikimedia Iraq to the AUIS campus for the very first time.

The kickoff of the AUIS Wikimedians Club marks an exciting step toward connecting our students with the global movement for free and open knowledge — learning to contribute to Wikipedia, Wikidata, and Wikimedia Commons, and to represent Kurdish and Iraqi perspectives in the world's shared knowledge spaces.`,
    linkedinUrl: LINKEDIN_PROFILE,
    projectSlug: 'auis-wikimedians',
    heroImageUrl:
      'https://images.pexels.com/photos/17781874/pexels-photo-17781874.jpeg?auto=compress&cs=tinysrgb&w=1920',
    tags: ['Wikipedia', 'AUIS', 'open knowledge'],
    datePublished: new Date('2024-09-01'),
    isPublic: true,
  },
  {
    id: 'cyberproject-hamno-askary',
    slug: 'cyberproject-hamno-askary',
    kind: 'post',
    title: 'CyberProject hosts Hamno Askary on Creative Tech Entrepreneurship',
    excerpt:
      "Youth as architects shaping Kurdistan's tech path — from early startups to building H9 Cloud.",
    body: `CyberProject Club had the honor of hosting Hamno Askary for Creative Tech Entrepreneurship. He reminded us that youth are not only part of Kurdistan's tech story — they are the architects shaping its path.

From the grit of early startups to building H9 Cloud as a space for collaboration and innovation, he showed how ideas become impact when paired with persistence, discernment, and vision.`,
    linkedinUrl: LINKEDIN_PROFILE,
    projectSlug: 'cyberproject',
    heroImageUrl:
      'https://images.pexels.com/photos/6913330/pexels-photo-6913330.jpeg?auto=compress&cs=tinysrgb&w=1920',
    tags: ['entrepreneurship', 'CyberProject', 'Kurdistan'],
    datePublished: new Date('2024-08-01'),
    isPublic: true,
  },
  {
    id: 'point-6-conference',
    slug: 'point-6-conference',
    kind: 'post',
    title: 'Point 6 Conference, Erbil — democracy as a project under repair',
    excerpt:
      "Two days tracing Iraq's democratic fractures — institutions promised but never built, freedoms written but never delivered.",
    body: `Day One read like a mirror held up to Iraq's political and social fractures. Day Two traced the fault lines of trust — elections, civil society, media, and international oversight.

Democracy is not a completed structure but a project forever under repair — one that demands courage, civil energy, and vigilance. Iraq has the vocabulary of democracy, but does it still have its grammar?`,
    linkedinUrl: LINKEDIN_PROFILE,
    heroImageUrl:
      'https://images.pexels.com/photos/6950136/pexels-photo-6950136.jpeg?auto=compress&cs=tinysrgb&w=1920',
    tags: ['governance', 'Iraq', 'policy'],
    datePublished: new Date('2024-07-01'),
    isPublic: true,
  },
  {
    id: 'harvard-aspire-storytelling',
    slug: 'harvard-aspire-storytelling',
    kind: 'post',
    title: 'Harvard Aspire — 5,000 years of storytelling',
    excerpt:
      'From Mesopotamian clay tablets to LLMs — every technological shift in writing reshapes culture itself.',
    body: `The Master Class with Professor Martin Fuchner took us across 5,000 years of storytelling — from the first clay tablets of Mesopotamia to sacred texts, the printing press, and today's large language models.

What stood out: our oldest stories still shape the present — from flood myths in climate narratives to Gilgamesh's deforestation campaign in light of modern resource extraction.

Every technological shift in writing reshapes culture itself — and if climate action requires cultural change, it begins with the stories we choose to tell and retell.`,
    linkedinUrl: LINKEDIN_PROFILE,
    heroImageUrl:
      'https://images.pexels.com/photos/37187864/pexels-photo-37187864.png?auto=compress&cs=tinysrgb&w=1920',
    tags: ['Harvard Aspire', 'storytelling', 'climate'],
    datePublished: new Date('2024-06-01'),
    isPublic: true,
  },
  {
    id: 'ases-earthquake-system',
    slug: 'ases-earthquake-system',
    kind: 'project',
    title: 'Early Earthquake Warning System — ASES 2025',
    excerpt:
      'Prototype combining MPU6050 sensors, Arduino + ESP32, and cloud push alerts to detect P-waves seconds before shaking.',
    body: `Over the ASES Summer Program 2025, our team developed an Early Earthquake Warning System — a prototype designed to detect seismic activity seconds before it's felt.

Our system combines MPU6050 motion sensors, Arduino + ESP32 integration, LCD alerts, buzzer sirens, LED indicators, and cloud-connected mobile push notifications.

Engineering isn't just about code and wires — it's about building solutions that can protect lives.`,
    linkedinUrl: LINKEDIN_PROFILE,
    projectSlug: 'ases-earthquake-system',
    heroImageUrl:
      'https://images.pexels.com/photos/15861615/pexels-photo-15861615.jpeg?auto=compress&cs=tinysrgb&w=1920',
    tags: ['engineering', 'ASES', 'hardware'],
    datePublished: new Date('2024-05-01'),
    isPublic: true,
  },
  {
    id: 'readbyte-capstone',
    slug: 'readbyte-capstone',
    kind: 'project',
    title: 'ReadByte at AUIS Capstone & STEM showcase',
    excerpt:
      'Science communication platform weaving API integrations and creative problem-solving to make complex content easier to understand.',
    body: `Demonstrated ReadByte alongside Capstone and STEM projects — a full year before my actual turn.

The project grew out of my interest in science communication, shaped by my time with BMSIS and working with Dr. Alexander Kaurov. With my project partner Shad Swara Saeed — whose role in designing and engineering the core of ReadByte was essential — we built a platform that weaves together API integrations and creative problem-solving.`,
    linkedinUrl: LINKEDIN_PROFILE,
    projectSlug: 'readbyte',
    heroImageUrl:
      'https://images.pexels.com/photos/32780193/pexels-photo-32780193.jpeg?auto=compress&cs=tinysrgb&w=1920',
    tags: ['capstone', 'science communication', 'API'],
    datePublished: new Date('2024-03-01'),
    isPublic: true,
  },
  {
    id: 'pioneers-of-change',
    slug: 'pioneers-of-change',
    kind: 'post',
    title: 'Pioneers of Change — 198 hours of civic training',
    excerpt:
      'Workshops across Iraq on electoral narratives, media accountability, governance, and youth civic engagement.',
    body: `A year ago I joined the Pioneers of Change program — 198 hours later, I'm walking away with more than a certificate.

Workshops across the country — from shaping electoral narratives to media accountability, governance structures, and youth civic engagement. Each session brought together voices from Kirkuk, Mosul, and across the Kurdistan Region.

This experience has sharpened how I think about local systems, how I lead with accountability, and how I carry stories forward — with integrity and intention.`,
    linkedinUrl: LINKEDIN_PROFILE,
    heroImageUrl:
      'https://images.pexels.com/photos/17501007/pexels-photo-17501007.jpeg?auto=compress&cs=tinysrgb&w=1920',
    tags: ['civic engagement', 'policy', 'youth leadership'],
    datePublished: new Date('2024-01-01'),
    isPublic: true,
  },
  {
    id: 'repost-kurdish-opera-amsterdam',
    slug: 'repost-kurdish-opera-amsterdam',
    kind: 'repost',
    repostOf: 'Alan Ali Saeed / Kurdistan24',
    title: 'Kurdish poetry adapted into opera at Holland Festival',
    excerpt:
      'Repost: For the first time, a Kurdish poetic text performed in Kurdish on an international stage in Amsterdam.',
    body: `Reposted from Alan Ali Saeed — another milestone for Kurdish literature and a strong example of how the profile of Kurdish culture can be raised internationally.

Kurdish poet Tarza Jaff told Kurdistan24: "My participation is more than just a personal achievement; it is a victory for the Kurdish language and Kurdish poetry."`,
    linkedinUrl: 'https://lnkd.in/dx2-QPdA',
    heroImageUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1920',
    imageSource: 'external',
    tags: ['Kurdish culture', 'literature', 'Amsterdam'],
    datePublished: new Date('2025-06-10'),
    isPublic: true,
  },
];

function getAll(filters = {}) {
  let list = [...activities];
  if (filters.kind) list = list.filter(a => a.kind === filters.kind);
  if (filters.publicOnly) list = list.filter(a => a.isPublic !== false);
  return list.sort((a, b) => b.datePublished - a.datePublished);
}

function getBySlug(slug) {
  return activities.find(a => a.slug === slug) || null;
}

function getKinds() {
  return ['post', 'repost', 'video', 'project'];
}

module.exports = { activities, getAll, getBySlug, getKinds, LINKEDIN_PROFILE };
