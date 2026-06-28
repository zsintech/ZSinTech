// Firebase client SDK initialization — values injected from server via EJS
// This file is loaded from the login page which passes config as a data attribute
(function() {
  const configEl = document.getElementById('firebase-config');
  if (!configEl) return;

  const config = JSON.parse(configEl.dataset.config);

  const app = firebase.initializeApp(config);
  window.firebaseAuth = firebase.auth(app);
})();
