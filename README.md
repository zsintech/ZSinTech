# ZsinTech

Personal Web OS — a private notebook and public portfolio built with Express, EJS, and Firebase.

## Quick Start

1. **Set up Firebase**: Create a Firebase project, enable Authentication (email/password) and Firestore.
2. **Configure environment**: Copy `.env.example` to `.env` and fill in your Firebase credentials.
3. **Install dependencies**: `npm install`
4. **Run locally**: `npm run dev`
5. **Seed content**: `npm run seed` (requires valid Firebase credentials)

## Architecture

- **Backend**: Node.js + Express
- **Templating**: EJS (server-side rendering)
- **Database**: Firebase Firestore
- **Auth**: Firebase Authentication (single owner, email/password)
- **Images**: Pexels API + OpenAI keyword extraction pipeline
- **Hosting**: Render

## Structure

```
app.js                 — Express entry point
firebase-admin.js      — Admin SDK initialization
middleware/auth.js     — Session cookie verification
routes/public.js       — Public portfolio routes
routes/admin.js        — Private dashboard CRUD routes
views/                 — EJS templates (public, admin, auth, partials)
public/css/            — main.css (public) + admin.css (dashboard)
public/js/             — Client-side scripts
services/              — Image pipeline (OpenAI + Pexels)
utils/                 — Markdown, dates, tags, slug helpers
scripts/seed.js        — Content seeder
```

## Deployment

Configure `render.yaml` and set environment variables in Render dashboard. Push to GitHub and connect to Render for automatic deploys.
