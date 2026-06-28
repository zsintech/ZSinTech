function parseTags(input) {
  if (!input) return [];
  if (Array.isArray(input)) return input.filter(Boolean);
  return input.split(',').map(t => t.trim()).filter(Boolean);
}

function joinTags(tags) {
  if (!tags || !Array.isArray(tags)) return '';
  return tags.join(', ');
}

module.exports = { parseTags, joinTags };
