/** Parse isPublic from form body (checkbox + hidden input may send array). */
function parseIsPublic(val) {
  if (val === true || val === 'true') return true;
  if (Array.isArray(val)) return val.some(v => v === true || v === 'true');
  return false;
}

module.exports = { parseIsPublic };
