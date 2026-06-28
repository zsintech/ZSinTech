#!/usr/bin/env node
/**
 * Reads Firebase service account JSON + Management API config,
 * updates .env (local only — never commit .env).
 */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

const ROOT = path.join(__dirname, '..');
const ENV_PATH = path.join(ROOT, '.env');

function findServiceAccount() {
  const files = fs.readdirSync(ROOT).filter(f => f.includes('firebase-adminsdk') && f.endsWith('.json'));
  if (!files.length) throw new Error('No *-firebase-adminsdk-*.json in project root');
  return require(path.join(ROOT, files[0]));
}

function upsertEnv(lines, key, value) {
  const idx = lines.findIndex(l => l.startsWith(`${key}=`));
  const line = `${key}=${value}`;
  if (idx >= 0) lines[idx] = line;
  else lines.push(line);
  return lines;
}

async function fetchWebConfig(sa, cred) {
  const token = await cred.getAccessToken();
  const listRes = await fetch(
    `https://firebase.googleapis.com/v1beta1/projects/${sa.project_id}/webApps`,
    { headers: { Authorization: `Bearer ${token.access_token}` } }
  );
  const list = await listRes.json();
  const app = list.apps?.[0];
  if (!app) throw new Error('No Firebase web app found — add one in Firebase Console');

  const cfgRes = await fetch(
    `https://firebase.googleapis.com/v1beta1/projects/${sa.project_id}/webApps/${app.appId}/config`,
    { headers: { Authorization: `Bearer ${token.access_token}` } }
  );
  return cfgRes.json();
}

async function main() {
  const sa = findServiceAccount();
  const cred = admin.credential.cert(sa);
  if (!admin.apps.length) {
    admin.initializeApp({ credential: cred });
  }

  const web = await fetchWebConfig(sa, cred);
  const users = await admin.auth().listUsers(1);
  const owner = users.users[0];

  const privateKeyOneLine = `"${sa.private_key.replace(/\n/g, '\\n')}"`;

  let lines = fs.existsSync(ENV_PATH)
    ? fs.readFileSync(ENV_PATH, 'utf8').split(/\r?\n/)
    : [];

  lines = upsertEnv(lines, 'FIREBASE_PROJECT_ID', sa.project_id);
  lines = upsertEnv(lines, 'FIREBASE_CLIENT_EMAIL', sa.client_email);
  lines = upsertEnv(lines, 'FIREBASE_PRIVATE_KEY', privateKeyOneLine);
  lines = upsertEnv(lines, 'FIREBASE_API_KEY', web.apiKey);
  lines = upsertEnv(lines, 'FIREBASE_AUTH_DOMAIN', web.authDomain);
  lines = upsertEnv(lines, 'FIREBASE_STORAGE_BUCKET', web.storageBucket);
  lines = upsertEnv(lines, 'FIREBASE_MESSAGING_SENDER_ID', web.messagingSenderId);
  lines = upsertEnv(lines, 'FIREBASE_APP_ID', web.appId);
  if (owner) {
    lines = upsertEnv(lines, 'FIREBASE_OWNER_UID', owner.uid);
  }

  fs.writeFileSync(ENV_PATH, lines.filter((l, i, arr) => l !== '' || i < arr.length - 1).join('\n') + '\n');
  console.log('Updated .env with Firebase credentials');
  console.log(`Owner: ${owner?.email || 'none'} (${owner?.uid || 'n/a'})`);
  console.log(`Web app: ${web.appId}`);
}

main().catch(err => {
  console.error(err.message);
  process.exit(1);
});
