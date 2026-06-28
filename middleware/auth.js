const { admin } = require('../firebase-admin');

async function requireAuth(req, res, next) {
  const token = req.cookies.session;
  if (!token) return res.redirect('/login');

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    res.clearCookie('session');
    res.redirect('/login');
  }
}

module.exports = { requireAuth };
