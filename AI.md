# AI notes

## Setup

- **AI tool:** OpenAI Codex desktop, connected to the Storyblok Management API through Storyblok’s MCP server.
- **Model:** GPT-6 (Codex session model).
- **Frontend:** Astro with Storyblok’s official Astro integration. The local article Markdown was imported into Storyblok stories; it is not copied into this repository.

## Prompts that did the most work

1. **MCP-connected content task (summarized from the request):** “Use the five Markdown grammar notes and `index.json` as the source of truth. Create Article stories with the full Markdown, category, and slug; build a nested Article listing with cards linked to those stories on Home. Keep the stories as drafts.”
2. **Article and banner mapping:** “In my local grammar-notes folder, there are five Markdown articles and a `banners` folder. The banners and articles are linked together in `index.json`.” (The absolute local path is omitted from this public copy.)
3. **Frontend task (summarized from the take-home brief):** “Build a small Astro frontend that renders the Storyblok stories and nested article cards, supports Visual Editor live preview, and explains how to run it.”

## What I changed by hand

The article bodies were imported as Markdown, with the YAML front matter removed from `subordinate-clauses.md`; its title, slug, and category come from `index.json`. The card summaries were written for this demo from each article’s subject. The generated Astro starter command could not access its cache directory, so I created a minimal Astro project structure directly. A build issue came from npm installing a newer Vite as a peer of the HTTPS certificate plugin; pinning the project to Astro’s compatible Vite 6 dependency fixed the build.

## Where the assistant got stuck or needed a correction

1. **Banner upload:** `upload_asset` returned “Authentication required” even though the same Storyblok connection could read and create components and stories. I noticed the error before an asset record was created. The five stories therefore have empty Banner fields. A clearer MCP error that distinguished missing upload permission from a tool authentication problem would have helped; the current workaround is to upload the JPGs in Storyblok’s Assets area and select them in the Article stories.
2. **Home preview path:** The Home story’s slug is `home`, while the site renders Home at `/`. I checked Storyblok’s Visual Editor guidance and set the story’s real path to `/`, so the editor can preview the correct route.
3. **Filename and slug mismatch:** `index.json` uses `perfective-vs-imperfective`, while the Markdown and banner filenames use `perfective-imperfective`. I followed the explicit index mapping for the story slug and card link. Keeping filenames and slugs consistent would make this mapping less error-prone.

## Review

All five article stories and the nested Home listing are drafts. I checked the returned Storyblok records and confirmed the five card links point to the five Article story UUIDs. The Astro production build completed. The live Visual Editor still needs a local Preview access token in `.env` and the five JPGs need to be attached to their stories before the image previews can be shown.
