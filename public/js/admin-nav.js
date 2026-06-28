document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('.admin-sidebar');
  const toggle = document.querySelector('.admin-mobile-toggle');
  const overlay = document.querySelector('.admin-sidebar-overlay');

  function openSidebar() {
    sidebar?.classList.add('open');
    overlay?.classList.add('visible');
    toggle?.setAttribute('aria-expanded', 'true');
    document.body.classList.add('admin-nav-open');
  }

  function closeSidebar() {
    sidebar?.classList.remove('open');
    overlay?.classList.remove('visible');
    toggle?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('admin-nav-open');
  }

  toggle?.addEventListener('click', () => {
    if (sidebar?.classList.contains('open')) closeSidebar();
    else openSidebar();
  });

  overlay?.addEventListener('click', closeSidebar);

  sidebar?.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 1024px)').matches) closeSidebar();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSidebar();
  });
});
