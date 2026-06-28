const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const SHORT_MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

function toDate(timestamp) {
  if (!timestamp) return null;
  if (timestamp._seconds) return new Date(timestamp._seconds * 1000);
  if (timestamp.toDate) return timestamp.toDate();
  return new Date(timestamp);
}

function formatDate(timestamp, style = 'short') {
  const date = toDate(timestamp);
  if (!date) return '';

  const day = date.getDate();
  const month = style === 'long' ? MONTHS[date.getMonth()] : SHORT_MONTHS[date.getMonth()];
  const year = date.getFullYear();

  if (style === 'month') return `${MONTHS[date.getMonth()]} ${year}`;
  return `${day} ${month} ${year}`;
}

function groupByMonth(items, dateField = 'dateAdded') {
  const groups = {};
  for (const item of items) {
    const date = toDate(item[dateField]);
    if (!date) continue;
    const key = `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
  }
  return groups;
}

module.exports = { formatDate, groupByMonth, toDate };
