const admin = require('firebase-admin');

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY
  ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  : undefined;

const isConfigured = Boolean(projectId && clientEmail && privateKey);

if (isConfigured) {
  admin.initializeApp({
    credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
  });
} else {
  console.warn('Firebase credentials not configured — running in skeleton mode.');
}

const db = isConfigured ? admin.firestore() : null;

module.exports = { admin, db, isConfigured };
