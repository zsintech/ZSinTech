#!/usr/bin/env node
/** Output Firebase env vars for Render (reads from .env). */
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const keys = [
  'FIREBASE_PROJECT_ID',
  'FIREBASE_CLIENT_EMAIL',
  'FIREBASE_PRIVATE_KEY',
  'FIREBASE_API_KEY',
  'FIREBASE_AUTH_DOMAIN',
  'FIREBASE_STORAGE_BUCKET',
  'FIREBASE_MESSAGING_SENDER_ID',
  'FIREBASE_APP_ID',
  'FIREBASE_OWNER_UID',
];
const out = {};
for (const k of keys) {
  out[k] = process.env[k] || '';
}
require('fs').writeFileSync(
  require('path').join(__dirname, '..', '.render-env-sync.json'),
  JSON.stringify(out)
);
console.log('Wrote .render-env-sync.json');
