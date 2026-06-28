const { normalizePexelsResult } = require('../utils/images');

let _openai;
function getOpenAI() {
  if (!_openai) {
    _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || 'missing' });
  }
  return _openai;
}

async function extractKeywords(title, excerpt) {
  try {
    const response = await getOpenAI().chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You extract 1-2 visual search keywords for finding a relevant stock photo. Return ONLY the keywords, nothing else. Make them concrete and visual (objects, scenes, textures).',
        },
        {
          role: 'user',
          content: `Title: ${title}\nExcerpt: ${excerpt || ''}`,
        },
      ],
      max_tokens: 20,
      temperature: 0.3,
    });
    return response.choices[0].message.content.trim();
  } catch (err) {
    console.error('OpenAI keyword extraction failed:', err.message);
    return title.split(' ').slice(0, 2).join(' ');
  }
}

async function searchPexels(query) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`;

  const response = await fetch(url, {
    headers: { Authorization: process.env.PEXELS_API_KEY },
  });

  if (!response.ok) {
    throw new Error(`Pexels API error: ${response.status}`);
  }

  const data = await response.json();
  if (!data.photos || data.photos.length === 0) return null;

  const photo = data.photos[0];
  return normalizePexelsResult({
    url: photo.src.large2x || photo.src.large,
    photographer: photo.photographer,
    pexelsId: photo.id,
  }, 'hero');
}

async function fetchImage(title, excerpt) {
  if (!process.env.PEXELS_API_KEY) return null;

  try {
    const keywords = await extractKeywords(title, excerpt);
    const image = await searchPexels(keywords);
    return image;
  } catch (err) {
    console.error('Image pipeline failed:', err.message);
    return null;
  }
}

module.exports = { fetchImage, extractKeywords, searchPexels };
