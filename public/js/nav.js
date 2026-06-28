document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle for public site
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
  }

  // Admin sidebar toggle on mobile
  const sidebar = document.querySelector('.admin-sidebar');
  if (sidebar && window.innerWidth <= 900) {
    const btn = document.createElement('button');
    btn.className = 'sidebar-mobile-toggle';
    btn.textContent = '☰';
    btn.setAttribute('aria-label', 'Toggle sidebar');
    document.body.prepend(btn);
    btn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }
});
