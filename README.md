# Pixel-Perfect Replica

Implement exactly the screenshot and nothing else

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/80687b5e-0bfd-42b6-9c26-1903a6d363c0).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Static SPA build (Vercel)

The app is a plain Vite + React single-page app with client-side routing (React Router).

- `npm run build` emits static files to `dist/`.
- `vercel.json` rewrites every path to `index.html`, so deep links such as `/app` resolve in the browser.

## Backend (Supabase)

The app talks to our own Supabase project (`flight-price-notifier-001`, ref `ikpmacrsqrfotfdztkra`) through a single client in `src/integrations/supabase/client.ts`. It reads two Vite env vars:

| Variable | Value |
| --- | --- |
| `VITE_SUPABASE_URL` | `https://ikpmacrsqrfotfdztkra.supabase.co` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | the project's `sb_publishable_*` key (browser-safe, RLS-gated) |

Locally they come from `.env` (see `.env.example`). On Vercel, add both under Project Settings → Environment Variables; they are baked in at build time, so redeploy after changing them.
