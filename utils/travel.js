function parseTripFields(data) {
  if (data.linksJson) {
    try { data.links = JSON.parse(data.linksJson); } catch { data.links = []; }
    delete data.linksJson;
  }
  if (data.checklistJson) {
    try { data.checklist = JSON.parse(data.checklistJson); } catch { data.checklist = []; }
    delete data.checklistJson;
  }
  if (!data.links) data.links = [];
  if (!data.checklist) data.checklist = [];
  return data;
}

function serializeTripForForm(item) {
  if (!item) return item;
  return {
    ...item,
    linksJson: JSON.stringify(item.links || [], null, 2),
    checklistJson: JSON.stringify(item.checklist || [], null, 2),
  };
}

module.exports = { parseTripFields, serializeTripForForm };
