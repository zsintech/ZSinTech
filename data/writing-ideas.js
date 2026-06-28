// Writing Ideas — research backlog from Notion
// https://www.notion.so/Writing-Ideas-6341a151c02846a2b72fb72c074ed369

const seedStubs = require('./writing-ideas-seeds');

const ideas = [
  {
    id: "enough-activism-for-the-day",
    title: "Enough Activism for the Day",
    category: "Essay Seeds",
    status: "unresolved",
    excerpt: "I had already felt this more than my friends being for Kirkuk.",
    notes: "",
    links: [],
    sources: [],
    tags: ["activism", "Kirkuk", "Kurdistan", "personal"],
    heroImageUrl: "https://images.pexels.com/photos/698106/pexels-photo-698106.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isPublic: true,
    dateAdded: new Date('2024-07-15')
  },
  {
    id: "sexualized-at-young-age",
    title: "Sexualized & Fat-Shamed at a Young Age",
    category: "Essay Seeds",
    status: "unresolved",
    excerpt: "She can't cross her legs, she laughs like a woman — and she's studying law now. Do bullies ever remember?",
    notes: "",
    links: [],
    sources: [{ label: "Simone de Beauvoir — The Ethics of Ambiguity (2000).pdf", url: "" }],
    tags: ["gender", "body", "law", "Beauvoir", "bullying"],
    heroImageUrl: "https://images.pexels.com/photos/3760857/pexels-photo-3760857.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isPublic: true,
    dateAdded: new Date('2024-07-14')
  },
  {
    id: "learning-languages-pop-culture",
    title: "Learning Languages — Pop Culture & Folklore",
    category: "Language & Cognition",
    status: "idea",
    excerpt: "The final step in language learning: integrating pop culture and folklore.",
    notes: "",
    links: [],
    sources: [],
    tags: ["language", "culture", "folklore"],
    heroImageUrl: "https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isPublic: true,
    dateAdded: new Date('2024-07-13')
  },
  {
    id: "stoicism-loves-executioner",
    title: "Stoicism & Love's Executioner",
    category: "Essay Seeds",
    status: "unresolved",
    excerpt: "Marvin in Yalom's Love's Executioner — when stoic acceptance is a denial of grief.",
    notes: "",
    links: [],
    sources: [],
    tags: ["stoicism", "psychotherapy", "Yalom", "death"],
    heroImageUrl: "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isPublic: true,
    dateAdded: new Date('2024-07-12')
  },
  {
    id: "killing-creative-endeavors",
    title: "The Killing of Creative Endeavors",
    category: "Essay Seeds",
    status: "researching",
    excerpt: "Specialists who believe they grasp the whole — confirmation bias, intellectual property, and platforms that kill capability.",
    notes: "",
    links: [],
    sources: [],
    tags: ["creativity", "specialization", "intellectual property", "platforms"],
    heroImageUrl: "https://images.pexels.com/photos/256514/pexels-photo-256514.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isPublic: true,
    dateAdded: new Date('2024-07-11')
  },
  {
    id: "cultural-literacy-newman",
    title: "Cultural Literacy — John Henry Newman",
    category: "Essay Seeds",
    status: "researching",
    excerpt: "Enlargement of mind through broad education — versus the narrowing cost of specialization.",
    notes: "",
    links: [],
    sources: [],
    tags: ["education", "Newman", "liberal arts", "specialization"],
    heroImageUrl: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isPublic: true,
    dateAdded: new Date('2024-07-10')
  },
  {
    id: "cultural-literacy-western-resources",
    title: "Cultural Literacy & Western Resources",
    category: "Essay Seeds",
    status: "researching",
    excerpt: "Greek polychromy, Homer, the Iliad and Odyssey — questioning the 'best life' as a Greek one.",
    notes: "",
    links: [
      { title: "Botticelli's Venuses and Our Enduring Need for Beauty", url: "https://hyperallergic.com/376242/botticellis-venuses-and-our-enduring-need-for-beauty/" }
    ],
    sources: [],
    tags: ["classics", "Greece", "polychromy", "Homer", "education"],
    heroImageUrl: "https://images.pexels.com/photos/2363/pexels-photo-2363.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isPublic: true,
    dateAdded: new Date('2024-07-09')
  },
  {
    id: "understanding-compelling-narratives",
    title: "Understanding Compelling Narratives",
    category: "Essay Seeds",
    status: "researching",
    excerpt: "Context, prefaces, bibliographies — Kafka's Hunger Artist and why empathy cannot be taken for granted.",
    notes: "",
    links: [],
    sources: [],
    tags: ["literature", "narrative", "Kafka", "empathy", "context"],
    heroImageUrl: "https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isPublic: true,
    dateAdded: new Date('2024-07-08')
  },
  {
    id: "scientific-method",
    title: "The Scientific Method",
    category: "Essay Seeds",
    status: "researching",
    excerpt: "Shattering the Aristotelian synthesis — students are shown theory as finished product, not messy struggle.",
    notes: "",
    links: [],
    sources: [],
    tags: ["science", "education", "history of science", "method"],
    heroImageUrl: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isPublic: true,
    dateAdded: new Date('2024-07-07')
  },
  {
    id: "question-of-vengeance",
    title: "A Question of Vengeance",
    category: "Essay Seeds",
    status: "unresolved",
    excerpt: "Simone de Beauvoir's 'An Eye for an Eye' — can vengeance ever be morally justified, and does the state have the right to punish on our behalf?",
    notes: "Simone de Beauvoir — An Eye for an Eye (1946)\n\nA disturbing moral question about capital punishment and personal retribution. Does the state's right to execute mirror our desire for vengeance — or legitimize it?",
    links: [
      {
        title: "A Question of Vengeance",
        url: "https://aeon.co/essays/simone-de-beauvoir-on-vengeance-and-capital-punishment"
      }
    ],
    sources: [],
    tags: ["philosophy", "ethics", "Beauvoir", "vengeance"],
    heroImageUrl: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isPublic: true,
    dateAdded: new Date('2024-07-01')
  },
  {
    id: "neuroscience-existential-crisis",
    title: "Neuroscience's Existential Crisis",
    category: "Essay Seeds",
    status: "unresolved",
    excerpt: "The harder neuroscience tries to explain the mind, the more the field confronts questions it may not be able to answer.",
    notes: "Neuroscience's Existential Crisis — Nautilus\n\nOn a chilly evening last fall, I stared into nothingness out of the floor-to-ceiling windows in my office on the outskirts of Harvard Square.\n\nUnresolved questions about consciousness, reductionism, and what neuroscience can actually explain.",
    links: [
      {
        title: "Neuroscience's Existential Crisis",
        url: "https://nautil.us/neurosciences-existential-crisis-237998/"
      }
    ],
    sources: [],
    tags: ["neuroscience", "philosophy", "consciousness"],
    heroImageUrl: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isPublic: true,
    dateAdded: new Date('2024-06-28')
  },
  {
    id: "catcher-in-the-rye-film",
    title: "Why Catcher in the Rye Has Never Been Filmed",
    category: "Essay Seeds",
    status: "idea",
    excerpt: "Nearly 70 years on, Salinger's novel remains unadapted — Holden's interior voice resists the screen.",
    notes: "Why The Catcher in the Rye Has Never Been Adapted on Film\n\nOne of American literature's most popular novels has never been adapted for the screen. Salinger fiercely protected the rights. But there's something deeper — the novel's power is in Holden's unreliable, intimate narration.",
    links: [],
    sources: [],
    tags: ["literature", "film", "adaptation", "Salinger"],
    heroImageUrl: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isPublic: true,
    dateAdded: new Date('2024-06-25')
  },
  {
    id: "lord-of-the-flies-war",
    title: "Lord of the Flies & the War Off the Page",
    category: "Essay Seeds",
    status: "idea",
    excerpt: "Golding's boys on the island are an allegory for the adult war happening off the page — civilization stripped bare.",
    notes: "War — William Golding\n\nIn many ways, war is the central theme of Lord of the Flies; the experience of the boys on the island is an allegory for the adult war taking place 'off the page'. Golding was a naval officer during WWII.",
    links: [
      {
        title: "War in Lord of the Flies",
        url: "https://www.bbc.co.uk/bitesize/guides/z2bkw6f/revision/4"
      }
    ],
    sources: [],
    tags: ["literature", "war", "allegory", "Golding"],
    heroImageUrl: "https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isPublic: true,
    dateAdded: new Date('2024-06-22')
  },
  {
    id: "history-of-dualism",
    title: "Descartes, Dualism & AI",
    category: "Essay Seeds",
    status: "researching",
    excerpt: "From Descartes to the hard problem — mind and body as distinct substances, and why the question won't go away.",
    notes: "History of Dualism\n\nDescartes was a substance dualist — the essential property of mind is that it thinks.\n\n### History of Dualism\n\nPlato, Descartes, and the persistent gap between physical explanation and subjective experience.",
    links: [
      {
        title: "Dualism — Stanford Encyclopedia of Philosophy",
        url: "https://plato.stanford.edu/entries/dualism/"
      }
    ],
    sources: [],
    tags: ["philosophy", "consciousness", "Descartes", "mind-body"],
    heroImageUrl: "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isPublic: true,
    dateAdded: new Date('2024-06-20')
  },
  {
    id: "opera-snob-gatekeeping",
    title: "Opera Snob & Cultural Gatekeeping",
    category: "Media & Culture",
    status: "idea",
    excerpt: "Opera was once music for the masses — who decides who belongs in the audience now?",
    notes: "Opera: Music for the Masses — Kurt List, Commentary Magazine\n\nWhen the curtain goes up at the Metropolitan Opera, the audience presents a picture of aristocratic splendor and ostentation.\n\nAn Opera Snob — gatekeeping is when someone decides who does or does not have access to a community or identity.",
    links: [
      {
        title: "Opera: Music for the Masses",
        url: "https://www.commentary.org/articles/kurt-list/opera-music-for-the-masses/"
      }
    ],
    sources: [],
    tags: ["opera", "class", "gatekeeping", "culture"],
    heroImageUrl: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isPublic: true,
    dateAdded: new Date('2024-06-18')
  },
  {
    id: "catherine-smallpox",
    title: "Catherine the Great and the Smallpox Inoculation Campaign",
    category: "History & Medicine",
    status: "researching",
    excerpt: "How Catherine II publicly received inoculation in 1768, followed by 140 nobles and eventually millions of Russians—framed against plague riots in Moscow and the murder of Archbishop Ambrosius.",
    notes: "\"Dimsdale was charmed by Catherine, finding her, \"of all that I ever saw of her sex, the most engaging.\" He was amazed by \"her extreme penetration and the propriety of the questions she asked relative to the practice and success of inoculation.\" The empress, in turn, liked his common sense, but in her opinion, he was overly cautious. She smiled at his stumbling French and tried to understand his English. She told him that she had feared smallpox all her life, but now she wished to be inoculated as the best way of overcoming the fears of others about the disease and about inoculation. She wanted to be inoculated as soon as possible. Dimsdale asked to first consult her court physicians, but Catherine said that this was unnecessary. Dimsdale then suggested that, as a trial measure, he should first innoculate other women of her age; again, Catherine said no. Bowed by the responsibility, Dimsdale begged her to wait a few weeks while he experimented on several local youngsters. She reluctantly agreed, on condition that he keep his preparations secret. The official court register ignored Dimsdale's presence entirely, although the British ambassador reported on August 29 that the empress's intention \"is a secret everybody knows. And which does not seem to occasion much speculation.\" Finally, the empress and the doctor agreed on a date for inoculation: October 12.\"\n\n\"Catherine stopped eating meat and drinking wine ten days before this date and began taking calomel, powder of crab's claws, and a tartar emetic. At nine in the evening on October 12, Dimsdale inoculated Catherine in both arms with smallpox matter taken from a peasant boy named Alexander Markov, whom she subsequently ennobled. The next morning, Catherine drove to Tsarskoe Selo for rest and isolation. She felt healthy \"except for some slight uneasiness\" and exercised outdoors for two or three hours a day. She developed a moderate number of pustules that dried up in a week. Dimsdale pronounced the inoculation a success, and three weeks later Catherine resumed her regular schedule.\"\n\n\"Catherine's example was followed by 140 of the St. Petersburg nobility, including Gregory Orlov, Kyril Razumovsky, and an archbishop. Dimsdale then went to Moscow and inoculated another fifty people. A Russian translation of his treatise explaining his technique was published in St. Petersburg, and inoculation clinics were established in St. Petersburg, Moscow, Kazan, Irkutsk, and other cities. By 1780, twenty thousand Russians had been inoculated; by 1800, two million. As a reward for his service, Catherine made Dimsdale a baron of the Russian empire and awarded him ten thousand pounds plus a life annuity of five hundred pounds. In 1781, Dimsdale returned to Russia to inoculate Catherine's first grandson, Alexander.\"\n\n\"Catherine was inoculated, smallpox killed the king of France. Louis XV took to bed a barely pubescent girl who was carrying smallpox. He died soon after, ending a reign of fifty-nine years. His successor, nineteen-year-old Louis XVI, was inoculated immediately.\"\n\nCatherine's personal confrontation with smallpox occurred three years before Russia was plunged into a desperate struggle with an even more terrible disease: bubonic plague. Plague was a perennial threat along the empire's southern frontiers with European Turkey. It was believed to appear only in warm climates; the link with fleas and rats was unknown. The traditional defense was isolation, ranging from quarantine of suspected individual carriers to cordons of troops sealing off entire regions. In March 1770, plague appeared among Russian troops occupying the Turkish Balkan province of Wallachia. In September, it reached Kiev, in the Ukraine. Cooler autumn weather slowed the advance of the disease, but by then, refugees were fleeing north.\n\nBy mid-January 1771, the scare seemed over, but with the first spring thaw, Muscovites began to develop the distinctive dark spots and swollen glands. One hundred and sixty workers died in a single week at one textile factory in the city. On March 17, Catherine decreed emergency quarantine measures in Moscow: theatrical performances, balls, and all large public gatherings were banned. A sudden freeze at the end of March brought an abrupt decline in the death rate. Catherine and the municipal authorities began lifting restrictions. At the end of June, however, plague reappeared. By August, it was ravaging the city. Soldiers removing bodies from the streets fell ill and died. The city's chief doctor requested medical leave for a month to receive treatment for his own illness. On September 5, Catherine was told that the daily death toll was between three and four hundred; that abandoned corpses littered the streets; that the network of checkpoints around the city was collapsing, and that the people were hungry because no supplies were being delivered. Men, women, and children already ill were required to enter quarantine centers.\n\n\"The imposition of medical precautions led to rioting. Many in Moscow's terror-stricken population came to believe that the physicians and their medicines had brought the plague to the city. They refused to obey orders forbidding them to gather in marketplaces and churches and to kiss supposedly miraculous icons in hope of protection. Instead, they gathered to seek salvation and solace around these icons. A famous icon of the Virgin at Varvarsky Gate became a magnet; day after day, crowds of diseased people swarmed around her feet. She became the deadliest center of contagion in the city.\"\n\n\"Attempting to reduce infection by preventing the formation of crowds, and relying on his authority as a priest, he had the Varvarsky Virgin removed from the city gate under cover of night and hidden. He believed that once the people knew that he was the one responsible, they would go home and the plague-ridden site would be eliminated. Instead, his well-meaning attempt provoked a riot. The crowd, rather than dispersing, was enraged. Ambrosius fled to a monastery and took refuge in a cellar, but the mob pursued him, dragged him out, and tore him apart. The riot was put down by troops, who killed a hundred people and arrested three hundred.\"\n\n\"Catherine realized that Moscow and its population were slipping out of control. The nobles had abandoned the city for their estates in the countryside; the factories and workshops were closed; the workers, serfs, and urban peasants, living in crowded wooden houses that harbored swarms of rats carrying the plague-bearing fleas, had been left to shift for themselves. Late in September, the empress received a message from the governor of Moscow, seventy-two-year-old General Peter Saltykov, saying that, with deaths exceeding eight hundred per day, he was helpless; the situation was our of control. He asked to be allowed to leave the city until winter. The empress was shocked. The rising death toll, Ambrosius's violent murder; Saltykov's desertion of his post. How was she to cope with this?\"",
    links: [],
    sources: [],
    tags: [
    "history",
    "medicine",
    "public health",
    "Russia"
  ],
    heroImageUrl: "https://images.pexels.com/photos/9258489/pexels-photo-9258489.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isPublic: true,
    dateAdded: new Date('2024-06-01')
  },
  {
    id: "radishchev-serfdom",
    title: "Radishchev and the First of the Repentant Nobles",
    category: "History & Politics",
    status: "idea",
    excerpt: "Alexander Radishchev's Journey from St. Petersburg to Moscow—Catherine's reaction, the sedition trial, and Siberian exile as the birth of the Russian intelligentsia.",
    notes: "Radishchev and serfdom:\n\nAlexander Radishchev: The First of the Repentant Nobles — These words were written by Alexander Radishchev and with them, it has been truly said, the Russian intelligentsia was born and the first of the repentant noblemen made his appearance in Russian life and literature.\n\n\"As a palliative to this grim prospect, Radishchev offered a plan for the gradual emancipation of serfs. All domestic serfs were to be emancipated at once; agricultural serfs would be granted full ownership of private plots and then be allowed to use their profits to buy their own freedom. They would be allowed to marry without asking their masters' permission. And they would be judged in courts of their peers—that is, by other peasants.\"\n\nCatherine read the book in June 1790 and filled the margins with notes. She gave Radishchev intellectual credit: \"[The author] has learning enough, and has read many books … he has imagination enough, and he is audacious in his writing.\" She guessed that he acquired his education in Leipzig, \"hence the suspicion falls on M. Radishchev, the more so because he is said to have a printing press in his house.\" Had the book been written thirty or even twenty years earlier, Catherine might have recognized some of her own views; now, from her new perspective, she declared that \"the purpose of this book is clear on every page. Its author, infected and filled with the French madness, is trying in every possible way to break down respect for authority and the authorities, to stir up in the people's indignation against their superiors and against the government.\" She rejected Radishchev's portrayal of the behavior of landowners and the condition of serfs and was outraged by his warnings of serf rage and impending revenge. The author, she declared, is \"a rabble-rouser, worse than Pugachev … inciting the serfs to bloody rebellion.\" And he was inciting not only the peasants but the general population to disregard the authority of all rulers, from empresses down to local officials. In Radishchev's denunciations of her government and his mingling of the Pugachev horrors with the new \"poisons\" being concocted in France, she saw an effort to propagate the beliefs of the revolutionaries in Paris and destabilize Russia at a time when the country was fighting two wars. The book, she wrote in a margin, \"could not be tolerated.\"\n\nRadishchev was identified, arrested, and taken to the Peter and Paul Fortress for interrogation. He was not tortured. Even so, aware of the consequences for his family, he began to renege. He declared that his book had stemmed from vanity; he said he had wanted to win literary fame.\n\n\"He did his best to minimize retribution by admitting that his language had been exaggerated and that his accusations against government officials were inaccurate. He denied any intention of attacking Catherine's government; he meant only to point out certain correctable shortcomings. He had not intended to rouse peasant against landowner; he had only wished to force bad\n\nHe admitted that he hoped for the freedom of the serfs but declared that he wanted to achieve this through legislative action, such as that already taken or proposed by the Empress Catherine. He threw himself on Catherine's mercy. He was tried by the Central Criminal Court in St. Petersburg, charged with sedition and lese-majesté, and sentenced to death by beheading. The Senate routinely confirmed the verdict. In the interim, however, Catherine had forwarded the book to Potemkin for comment. Despite the personal attacks on himself as well as the empress, the prince advocated leniency. \"I've read the book you sent me. I am not angry,\" he wrote to Catherine. \"It seems, Matushka, he has been slandering you, too. And you also won't be angry. Your deeds are your shield.\" Potemkin's moderate response calmed Catherine, who did what she always did: she commuted the death penalty and changed it to a sentence of ten years of Siberian exile.\"\n\nThereafter, Radishchev was treated with relative leniency. After sentencing, he was taken from the court in chains, but the following morning the chains were struck off by Catherine's order. He was allowed sixteen months to reach his place of exile four thousand miles east of St. Petersburg. Minister of Commerce Alexander Vorontsov, his patron and friend, sent him clothes, books, and a thousand rubles a year. Eventually, Radishchev, by now a widower, was joined in Siberia by his two youngest children, brought to him by his sister in law, who remained with him and bore him three more children. He constructed a large house for his family, his servants, and his books. He worked as an amateur doctor, taught his children, and read the books sent to him by his friends. Soon after Catherine's death in 1796, her son, Paul, terminated Radishchev's exile and allowed him to return to his estate near Moscow. In 1802, deeply depressed, he committed suicide, leaving behind the dying words of Cato: \"Now I am my own master.\" His Journey was published in London in 1859. Three years later—sixty years after Radishchev's death—Catherine's great-grandson, Emperor Alexander II, abolished serfdom",
    links: [
    {
    title: "The First of the Repentant Nobles",
    url: "https://www.historytoday.com/archive/alexander-radishchev-first-repentant-nobles"
    }
  ],
    sources: [
    {
    label: "The Empress and Her Prodigee.pdf",
    url: ""
    }
  ],
    tags: [
    "Russia",
    "serfdom",
    "literature",
    "politics"
  ],
    heroImageUrl: "https://images.pexels.com/photos/37613453/pexels-photo-37613453.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isPublic: true,
    dateAdded: new Date('2024-05-20')
  },
  {
    id: "things-fall-apart-masculinity",
    title: "Things Fall Apart & the Perils of Hypermasculinity",
    category: "Essay Seeds",
    status: "idea",
    excerpt: "How to navigate stoicism as a woman? A larger question about moving through a hyper-masculine world—providence is absurd, men are order and feminine is chaos.",
    notes: "Things Fall apart and Stoic Masculinity\n\nThings fall apart- Perils of Hypermasculinity. How to navigate stoicism as a woman? Larger question of how to navigate a hyper-masculine world?\n\nprovidence is absurd\n\nmen are order and feminine is chaos",
    links: [],
    sources: [],
    tags: [
    "literature",
    "gender",
    "philosophy",
    "stoicism"
  ],
    heroImageUrl: "https://images.pexels.com/photos/10874581/pexels-photo-10874581.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isPublic: true,
    dateAdded: new Date('2024-05-10')
  },
  {
    id: "botticelli-women",
    title: "Botticelli's Four Pillars of a Woman",
    category: "Essay Seeds",
    status: "idea",
    excerpt: "Romance, revenge, and reality in Renaissance Florence—contradiction and complexity in how women were idealized in art.",
    notes: "Botticelli's four pillars of a woman\n\nRomance, Revenge, and Reality: The Complex Ideals of Women in the Renaissance Using Works by Sandro Botticelli — THE CONCEPT Contradiction and complexity are two words that can be used to define the Renaissance: A time period built on the tension between the reemergence of philosophy, beauty, and art contrasted with the celebration of traditional home values. In this way, the art of renaissance Florence can also be seen through this tension.\n\nBotticelli and His Portrayal of Women essays — Botticelli is one of the most famous artists during the Italian Renaissance.\n\nIdealised Portrait of a Lady (Portrait of Simonetta Vespucci as Nymph) — The fantastical accoutrements in this larger-than-life-size half-length painting of a young lady make it clear that it is not a likeness in the strict sense, but an ideal portrait in the mythological guise of a nymph. Shown in profile, the young woman displays the features of Simonetta Vespucci, the prematurely deceased mistress of Giuliano de' Medici.",
    links: [
    {
    title: "Romance, Revenge, and Reality: The Complex Ideals of Women in the Renaissance",
    url: "https://onlineacademiccommunity.uvic.ca/elenitsonis/2021/03/29/romance-revenge-and-reality-the-complex-ideals-of-women-in-the-renaissance-using-works-by-sandro-botticelli/"
    },
    {
    title: "Botticelli and His Portrayal of Women",
    url: "https://www.megaessays.com/viewpaper/41695.html"
    },
    {
    title: "Idealised Portrait of Simonetta Vespucci",
    url: "https://sammlung.staedelmuseum.de/en/work/idealised-portrait-of-a-lady"
    }
  ],
    sources: [],
    tags: [
    "art history",
    "Renaissance",
    "gender"
  ],
    heroImageUrl: "https://images.pexels.com/photos/11098554/pexels-photo-11098554.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isPublic: true,
    dateAdded: new Date('2024-04-28')
  },
  {
    id: "ethnic-ambiguity-beauty",
    title: "Ethnic Ambiguity & European Beauty Standards",
    category: "Essay Seeds",
    status: "idea",
    excerpt: "Connect Botticelli's idealized portraits to racial ambiguity and modern beauty trends—the TikTok nose trend and who gets to define \"European\" beauty.",
    notes: "See if you can connect that to racial ambiguity and European beauty standards. Especially the tik-tok nose trend and so on.\n\nOn being \"ethnically ambiguous\" — This is part two of Vox First Person's exploration of multiracial identity in America. Read part one and part three. First-person essays and interviews with unique perspectives on complicated issues. I often joke that one of the greatest compliments I've ever received was that I look like Apollonia from Purple Rain.",
    links: [
    {
    title: "On Being Ethnically Ambiguous",
    url: "https://www.vox.com/first-person/2021/1/19/22224830/ethnically-ambiguous-mixed-race-hawaii"
    }
  ],
    sources: [],
    tags: [
    "identity",
    "beauty",
    "culture",
    "race"
  ],
    heroImageUrl: "https://images.pexels.com/photos/5254299/pexels-photo-5254299.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isPublic: true,
    dateAdded: new Date('2024-04-15')
  },
  {
    id: "paleopathology",
    title: "What Is Paleopathology?",
    category: "Science & History",
    status: "researching",
    excerpt: "Three angles: infections visible in bone, carbon dating and ancient diets, and using bone pathology to understand disease. Who gets to tell these stories—and modern pseudo weight-loss plans claiming \"ancient\" diets.",
    notes: "What is paleopathology?\n\nNot the best title, but there is something interesting here. Look into it. Maybe who gets to tell these stories about whom? but I think using this angle to talk about modern diets and investigate into pseudo weight-loss plans!\n\nit seems you can divide it into three parts, Infections through bone, carbon dating and understanding diets, the use of bone pathology to understand diseases\n\nThe science of the disease that can be demonstrated in human and animal remains of ancient times:\n\nhealth\n\ndisease\n\ndeath\n\nenvironment\n\nculture in ancient populations\n\nPaleontological research dates back to the early 1800s. In 1815 the English geologist William Smith demonstrated the value using fossils for the study of strata. French zoologist Georges Cavier of the structure of living animals with fossil remains.\n\nEvidence of infection has been found in the bones of prehistoric animals and in the soft tissue of mummies\n\nIronically, worrying about our allegedly unnatural and artificial modern diet has become- having the quixotic idea of adopting the dietary patterns of ancient humans or even wild primates.\n\nArchaeologists frequently use many different sources of information to reconstruct ancient diets, including faunal and macrobotanical remains, pollen and phytoliths, as well as pottery residues, coprolites, and indirect sources such as skeletal pathology, dental wear patterns, artistic depictions, and ethnographic observations\n\nIn the late 1970s, though, a new area of dietary research developed based on the isotopic composition of human bone.\n\nit was realized that carbon isotope ratios in consumer tissues (e.g. bone) would also be affected, and therefore the measurement of carbon isotope ratios could be used to indicate the importance of maize in human diets [1, 2]\n\nthe stable isotope analysis of human bone quickly became a widely applied technique, especially in areas where isotopically diverse food sources are known to have existed\n\nBone and Teeth are the primary source of paleopathological information injuries identifiable ancient times:\n\nfracture\n\ndislocation\n\nsprain\n\nbone spur\n\ncalcified blood clouts\n\nnasal septal deformities\n\nsome skeletons exhibit fractures that resulted in deformities that must have caused difficulty in walking, chronic pain and degenerative joint disease.\n\nFaulty Healings:\n\nbone spurs in adjacent soft tissues\n\ncalcified blood clots\n\ngrowth retardations\n\naseptic necrosis\n\npseudo-arthritis (fibrous tissue substituted for bone)\n\ndegenerative joint disease\n\nUsually bones show obvious pathology:\n\nSyphilis leaves the Hutchinson's Incisor Defect\n\nSyphilitic vasculitis around the time of birth can damage the developing tooth buds and lead to dental anomalies. Hutchinson teeth are abnormal permanent upper central incisors that are peg-shaped and notched, usually with obvious thinning and discoloration of enamel in the area of the notching; they are widely spaced and shorter than the lateral incisors; the width of the biting surface is less than that of the gingival margin(Fig. 16–8) [280]. Mulberry molars (also known as Moon or Fournier molars) are multicuspid first molars in which the tooth's grinding surface, which is narrower than that at the gingival margin, has many small cusps instead of the usual four well-formed cusps (Fig. 16–9). The enamel itself tends to be poorly developed [162,219]. X-ray studies can lead to the diagnosis, even while deciduous teeth are in place. Deciduous teeth are largely unaffected except for a possible predisposition to dental caries.\n\nLate congenital syphilis in the child or adolescent corresponds to tertiary syphilis in the adult, although the cardiovascular system is seldom involved. Manifestations include bony and dental abnormalities (skull bossing, Hutchinson's teeth) and inflammatory lesions of the cornea (interstitial keratitis) and joints (Clutton's joints). Eighth nerve deafness is commonly seen, and symptomatic neurosyphilis may occur, corresponding to tabes dorsalis or general paresis in the adult. In view of the high incidence of early congenital syphilis in many African cities, late manifestations of the disease are surprisingly rare in Africa.\n\nDiagnosing congenital syphilis using Hutchinson's method: Differentiating between syphilitic, mercurial, and syphilitic-mercurial dental defects\n\nLeprosy: damage to bones of face, fingers and toes\n\nBone Changes in Leprosy: A Correlation of Clinical and Radiographic Features\n\nMalfunction of Endocrine Glands Leaves signs on the Bones\n\nVarious Cancers: Identifiable in Skeletal Remains\n\nMalnutrition: rickets, scurvy, anemia—> abnormalities in bone structure\n\nScurvy: Calcified blood clots in many skeletons\n\nPorotic Hyperostosis: porous sieve-like lesions found in ancient human skulls\n\nTooth replication techniques, SEM imaging and microwear analysis in Primates: methodological obstacles",
    links: [
    {
    title: "Assessment of Diet in Paleopathological Studies",
    url: "https://pubmed.ncbi.nlm.nih.gov/26823189/"
    },
    {
    title: "Bone Pathology Overview",
    url: "https://www.sciencedirect.com/topics/medicine-and-dentistry/bone-pathology"
    }
  ],
    sources: [],
    tags: [
    "paleopathology",
    "medicine",
    "archaeology",
    "science communication"
  ],
    heroImageUrl: "https://images.pexels.com/photos/18416943/pexels-photo-18416943.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isPublic: true,
    dateAdded: new Date('2024-04-01')
  },
  {
    id: "michelangelo-arthritis",
    title: "Michelangelo's Arthritis",
    category: "Medical History",
    status: "idea",
    excerpt: "What his hands can and can't tell us—did he work through acute arthritis in his later years while remaining prolific?",
    notes: "Michelangelo's Arthritis\n\nWhat Michelangelo's hands (can and can't) tell us about arthritis - Harvard Health — A recent journal article describes Michelangelo's hands as depicted in an attempt to figure out potential joint diseases he may have had. Theories suggest some myths and misconceptions about the causes and symptoms of osteoarthritis and gout. This report has implications for today's medical care. While a picture ...\n\nDid Michelangelo Suffer From Arthritis? - artnet News — Renowned Renaissance artist Michelangelo was a master of sculpture, bending stone and marble to his will with a skilled hand. His prolonged use of hammers and chisels, however, may have led to debilitating arthritis in his hands in his later life.\n\nMichelangelo Worked Through Acute Arthritis in His Later Years, New Study Says — An article published this week by the Journal of the Royal Society of Medicine suggests that Michelangelo Buonaroti suffered from osteoarthritis for the last 15 years of his life. Miraculously, though the researchers claim that this was why the Renaissance master could not write his own letters toward the end of his life, it did not affect his art practice, which remained prolific up to the week of his death.",
    links: [
    {
    title: "Michelangelo's Hands and Arthritis",
    url: "https://www.health.harvard.edu/blog/michelangelos-hands-can-cant-tell-us-arthritis-201607139960"
    },
    {
    title: "Did Michelangelo Suffer From Arthritis?",
    url: "https://news.artnet.com/art-world/michelangelo-arthritis-419063"
    },
    {
    title: "Michelangelo Worked Through Acute Arthritis in His Later Years",
    url: "https://hyperallergic.com/273301/michelangelo-worked-through-acute-arthritis-in-his-later-years-new-study-says/"
    }
  ],
    sources: [],
    tags: [
    "art history",
    "medicine",
    "disability"
  ],
    heroImageUrl: "https://images.pexels.com/photos/18582289/pexels-photo-18582289.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isPublic: true,
    dateAdded: new Date('2024-03-20')
  },
  {
    id: "caesar-epilepsy",
    title: "Julius Caesar's Epilepsy",
    category: "Medical History",
    status: "idea",
    excerpt: "Strokes vs. epilepsy, morbus caducus, and the intersection of ancient medicine with religion and power.",
    notes: "Julius Caesar's Epilepsy\n\nJulius Caesar Suffered from Strokes, Not Epilepsy, New Study Says — In a paper titled \"Has the Diagnosis of a Stroke been overlooked in the Symptoms of Julius Caesar?\" doctors Francesco M. Galassi and Hutan Ashrafian of Imperial College London argue that the Roman general may have been afflicted by cerebrovascular disease.\n\nDid Julius Caesar have epilepsy? — Julius Caesar is one of the most famous rulers in history. But did Julius Caesar have epilepsy? Learn about the Roman general's health. Julius Caesar is one of the most famous military rulers of all time. He lived between 100 and 44 BC and is well known for his major military achievements, his transformation of the Roman Empire and his assassination.\n\nepilepsy and religion.pdf\n\nWhat does \"morbus caducus\" mean in Latin? — English words for morbus caducus include epilepsy, falling sickness and fit.",
    links: [
    {
    title: "Caesar Suffered from Strokes, Not Epilepsy",
    url: "https://www.history.com/news/julius-caesar-suffered-from-strokes-not-epilepsy-new-study-says"
    },
    {
    title: "Did Julius Caesar have epilepsy?",
    url: "https://www.epsyhealth.com/seizure-epilepsy-blog/did-julius-caesar-have-epilepsy"
    },
    {
    title: "morbus caducus (Latin)",
    url: "https://www.wordhippo.com/what-is/the-meaning-of/latin-word-040ca2ab1e59f2cabbdb2b4bc9f360c2138c8482.html"
    }
  ],
    sources: [
    {
    label: "epilepsy and religion.pdf",
    url: ""
    }
  ],
    tags: [
    "classics",
    "medicine",
    "history"
  ],
    heroImageUrl: "https://images.pexels.com/photos/7337507/pexels-photo-7337507.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isPublic: true,
    dateAdded: new Date('2024-03-10')
  },
  {
    id: "george-iii-madness",
    title: "King George III and the Madness Question",
    category: "Medical History",
    status: "idea",
    excerpt: "Porphyria, bipolar disorder, or arsenic poisoning from prescribed medicines? What was the truth about the king's madness?",
    notes: "King George III Porphyria\n\nKing George III and porphyria: an elemental hypothesis and investigation — In 1969 it was proposed that the episodic madness suffered by King George III (1738-1820) resulted from an acute hereditary porphyria, variegate porphyria, caused by deficiency of protoporphyrinogen oxidase. The diagnosis was based on the historical archive and a contentious claim that living members of the House of Hanover were affected with the condition.\n\na popular explanation of the King's Madness\n\nanxiety\n\nhallucinations\n\ndiscolored urine\n\nthe symptoms were likely because of arsenic poisoning of doctor prescribed medicines\n\nsome scholars say he is bipolar\n\nWhat was the truth about the madness of George III? — Modern medicine may help us to discover the real reasons behind King George III's erratic behaviour, writes historian Lucy Worsley. George III is well known in children's history books for being the \"mad king who lost America\". In recent years, though, it has become fashionable among historians to put his \"madness\" down to the physical, genetic blood disorder called porphyria.\n\nKing George III, bipolar disorder, porphyria and lessons for historians — In the 1960s, Ida Macalpine and Richard Hunter, mother and son psychiatrists, stated that George III's medical records showed that he suffered from acute porphyria. In spite of well-argued criticisms by Geoffrey Dean and Charles Dent based on their extensive ...",
    links: [
    {
    title: "The Truth About George III's Madness",
    url: "https://www.bbc.com/news/magazine-22122407"
    },
    {
    title: "King George III and Porphyria",
    url: "https://www.thelancet.com/journals/lancet/article/PIIS0140673605669917/fulltext"
    },
    {
    title: "King George III, bipolar disorder, porphyria and lessons for historians",
    url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4953321/"
    }
  ],
    sources: [],
    tags: [
    "history",
    "medicine",
    "monarchy"
  ],
    heroImageUrl: "https://images.pexels.com/photos/3795023/pexels-photo-3795023.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isPublic: true,
    dateAdded: new Date('2024-02-28')
  },
  {
    id: "harriet-tubman-narcolepsy",
    title: "Harriet Tubman & Narcolepsy",
    category: "Medical History",
    status: "idea",
    excerpt: "The brain injury that may have shaped one of history's greatest freedom fighters—migraines, narcolepsy, and the politics of telling disability stories.",
    notes: "Harriet Tubman\n\nThe Brain Injury That Helped End Slavery - Folks — An American icon of freedom and resilience, Harriet Tubman's portrait is slated to grace the $20 bill beginning in 2030. It's an auspicious achievement for a hero of civil rights who escaped from slavery, led hundreds of others to do the same, all while balancing a challenging array of chronic conditions including migraines and acute attacks of narcolepsy.\n\nNarcolepsy - NORD (National Organization for Rare Disorders) — TEXTBOOKS Goswami M. Narcolepsy. In: NORD Guide to Rare Disorders. Lippincott Williams & Wilkins. Philadelphia, PA. 2003:561-2. Fauci AS, et al., eds. Harrison's Principles of Internal Medicine. 14th ed. New York, NY: McGraw-Hill Companies, Inc.; 1998:155. Wyngaarden JB, et al., eds. Cecil Textbook of Medicine. 19th ed. Philadelphia, PA: W.B.",
    links: [
    {
    title: "The Brain Injury That Helped End Slavery",
    url: "https://folks.pillpack.com/brain-injury-helped-end-slavery/"
    },
    {
    title: "Narcolepsy - NORD",
    url: "https://rarediseases.org/rare-diseases/narcolepsy/"
    }
  ],
    sources: [],
    tags: [
    "history",
    "disability",
    "medicine",
    "biography"
  ],
    heroImageUrl: "https://images.pexels.com/photos/11667693/pexels-photo-11667693.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isPublic: true,
    dateAdded: new Date('2024-02-15')
  },
  {
    id: "lincoln-depression",
    title: "Lincoln's Great Depression",
    category: "Mental Health & Art",
    status: "idea",
    excerpt: "How depression challenged a president and fueled his greatness—humor, poetry, and purpose as antidotes.",
    notes: "Depression\n\nLincoln's Great Depression — Abraham Lincoln fought clinical depression all his life, and if he were alive today, his condition would be treated as a \"character issue\"-that is, as a political liability. His condition was indeed a character issue: it gave him the tools to save the nation\n\nLincoln's Melancholy: How Depression Challenged a President and Fueled His Greatness — Book by Joshua Wolf Shenk\n\nAbraham Lincoln, along with other famous sufferers of depression such as Winston Churchill and Mark Twain, used humor as an antidote to depression. To boost his spirits, Lincoln told jokes and funny stories. Lincoln said, \"If it were not for these stories—jokes—jests I should die; they give vent—are the vents of my moods and gloom.\" Shenk concludes that \"Humor gave Lincoln protection from his mental storms. It distracted him and gave him relief and pleasure . . . Humor also gave Lincoln a way to connect with people.\" In addition to humor, Shenk discovered that Lincoln utilized other major depression antidotes, including his love of poetry and a strong belief that his life had an important purpose.",
    links: [
    {
    title: "Lincoln's Great Depression",
    url: "https://www.theatlantic.com/magazine/archive/2005/10/lincolns-great-depression/304247/"
    }
  ],
    sources: [
    {
    label: "Lincoln's Melancholy by Joshua Wolf Shenk",
    url: ""
    }
  ],
    tags: [
    "mental health",
    "history",
    "biography"
  ],
    heroImageUrl: "https://images.pexels.com/photos/37072/abraham-lincoln-lincoln-memorial-washington-dc-lincoln.jpg?auto=compress&cs=tinysrgb&w=1920",
    isPublic: true,
    dateAdded: new Date('2024-02-01')
  },
  {
    id: "okeeffe-depression",
    title: "Georgia O'Keeffe & Depression",
    category: "Mental Health & Art",
    status: "idea",
    excerpt: "Newly uncovered letters, \"that crazy little girl,\" and how artists create through mood regulation.",
    notes: "Newly Uncovered Georgia O'Keeffe Letters Shed Light On Her Greatest Paintings — Imagine Georgia O'Keeffe needing \"luck\" to paint a flower. But there it is, in the artist's twirling calligraphy, in a letter to her friend, documentary filmmaker Henwar Rodakiewicz. Maybe I've been absurd about wanting to do a big flower painting, but I've wanted to do it and that is that.\n\nMental Health Art History: 5 More Artists with Depression — Depression is one of the most prevalent mental health issues in the world, so it's no wonder it's also common among artists. Nevertheless, as we looked at in our previous post on artists with depression, some impressive artists manage to create inspiring work despite the debilitating symptoms of the condition.\n\nGeorgia O'Keeffe, That Crazy Little Girl (Published 1997) — PHOTOGRAPHY REVIEW ''IN the springtime some little girls go crazy. Like appletrees sometimes do. I know one such little girl. Guess who she is.'' Alfred Stieglitz sent this riddle to Georgia O'Keeffe in 1922, inscribed under a photograph of an apple tree in blossom.\n\nBereavement and Depression — \"The risk of love is loss and the price of loss is grief. But the pain of grief is only a shadow when compared with the pain of never risking love.\" - Hilary Stanton Zunin The figurative and literal losses associated with the COVID-19 pandemic are profound.",
    links: [
    {
    title: "O'Keeffe Letters Shed Light on Her Paintings",
    url: "https://www.wbur.org/npr/705569875/newly-uncovered-georgia-okeeffe-letters-shed-light-on-her-greatest-painings"
    },
    {
    title: "Mental Health Art History: 5 More Artists with Depression",
    url: "https://www.sartle.com/blog/post/mental-health-art-history-5-more-artists-with-depression"
    },
    {
    title: "Georgia O'Keeffe, That Crazy Little Girl",
    url: "https://www.nytimes.com/1997/08/01/arts/georgia-o-keeffe-that-crazy-little-girl.html"
    },
    {
    title: "Bereavement and Depression",
    url: "https://www.psychiatrictimes.com/view/bereavement-and-depression"
    }
  ],
    sources: [],
    tags: [
    "art",
    "mental health",
    "biography"
  ],
    heroImageUrl: "https://images.pexels.com/photos/32225305/pexels-photo-32225305.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isPublic: true,
    dateAdded: new Date('2024-01-20')
  },
  {
    id: "garfield-death",
    title: "Un-sanitized Deaths — President Garfield",
    category: "Death & Medicine",
    status: "idea",
    excerpt: "Doctors finished what an assassin's bullet started—hospital-acquired infection and the unsanitized history of presidential medicine.",
    notes: "Un-sanitized Deaths\n\nThe dirty, painful death of President James A. Garfield — Editor's note: This post contains graphic content and may be disturbing to some readers. On Sep. 19, 1881, James Abram Garfield, the 20th president of the United States, died. His final weeks were an agonizing march towards oblivion that began on July 2, while preparing to leave Washington for a family vacation to the New Jersey seashore.\n\nDirty Doctors Finished What an Assassin's Bullet Started — On July 2, 1881, Charles Guiteau shot President James Garfield in the back. On September 19, 1881, Garfield died, with a bullet still lodged in fatty tissue behind his pancreas. At his trial, Guiteau denied killing the president. \"Garfield died from malpractice,\" the gunman said.\n\nHospital-acquired infection - Microbiology — A hospital-acquired infection (HAI) is an infection whose development is favoured by a hospital environment, such as one acquired by a patient during a hospital visit. OUH Microbiology supports screening programmes for methicillin-resistant Staphylococcus aureus (MRSA), Clostridium difficile (C. diff) and carbapenemase-producing Enterobacteriaceae (CPE).",
    links: [
    {
    title: "Garfield's Death",
    url: "https://www.pbs.org/newshour/health/dirty-painful-death-president-james-garfield"
    },
    {
    title: "Dirty Doctors",
    url: "https://www.scientificamerican.com/article/dirty-doctors-finished-what-an-assassins-bullet-started/"
    },
    {
    title: "Hospital-acquired infection",
    url: "https://www.ouh.nhs.uk/microbiology/diagnostic-tests/atoz/hai.aspx"
    }
  ],
    sources: [],
    tags: [
    "history",
    "medicine",
    "politics"
  ],
    heroImageUrl: "https://images.pexels.com/photos/36659544/pexels-photo-36659544.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isPublic: true,
    dateAdded: new Date('2024-01-10')
  },
  {
    id: "semmelweis-handwashing",
    title: "Semmelweis & the Doctor's Redemption",
    category: "Death & Medicine",
    status: "idea",
    excerpt: "Mandatory handwashing cut maternity mortality—then medicine rejected him. Lister, Pasteur, and the long arc of germ theory.",
    notes: "A doctor's redemption\n\nIn 1867, two years after Semmelweis' death, Scottish surgeon Joseph Lister also propelled the idea of sanitizing hands and surgical instruments to halt infectious diseases. His ideas had their critics, too, but in the 1870s physicians began regularly scrubbing up before surgery.\n\nNot long after, others began to recognize the earlier work of Semmelweis. His work later led to Louis Pasteur's development of germ theory, which changed how doctors care for their patients and investigate the cause and spread of diseases. (Teaching people to be healthy has come a long way.)\n\nIn 1847, Semmelweis implemented mandatory handwashing among the students and doctors who worked for him at the Vienna General Hospital. Rather than relying on plain soap, Semmelweiss used a chlorinated lime solution because it totally removed the smell of decay that lingered on the doctors' hands. The staff began sanitizing themselves and their instruments. The mortality rate in the physician-run maternity ward plummeted.\n\nIn the spring of 1850, Semmelweis took the stage at the prestigious Vienna Medical Society and extolled the virtues of hand washing to a crowd of doctors. His theory flew in the face of accepted medical wisdom of the time and was rejected by the medical community, who faulted both his science and his logic. Historians believe they also rejected his theory because it blamed them for their patients' deaths. Despite reversing the mortality rates in the maternity wards, the Vienna Hospital abandoned mandatory handwashing.",
    links: [],
    sources: [],
    tags: [
    "medicine",
    "history",
    "public health"
  ],
    heroImageUrl: "https://images.pexels.com/photos/3884110/pexels-photo-3884110.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isPublic: true,
    dateAdded: new Date('2023-12-20')
  },
  {
    id: "royal-hemophilia",
    title: "Royal Hemophilia — \"The Royal Disease\"",
    category: "Medical History",
    status: "idea",
    excerpt: "Queen Victoria's genetic legacy across European royalty—from Leopold to Alexei and Rasputin.",
    notes: "Royal Hemophilia\n\nA Royal Disease\n\nHemophilia is sometimes referred to as \"the royal disease,\" because it affected the royal families of England, Germany, Russia and Spain in the 19th and 20th centuries. Queen Victoria of England, who ruled from 1837-1901, is believed to have been the carrier of hemophilia B, or factor IX deficiency. She passed the trait on to three of her nine children. Her son Leopold died of a hemorrhage after a fall when he was 30. Her daughters Alice and Beatrice passed it on to several of their children. Alice's daughter Alix married Tsar Nicholas of Russia, whose son Alexei had hemophilia. Their family's entanglement with Rasputin, the Russian mystic, and their deaths during the Bolshevik Revolution have been chronicled in several books and films. Hemophilia was carried through various royal family members for three generations after Victoria, then disappeared.\n\nTreatment Breakthroughs\n\nIn the early 1900s, there was no way to store blood. People with hemophilia who needed a transfusion typically received fresh whole blood from a family member. Life expectancy was 13 years old.\n\nIn 1901, the US Surgeon General's Catalogue listed lime, inhaled oxygen and the use of thyroid gland or bone marrow, or hydrogen peroxide or gelatin, as treatments for hemophilia. By the 1930s, it was discovered that diluting certain snake venoms caused blood to clot. These treatment were used in patients with hemophilia.\n\nBy 1926, the US Surgeon General's Catalogue contained an entire section on the use of blood transfusions to replace missing clotting factors. Physicians discovered that patients responded readily to infusions of plasma when given promptly after they sustained spontaneous joint and muscle bleeding.\n\nIn 1937 Harvard physicians Arthur Patek and FHL Taylor published a paper describing anti-hemophilia globulin found in plasma. It could decrease clotting time in patients with hemophilia.\n\nBy the late 1950s and early 1960s fresh frozen plasma was transfused in patients in the hospital. However, each bag of the plasma contained so little of the necessary clotting factor that huge volumes of it had to be administered. Many children experienced severe joint bleeds that were crippling. Intracranial hemorrhage could be fatal. By 1960, the life expectancy for a person with severe hemophilia was less than 20 years old.",
    links: [],
    sources: [],
    tags: [
    "genetics",
    "history",
    "monarchy",
    "medicine"
  ],
    heroImageUrl: "https://images.pexels.com/photos/6629398/pexels-photo-6629398.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isPublic: true,
    dateAdded: new Date('2023-12-01')
  },
  {
    id: "code-switching",
    title: "Cross-Cultural Code Switching vs. Linguistic Codeswitching",
    category: "Language & Cognition",
    status: "researching",
    excerpt: "Syntactic vs. imagistic thinking, dialect shifts, and why politicians code-switch—Eric Deggans on \"guys\" in AAVE.",
    notes: "Syntactic Vs. Imaginative Thinking\n\nLanguage acquisition and language dissolution happen over time or diachronically. While language production and comprehension happen at a certain point of time or synchronically.\n\nWe realize how much we take our actions for granted only through loss of injury. Language production is very important for us. Psycholinguists divided language production into four stages, conceptualization, formulation, articulation and self-monitoring.\n\nConceptualization is the first step in language production. It means how to conceptualize the speech in our mind. The theory of the American psycholinguist, David McNeill , says that primitive linguistic concepts are formed as two modes of thought. These are syntactic thinking, which creates the sequence of words which we typically think of when we talk about how language is initiated, and imagistic thinking, which creates a visual mode of communication. Syntactic thinking and imagistic thinking collaborate together to conceptualize conversation\n\n### The Five Stages of Second Language Acquisition\n\nAnyone who has been around children who are learning to talk knows that the process happens in stages—first understanding, then one-word utterances, then two-word phrases, and so on. Students learning a second language move through five predictable stages: Preproduction, Early Production, Speech Emergence, Intermediate Fluency, and Advanced Fluency (Krashen & Terrell, 1983). How quickly students progress through the stages depends on many factors, including level of formal education, family background, and length of time spent in the country.\n\nIt is important that you tie instruction for each student to his or her particular stage of language acquisition. Knowing this information about each student allows you to work within his or her zone of proximal development—that gap between what students can do on their own and what they can do with the help of more knowledgeable individuals (Vygotsky, 1978).\n\nAnother reason for all teachers to gain insights into their students' stages of second language acquisition is to meet the requirements of the 2001 No Child Left Behind Act, which requires ELLs to progress in their content knowledge and in their English language proficiency. How are we going to accomplish this if we are not all responsible for content and language?\n\nKarl Lashley: common to commit spelling errors when rapid typing: showed how slips of tongues provide vivid insight into our understanding of how speech is formulating\n\nKarl Lashley, published an essay focused on the psychology of language. It concentrated on how speakers produce words, sound, sentences and phrases together so rapidly and accurately. He talked about how common it is to commit spelling errors when one is typing. These slips of the tongue or the pen are not linguistic loss during brain damage. They are normal mistakes occurs in everyday speaking and writing. We can make back-track and correct it.\n\nPriming: Guides the direction of speech production or comprehension\n\nThe repetition of syntactic structures might help in the mapping of meaning onto form (Ferreira & Bock, 2006) by reducing the error signal that is generated when the input does not match the expected syntactic structure. Thus, syntactic priming effects might be particularly strong during learning. From this line of thought follows an additional prediction known as the inverse preference effect: Priming effects should be stronger for infrequent structures because these benefit most from repetition (Ferreira & Bock, 2006), as an unexpected structure leads to a larger error signal (Chang, Janciauskas, & Fitz, 2012).\n\nCross-Cultural Code Switching vs. Lingual Codeswitching\n\nA critical practical challenge that organizations face in the increasingly interdependent global economy is the ability to function effectively across national cultural boundaries\n\nLinguistic code-switching is mostly used within bilingual and multilingual communities, and there are many reasons to use this method, such as the need to fit in with a group, as a force of habit, or to convey thoughts and concepts that might be easier to explain in a specific language.\n\nOf course, speakers can't just plug in whatever words they choose and ignore grammatical rules. When code-switching, it might seem casual and easy to an outside observer. In reality, there are many underlying, unconscious factors to code-switching that must be applied to make it understandable and natural.\n\n## USING DIFFERENT DIALECTS, ACCENTS, AND MANNERISMS\n\nThe second definition of code-switching comes from a sociolinguistic perspective, where the term is much broader. Under this umbrella, code-switching describes the use of different dialects, accents, language combinations, and mannerisms within social groups in order to project a particular identity. With this definition, code-switching is used by everyone as they change their language style based on who they're talking to, what they're talking about, where they are, and much more.\n\nThis type of code-switching occurs in social groups, primarily based on age, class, geographic location, upbringing, and ethnicity. All of these characteristics play crucial roles in how and when people code-switch.\n\n## Why do we code-switch?\n\nFor the most part, we code-switch to identify with a particular social group—and most of the time, we don't even realize we're doing it. Code-switching happens subtly, and in more situations than with only bilingual speakers.\n\nConsider how you speak around your co-workers. More than likely, your speech subconsciously becomes measured and professional. In contrast, when you're around friends, your speech transitions into a casual tone, as you feel more comfortable in this social setting or cultural context.\n\nThese code-switches become more noticeable based on the social setting. When visiting your home town, you might put much more emphasis into the regional dialect as an unconscious way to fit in.\n\nCode-switching is incredibly important in many social groups. For example, in an article with NPR, Eric Deggans reminisces about how saying the word \"guys\" in his social group growing up was tantamount to an insult. In African American Vernacular English, this term is rarely, if ever, used. Because it was rarely used, Deggans was accused of being influenced by other social circles outside of his own, and that his use of the word \"guys\" came across as an insult. He writes that he learned very quickly how to code-switch based on his social group.\n\nCode-switching is a powerful psychological tool, as well. When an individual uses a group's dialect or accent, the audience is more receptive to the content. As a result, politicians have been known to code-switch to a casual tone around certain groups, with varying degrees of success.\n\nMuch of this political code-switching has been criticized by pundits as pandering to crowds with fake affectations. While some of this might include calculated, disingenuous moves, most of it is simply a natural reaction to being around different groups.\n\n## Code-Switching in a Multicultural World\n\nFrom a linguistic standpoint, code-switching continues to fascinate researchers, as they try to pinpoint the grammatical structure of interchangeably using multiple languages in the same sentence.\n\nSociolinguistically, code-switching is an essential skill to develop in an ever-evolving multicultural world. Adeptly moving from one social group to the next and changing aspects of speech allows us to progress in our professional and personal life while avoiding potentially awkward situations and finding common ground through language.",
    links: [
    {
    title: "Karl Lashley — Harvard Psychology",
    url: "https://psychology.fas.harvard.edu/people/karl-lashley"
    }
  ],
    sources: [],
    tags: [
    "linguistics",
    "culture",
    "identity"
  ],
    heroImageUrl: "https://images.pexels.com/photos/7540089/pexels-photo-7540089.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isPublic: true,
    dateAdded: new Date('2023-11-15')
  },
  {
    id: "language-barriers-healthcare",
    title: "Language Barriers & Disease Treatment",
    category: "Language & Cognition",
    status: "idea",
    excerpt: "Willie Ramirez and the word \"intoxicado\"—how mistranslation causes medical harm, and the case for bilingual care coordination.",
    notes: "Language Barriers and Disease Treatment\n\nNational Breast Cancer Awareness Month: Overcoming Language Barriers to Improve Cancer Care — With October being National Breast Cancer Awareness month, it is important to recognize the importance of preventative care in reducing readmissions hospitalizations. Further, with the context of today, it has become a necessity for healthcare systems to emphasize preventative care through in-language services.\n\n3 Common Medical Translation Mistakes and How to Prevent Them — From routine checkups to medical emergencies, patients count on hospitals to provide excellent treatment. In order to ensure the best quality care, medical professionals must be able to communicate with their patients with the utmost efficiency and accuracy. Healthcare often requires more nuanced conversations that cross cultural boundaries in addition to linguistic ones.\n\n5 Reasons Why You Shouldn't Ignore Bilingual Care Coordination — A complex health system can't survive without care coordination. As the world continues to globalize, care coordination models have had to adjust in order to provide access to sufficient healthcare for members and patients with limited English proficiency (LEP).\n\nNational Immunizations Awareness Month: 7 Ways to Increase your LEP Outreach — With flu season right around the corner, now is the perfect time to start thinking about getting your flu shot. Additionally, with the more contagious COVID-19 Delta variant causing a resurgence in cases and hospitalizations, it is crucial for care systems to emphasize the importance of getting the COVID-19 vaccine.\n\n5 Tips for Effectively Communicating with the Deaf and Hard of Hearing — Communication is essential to many aspects of everyday life, including personal interactions as well as accessing medical treatment and legal assistance. To learn how to more effectively communicate with individuals who are hard of hearing (HOH) or deaf, take these steps. According to the World Health Organization, \"normal\" hearing is thresholds of 20 dB or better in both ears.\n\nThe Connection Between Language Services and Patient Safety — Here at United Language Group, we often emphasize the importance of language translation and interpreting in the medical field. For us, there's a clear-cut rationale behind language access in healthcare: Adequate support for non-native speaking patients results in better health outcomes.\n\nThe Importance of Qualified Medical Interpreters — In 1980 Willie Ramirez was taken to a Florida hospital in a coma. His family members explained to doctors that the 18-year-old was \"intoxicado,\" in Spanish, meaning poisoned. An interpreter misunderstood, instead believing the family meant Ramirez was intoxicated. Medics assisted Ramirez as if he were experiencing a drug overdose, when he was actually suffering from a brain hemorrhage.",
    links: [
    {
    title: "Overcoming Language Barriers to Improve Cancer Care",
    url: "https://www.unitedlanguagegroup.com/blog/national-breast-cancer-awareness-month-overcoming-language-barriers-to-improve-cancer-care"
    },
    {
    title: "3 Common Medical Translation Mistakes",
    url: "https://www.unitedlanguagegroup.com/blog/3-common-medical-translation-mistakes-and-how-to-prevent-them"
    },
    {
    title: "5 Reasons Why You Shouldn't Ignore Bilingual Care Coordination",
    url: "https://www.unitedlanguagegroup.com/blog/5-reasons-why-you-shouldnt-ignore-bilingual-care-coordination"
    },
    {
    title: "7 Ways to Increase your LEP Outreach",
    url: "https://www.unitedlanguagegroup.com/blog/national-immunizations-awareness-month-7-ways-to-increase-your-lep-outreach"
    },
    {
    title: "Communicating with the Deaf and Hard of Hearing",
    url: "https://www.unitedlanguagegroup.com/blog/5-tips-for-effectively-communicating-with-the-deaf-and-hard-of-hearing"
    },
    {
    title: "Language Services and Patient Safety",
    url: "https://www.unitedlanguagegroup.com/blog/connection-between-language-services-and-patient-safety"
    },
    {
    title: "Qualified Medical Interpreters",
    url: "https://www.unitedlanguagegroup.com/blog/the-importance-of-certified-medical-interpreters"
    }
  ],
    sources: [],
    tags: [
    "healthcare",
    "language",
    "equity"
  ],
    heroImageUrl: "https://images.pexels.com/photos/5452230/pexels-photo-5452230.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isPublic: true,
    dateAdded: new Date('2023-11-01')
  },
  {
    id: "hyperlink-thinking-adhd",
    title: "Hyperlink Thinking & ADHD",
    category: "Language & Cognition",
    status: "idea",
    excerpt: "Is non-linear, associative thinking the same as ADHD? Attention as commodity and the architecture of modern distraction.",
    notes: "hyperlink thinking\n\nHyperlink Thinking - Relax and Succeed — Our attention is a commodity that others want to own. It's up to us to decide where we invest it.\n\nADHD: Is It Hyperlink Thinking? — There is no question that those with ADHD have different brain wiring. \"Non-linear thinking\" is a label that many with ADHD use to describe their thinking experience. Using such labels to distinguish the thinking process from the implied and more mainstream linear thinking sounds good, but what does non-linear thinking really look like?\n\nIs There an Increase in ADHD? - CHADD — With a diagnosis rate of nearly 10 percent of children in some areas of the United States, are we really seeing an increase in ADHD in the population? Probably not, say researchers, but it is still possible. Environmental changes in our food and chemical exposures could be affecting prenatal development, and an increasing use of...\n\nWhy Are So Many More Children Being Diagnosed With ADHD Today? — A concerning new study says 1 in 10 American children has ADHD. ADHD, or attention-deficit/hyperactivity disorder, is one of the most common mental health conditions among children in the U.S. And the diagnosis rate of this brain disorder-characterized by a difficulty focusing attention, restlessness, and impulsive behaviors-appears to have increased over the past 20 years, according to a new study published in JAMA.",
    links: [
    {
    title: "Hyperlink Thinking",
    url: "https://relaxandsucceed.com/2016/04/19/hyperlink-thinking/"
    },
    {
    title: "ADHD: Is It Hyperlink Thinking?",
    url: "https://digcoaching.com/hyperlink-thinking/"
    },
    {
    title: "Is There an Increase in ADHD?",
    url: "https://chadd.org/adhd-weekly/is-there-an-increase-in-adhd/"
    },
    {
    title: "Why Are So Many More Children Being Diagnosed With ADHD Today?",
    url: "https://www.self.com/story/adhd-diagnosis-rates-children-increase"
    }
  ],
    sources: [],
    tags: [
    "ADHD",
    "cognition",
    "attention"
  ],
    heroImageUrl: "https://images.pexels.com/photos/8378730/pexels-photo-8378730.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isPublic: true,
    dateAdded: new Date('2023-10-20')
  },
  {
    id: "anwar-sadat-dialect",
    title: "Anwar Sadat's Colloquial Egyptian Dialect",
    category: "Culture & Politics",
    status: "idea",
    excerpt: "Slang in political speech, Mossadegh, and All the Shah's Men—how vernacular language shapes political legitimacy.",
    notes: "Anwar Saadat's use of Colloquial Egyptian Dialect\n\nslang in political speech\n\nMossadeghi\n\nAll the Shah's Men: An American Coup and the Roots of Middle East Terror",
    links: [],
    sources: [
    {
    label: "All the Shah's Men: An American Coup and the Roots of Middle East Terror",
    url: ""
    }
  ],
    tags: [
    "politics",
    "language",
    "Middle East"
  ],
    heroImageUrl: "",
    isPublic: true,
    dateAdded: new Date('2023-10-01')
  },
  {
    id: "literacy-and-logic",
    title: "Literacy and Logic",
    category: "Language & Cognition",
    status: "idea",
    excerpt: "Richard Lanham on the computer as rhetorical device; fuzzy logic and why students need news literacy in the information age.",
    notes: "Literacy and Logic\n\nOpen at the Margins — Naomi Barnes Originally published on October 31, 2019 The computer is a rhetorical device, not just a logical one - Richard Lanham There is a lot of rhetoric hidden by logic in education circles about the Internet and the responsibility teachers have to educate students about what and how to compose online.\n\nFuzzy Logic: Why Students Need News and Information Literacy Skills — Recognizing the need for reliable and appropriate information-locating, evaluating and using it appropriately-has never been easy. Collecting information once involved a trip to the library-a much different experience than a trip along the information highway. The sheer volume and ease with which information is made available makes it appear deceptively simple to find information.",
    links: [
    {
    title: "Open at the Margins — Logic and Rhetoric",
    url: "https://press.rebus.community/openatthemargins/chapter/logic-and-rhetoric-the-problem-with-digital-literacy/"
    },
    {
    title: "Fuzzy Logic: Why Students Need News and Information Literacy Skills",
    url: "http://www.youthmediareporter.org/2010/06/24/fuzzy-logic-why-students-need-news-and-information-literacy-skills/"
    }
  ],
    sources: [],
    tags: [
    "literacy",
    "education",
    "rhetoric",
    "digital"
  ],
    heroImageUrl: "",
    isPublic: true,
    dateAdded: new Date('2023-09-25')
  },
  {
    id: "grasshoppers-islam",
    title: "Grasshoppers in Islam & Literature",
    category: "Culture & Politics",
    status: "idea",
    excerpt: "Locusts in the Quran vs. the Bible, Abraham Cowley's Grasshopper, and symbolism across traditions.",
    notes: "Grasshoppers in Islam\n\nThe Grasshopper by Abraham Cowley — Comments & analysis: Happy insect, what can be / In happiness compared to thee? / Fed with nourishment divine,\n\nWhat Do The Bible And Quran Say About The Locusts? — The Locusts are mentioned in the Bible 36 times and in the Quran two times, i.e., the Bible cites the Locusts 18 times more than the Quran does. Furthermore, the total words of the Bible are 788,280 while the total words of the Quran are 77,473.\n\nLocusts in the Quran - OnePath Network — Miracles in the Quran - Locusts in The Quran The Quran is filled with numerous miracles and features that all attest to its authenticity as the book of God. Amongst these features is the Quran's remarkable use of language when describing certain occurrences and events.\n\nGrasshopper Symbolism & Meaning (+Totem, Spirit & Omens) - World Birds — Are you uncertain about what you should do next? Grasshopper symbolism has entered your life to entice you into taking that risk. All you need is a leap of faith and know that the locust is here to make sure everything goes well. So let's find out about the locust's teachings and improve our lives.\n\nGrasshoppers' meaning is linked to our inner voice, higher selves and are a sign to listen to what the spirit world has to say.",
    links: [
    {
    title: "The Grasshopper by Abraham Cowley",
    url: "https://allpoetry.com/poem/8465821-The-Grasshopper-by-Abraham-Cowley"
    },
    {
    title: "What Do The Bible And Quran Say About The Locusts?",
    url: "https://www.streetdirectory.com/etoday/-ucuefe.html"
    },
    {
    title: "Locusts in the Quran",
    url: "https://onepathnetwork.com/locusts-in-the-quran/"
    },
    {
    title: "Grasshopper Symbolism & Meaning",
    url: "https://worldbirds.com/grasshopper-symbolism/"
    }
  ],
    sources: [],
    tags: [
    "religion",
    "literature",
    "comparative"
  ],
    heroImageUrl: "",
    isPublic: true,
    dateAdded: new Date('2023-09-15')
  },
  {
    id: "hiv-immunity-research",
    title: "HIV Immunity & Citizen Science",
    category: "Science & Society",
    status: "idea",
    excerpt: "How people researched HIV immunity themselves—the CCR5 delta-32 mutation and community-driven discovery.",
    notes: "HIV immunity and How people researched it themselves\n\nMark Hauser- Harvard Rheus Monkeys",
    links: [],
    sources: [],
    tags: [
    "HIV",
    "genetics",
    "citizen science"
  ],
    heroImageUrl: "",
    isPublic: true,
    dateAdded: new Date('2023-09-01')
  },
  {
    id: "vampire-bats-altruism",
    title: "Vampire Bats & Reciprocal Altruism",
    category: "Science & Society",
    status: "idea",
    excerpt: "Prisoner's dilemma, amygdala gender differences, sickle cell/malaria tradeoffs, and naked mole rat colonies.",
    notes: "Prisoner's Dilemma: Amygdala Gender Differences\n\nChildren in African Countries run the risk of sickle cell Anaemia/malaria for blood transfusions. Increased risk of HIV.\n\nVampire Bats: Reciprocal Altruism\n\nsickle back fish\n\nnaked mole art colonies",
    links: [],
    sources: [],
    tags: [
    "biology",
    "evolution",
    "ethics"
  ],
    heroImageUrl: "",
    isPublic: true,
    dateAdded: new Date('2023-08-15')
  },
  {
    id: "mycorrhizae-symbiosis",
    title: "Mycorrhizae — Symbiotic Fungi and Plants",
    category: "Science & Society",
    status: "idea",
    excerpt: "Hidden partners beneath the soil: how mycorrhizal fungi make most land plants possible—and parallels with insect-bacteria symbiosis.",
    notes: "Mycorrhizae are symbiotic relationships that form between fungi and plants\n\nNYBG.org: Hidden Partners: Mycorrhizal Fungi and Plants — Hidden Partners: Mycorrhizal Fungi and Plants NYBG Herbarium Intern Matthew Pace What are Mycorrhizae? If you have ever enjoyed the shade of an oak, decorated a pine, spruce or Douglas fir as a Christmas tree, admired the beauty of an orchid, or eaten a blueberry or chanterelle mushroom, you have benefited from the hidden world of mycorrhizal fungi, a world which makes the survival of most of earth's land plants possible.\n\nA symbiotic way of life: 'Simple and elegant mechanism' regulates relationships between insects and bacteria — Symbiosis is the process that occurs when two different organisms live together to form a mutually beneficial partnership. In many symbiotic relationships, host animals and their microbial symbionts are partners that make up a whole -- neither one can function without the other but together they grow and reproduce.",
    links: [
    {
    title: "Hidden Partners: Mycorrhizal Fungi and Plants",
    url: "https://sciweb.nybg.org/science2/hcol/mycorrhizae.asp.html"
    },
    {
    title: "A symbiotic way of life: insects and bacteria",
    url: "https://www.sciencedaily.com/releases/2014/05/140505155339.htm"
    }
  ],
    sources: [],
    tags: [
    "biology",
    "symbiosis",
    "ecology",
    "fungi"
  ],
    heroImageUrl: "",
    isPublic: true,
    dateAdded: new Date('2023-08-10')
  },
  {
    id: "documentary-actuality",
    title: "Documentary as \"Creative Treatment of Actuality\"",
    category: "Media & Culture",
    status: "idea",
    excerpt: "John Grierson's definition of documentary film—language falling apart in the face of human reality (Anfal, banana republics).",
    notes: "John Gierson describe documentary film as creature treatment of actuality\n\nLanguage kind of falls apart in the face of human reality. Anfal and the massacre of Bananas\n\nreal madness is us being dislocated with the reality",
    links: [],
    sources: [],
    tags: [
    "documentary",
    "media",
    "politics"
  ],
    heroImageUrl: "https://images.pexels.com/photos/67654/pexels-photo-67654.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isPublic: true,
    dateAdded: new Date('2023-08-01')
  },
  {
    id: "banana-republic-oil-republic",
    title: "Banana Republic — Oil Republic",
    category: "Culture & Politics",
    status: "idea",
    excerpt: "Business entities that do the colonization—corporate power shaping nation-states from Central America to the Middle East.",
    notes: "Banana Republic-Oil Republic (Business entities that do the colonization)",
    links: [],
    sources: [],
    tags: [
    "politics",
    "colonialism",
    "economics",
    "corporations"
  ],
    heroImageUrl: "",
    isPublic: true,
    dateAdded: new Date('2023-07-25')
  },
  {
    id: "atwood-procrastination",
    title: "Margaret Atwood & Productive Procrastination",
    category: "Writing Craft",
    status: "idea",
    excerpt: "A master procrastinator who never misses deadlines—mood regulation and the craft of showing up.",
    notes: "Margaret Atwood is a master procrastinator but she doesn't miss deadlines\n\nabout mood regulation",
    links: [],
    sources: [],
    tags: [
    "writing",
    "creativity",
    "productivity"
  ],
    heroImageUrl: "https://images.pexels.com/photos/19052584/pexels-photo-19052584.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isPublic: true,
    dateAdded: new Date('2023-07-15')
  },
  {
    id: "ibn-khalakan",
    title: "Ibn Khalakan",
    category: "History & Culture",
    status: "idea",
    excerpt: "Research thread on Ibn Khalakan—biographical dictionary tradition and medieval Islamic historiography.",
    notes: "Ibn Khalakan",
    links: [],
    sources: [],
    tags: [
    "Islamic history",
    "biography",
    "medieval"
  ],
    heroImageUrl: "",
    isPublic: true,
    dateAdded: new Date('2023-07-01')
  },
  {
    id: "sharing-economy-gig-economy",
    title: "Sharing Economy vs. Gig Economy",
    category: "Science & Society",
    status: "idea",
    excerpt: "Distinguishing collaborative consumption rhetoric from precarious labor platforms—the language and economics of the \"sharing\" economy.",
    notes: "Sharing economy vs. Gig Economy",
    links: [],
    sources: [],
    tags: [
    "economics",
    "labor",
    "technology",
    "platforms"
  ],
    heroImageUrl: "",
    isPublic: true,
    dateAdded: new Date('2023-06-20')
  },
  {
    id: "brendan-bohannan-biodiversity",
    title: "Brendan Bohannan — Rock-Paper-Scissors Biodiversity",
    category: "Science & Society",
    status: "idea",
    excerpt: "Rock-paper-scissors dynamics in microbial communities—Bohannan's work on biodiversity maintenance and spatial structure.",
    notes: "Brendan Bohannan: Rock-paper Scenario/ biodiversity",
    links: [],
    sources: [],
    tags: [
    "biology",
    "biodiversity",
    "ecology",
    "microbiology"
  ],
    heroImageUrl: "",
    isPublic: true,
    dateAdded: new Date('2023-06-10')
  },
  {
    id: "meningitis-mecca",
    title: "Spread of Meningitis in Mecca",
    category: "History & Medicine",
    status: "idea",
    excerpt: "Mass gathering epidemiology—the Hajj as a node for meningococcal disease transmission and public health response.",
    notes: "Spread of Meningitis in Mecca",
    links: [],
    sources: [],
    tags: [
    "public health",
    "epidemiology",
    "Hajj",
    "medicine"
  ],
    heroImageUrl: "",
    isPublic: true,
    dateAdded: new Date('2023-06-01')
  },
  {
    id: "antibiotic-resistance-transmission",
    title: "Vertical and Horizontal Transmission of Antibiotic Resistance",
    category: "Science & Society",
    status: "idea",
    excerpt: "How antibiotic resistance spreads through vertical inheritance and horizontal gene transfer—and what that means for clinical and agricultural policy.",
    notes: "Vertical and horizontal transmissions and their roles in antibiotic resistance",
    links: [],
    sources: [],
    tags: [
    "antibiotics",
    "microbiology",
    "public health",
    "genetics"
  ],
    heroImageUrl: "",
    isPublic: true,
    dateAdded: new Date('2023-05-20')
  },
  ...seedStubs.map((s) => ({
    ...s,
    links: s.links || [],
    sources: s.sources || [],
    heroImageUrl: s.heroImageUrl || '',
    isPublic: true,
    dateAdded: s.dateAdded || new Date('2023-01-01'),
  })),
];

const categories = [...new Set(ideas.map(i => i.category))].sort();

function getAll(filters = {}) {
  let items = [...ideas];
  if (filters.category) items = items.filter(i => i.category === filters.category);
  if (filters.status) items = items.filter(i => i.status === filters.status);
  return items.sort((a, b) => b.dateAdded - a.dateAdded);
}

function getById(id) {
  return ideas.find(i => i.id === id) || null;
}

function getCategories() {
  return categories;
}

function groupByCategory() {
  const groups = {};
  getAll().forEach(idea => {
    if (!groups[idea.category]) groups[idea.category] = [];
    groups[idea.category].push(idea);
  });
  return groups;
}

module.exports = { ideas, getAll, getById, getCategories, groupByCategory };
