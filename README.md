# wxu-library

Vue 3 and Vite library application prepared for the Week 11 Cloudflare Pages
hosting exercise.

## Requirements

- Node.js 22.18.0 (see `.node-version`)
- npm
- Firebase Web configuration values used by the existing authentication features
- An OpenWeather API key for `/WeatherCheck`

## Local setup

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Replace the placeholder values in `.env.local`. This file is ignored by Git and
must not be committed.

## Production build

```sh
npm run build
```

The output directory is `dist`.

## GitHub to Cloudflare Pages

In Cloudflare, open **Workers & Pages**, create a Pages application, connect the
GitHub repository, and use these settings:

- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: repository root

Add the variables listed in `.env.example` to the Cloudflare Pages build
environment. A push to `main` will then trigger the connected Git deployment.

Cloudflare Pages automatically treats a project without a top-level `404.html`
as a single-page application, so Vue Router routes such as `/WeatherCheck` fall
back to the application entry point without a custom redirect file.

## IDE deployment with C3 and Wrangler

The Week 11 studio uses C3 to create a new Pages/Vue project. Run the command
from the parent directory, not inside this existing project:

```sh
npm create cloudflare@latest -- INITIALS-library --framework=vue --platform=pages
```

C3 scaffolds a separate project, installs Wrangler, and offers to deploy it.
That interactive deployment is the C3 step shown in the studio instructions.

This existing repository contains the equivalent minimal Wrangler configuration
needed for later IDE deployments. After logging in and checking the project name
in `wrangler.jsonc`, run:

```sh
npm run build
npm run deploy
```

`npm run deploy` changes Cloudflare state. Do not run it until the deployment is
approved.

## Firebase rules and local Emulator

Firebase Cloud Functions are stored in `firebase-functions/` because Cloudflare
reserves a root `functions/` directory for Pages Functions. Their original
business logic and dependencies are unchanged.

`firebase.json` references the production `firestore.rules`. These rules allow
signed-in Firebase users to read and write the existing `books` collection;
other collections are denied by default.

The open rules in `firestore.emulator.rules` are local-only. To use them, start
the Emulator Suite with the separate configuration:

```sh
firebase emulators:start --config firebase.emulator.json
```

Never deploy with `firebase.emulator.json`. A future production rules deployment
must use `firebase.json` and requires separate approval.

## Week 11 evidence

After approved deployments, collect:

1. The live Pages project link.
2. A clear Cloudflare screenshot showing the Git deployment.
3. A clear Cloudflare or terminal screenshot showing the IDE/C3 deployment.
4. A screenshot of `/WeatherCheck` successfully displaying weather with the
   complete browser address bar visible.
