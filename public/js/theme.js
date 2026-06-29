document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  function getTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }

  toggle.addEventListener('click', () => {
    setTheme(getTheme() === 'dark' ? 'light' : 'dark');
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
});
