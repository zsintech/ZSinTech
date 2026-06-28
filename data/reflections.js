// Static reflections — used when Firestore is unavailable
// Source: LinkedIn post on A Philosophy of Software Design by John Ousterhout

const reflections = [
  {
    id: 'philosophy-of-software-design',
    title: 'Reflections on A Philosophy of Software Design',
    body: `This is not a required reading in our Software Design class, but it is a highly highly recommended one, and now that I finished reading it I can see why. This class is one that I was lucky enough to postpone to my last semester after I took all my electives and advanced programming classes. Its a class that provided me with great insights but also just a general observation I want to share in hopes of compelling you to read the book: A Philosophy of Software Design by John Ousterhout

The experience prompted me to think about how different software engineering is from other fields. Students of law, medicine or philosophy are expected to read works that frame how they think about their discipline. In software engineering the tacit assumption is that design judgement comes "on the job"; many developers never read a single book about their craft. In fact, some prominent voices argue that the internet has made books obsolete and that programmers mostly learn by writing code while consulting online resources. This is the cultural backdrop against which Ousterhout's book lands.

We are insistently taught that software design is a problem of managing complexity and that good design demands taking on work so that others don't have to. In perspective though, Ousterhout notes that "most modules have more users than developers" and therefore it is better for the developer to suffer than for the user. This principle underlies his famous mantra that "it is more important for a module to have a simple interface than a simple implementation". He demonstrates this with experiments from his classes, but what I found fun to discern was that the book also implicitly answers a broader question: Why bother reading theory if software changes so quickly? One answer is that design principles do not change as fast as tools. Another answer lies outside software engineering altogether. Recent work arguing that engineers should study philosophy notes that philosophical training "trains the mind in critical thinking, logic, and the formation of clear, structured arguments. These are skills that are invaluable". These authors also observe that critical thinking becomes more important as AI systems democratise knowledge and lower the barriers to obtaining information. In other words, engineers who can reason from first principles will have an advantage over those who only know the "how."`,
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
