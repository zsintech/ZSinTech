const TO_READ = new Set(['to-read', 'want-to-read', 'reading', 'want-to-take', 'in-progress']);
const HAVE_READ = new Set(['have-read', 'finished', 'read', 'completed', 'watched']);

function isToRead(status) {
  return TO_READ.has(status);
}

function isHaveRead(status) {
  return HAVE_READ.has(status);
}

function splitByReadingStatus(items) {
  const toRead = [];
  const haveRead = [];
  for (const item of items) {
    if (isHaveRead(item.status)) haveRead.push(item);
    else toRead.push(item);
  }
  return { toRead, haveRead };
}

function readingStatusLabel(status) {
  if (isHaveRead(status)) return 'have read';
  return 'to read';
}

module.exports = { TO_READ, HAVE_READ, isToRead, isHaveRead, splitByReadingStatus, readingStatusLabel };
