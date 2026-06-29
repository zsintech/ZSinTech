// Curated hero images — Khasa photos match storiesofkhasa.xyz archive (Pexels)

const KHASA = {
  hero: 'https://images.pexels.com/photos/38210595/pexels-photo-38210595.jpeg?auto=compress&cs=tinysrgb&w=1920',
  riverA: 'https://images.pexels.com/photos/38210591/pexels-photo-38210591.jpeg?auto=compress&cs=tinysrgb&w=1920',
  riverB: 'https://images.pexels.com/photos/38210589/pexels-photo-38210589.jpeg?auto=compress&cs=tinysrgb&w=1920',
  field: 'https://images.pexels.com/photos/38210172/pexels-photo-38210172.jpeg?auto=compress&cs=tinysrgb&w=1920',
  banks: 'https://images.pexels.com/photos/38210586/pexels-photo-38210586.jpeg?auto=compress&cs=tinysrgb&w=1920',
};

const BY_ID = {
  'stories-of-khasa-launch': KHASA.hero,
  'stories-of-khasa': KHASA.hero,
  'khasa-river-research': KHASA.riverA,
  'natgeo-khasa-externship': KHASA.field,
};

module.exports = {
  KHASA,
  BY_ID,
  siteHero: KHASA.hero,
};
