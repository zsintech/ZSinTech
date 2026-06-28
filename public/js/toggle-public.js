document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.toggle-public-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const { collection, id } = btn.dataset;
      try {
        const res = await fetch(`/admin/${collection}/${id}/toggle-public`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        if (data.success) {
          btn.classList.toggle('is-public', data.isPublic);
          btn.textContent = data.isPublic ? '🌐 Public' : '🔒 Private';
        }
      } catch (err) {
        console.error('Toggle failed:', err);
      }
    });
  });
});
