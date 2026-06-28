document.addEventListener('DOMContentLoaded', () => {
  const textarea = document.getElementById('body-input');
  const preview = document.getElementById('markdown-preview');
  const toggleBtn = document.getElementById('preview-toggle');

  if (!textarea || !preview || !toggleBtn) return;

  let showingPreview = false;

  toggleBtn.addEventListener('click', () => {
    showingPreview = !showingPreview;
    if (showingPreview) {
      preview.innerHTML = marked.parse(textarea.value || '');
      preview.style.display = 'block';
      textarea.style.display = 'none';
      toggleBtn.textContent = 'Edit';
    } else {
      preview.style.display = 'none';
      textarea.style.display = 'block';
      toggleBtn.textContent = 'Preview';
    }
  });
});
