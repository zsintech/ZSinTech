document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
  }

  const header = document.getElementById('site-header');
  if (!header) return;

  let lastY = window.scrollY;
  let ticking = false;

  function onScroll() {
    const y = window.scrollY;
    if (y > 80 && y > lastY) {
      header.classList.add('nav-hidden');
    } else {
      header.classList.remove('nav-hidden');
    }
    lastY = y;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
});
