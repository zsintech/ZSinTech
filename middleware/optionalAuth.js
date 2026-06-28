const { admin, isConfigured } = require('../firebase-admin');

async function optionalAuth(req, res, next) {
  res.locals.isAdmin = false;
  res.locals.adminUser = null;

  const token = req.cookies?.session;
  if (!token || !isConfigured) return next();

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    res.locals.isAdmin = true;
    res.locals.adminUser = decoded;
  } catch {
    res.clearCookie('session');
  }
  next();
}

module.exports = { optionalAuth };
