<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own.

- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **Secrets.** Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Backend
- The backend is the project's own Supabase project (ref `ikpmacrsqrfotfdztkra`). Schema changes are made in that Supabase project.
- The only Supabase client is `src/integrations/supabase/client.ts`; it reads `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` from `import.meta.env`. Never hardcode URLs or keys, and never ship a secret/service-role key to the browser.

## Application conventions
- Use PascalCase for new shared React component filenames; TanStack route filenames retain route conventions so generation stays valid.
- Keep one root auth subscriber and shared auth context; use the protected pathless layout for private pages to prevent competing session guards.
- Keep styling in global semantic tokens and shared components so the landing page and account pages remain consistent.
