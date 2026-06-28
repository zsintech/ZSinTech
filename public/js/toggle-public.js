document.addEventListener('DOMContentLoaded', () => {
  const contentCollections = new Set([
    'writing_ideas', 'research_papers', 'iconic_bitch', 'articles_read',
    'journalism', 'popsci_reels', 'solo_dates',
  ]);

  document.querySelectorAll('.toggle-public-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const { collection, id } = btn.dataset;
      const base = contentCollections.has(collection)
        ? `/admin/content/${collection}/${id}/toggle-public`
        : `/admin/${collection}/${id}/toggle-public`;
      try {
        const res = await fetch(base, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        if (data.success) {
          btn.classList.toggle('is-public', data.isPublic);
          const isEmojiOnly = btn.textContent.trim().length <= 2;
          btn.textContent = data.isPublic
            ? (isEmojiOnly ? '🌐' : '🌐 Public')
            : (isEmojiOnly ? '🔒' : '🔒 Private');
        }
      } catch (err) {
        console.error('Toggle failed:', err);
      }
    });
  });
});
