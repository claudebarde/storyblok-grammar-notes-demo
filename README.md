# Modern Sumerian Grammar Notes

A small Astro site backed by Storyblok. The Home story lists five grammar articles. Each card links to an Article story, whose body is stored as Markdown in Storyblok.

## Run locally

Requirements: Node.js 22.12 or newer and npm.

1. Clone the repository and install dependencies:

   ```sh
   npm install
   ```

2. Copy `.env.example` to `.env`. In Storyblok, open **Settings → Access Tokens** and copy the **Preview** token into `STORYBLOK_DELIVERY_API_TOKEN`. Keep `.env` private; it is ignored by Git.

3. Start the local HTTPS preview:

   ```sh
   npm run dev
   ```

4. Open `https://localhost:4321`. The first run may ask you to trust the local development certificate.

The stories in this demo are drafts, so the app requests `version: "draft"`. In Storyblok, set **Settings → Visual Editor → Location (default environment)** to `https://localhost:4321`. In the Home story’s **Config** tab, set **Real path** to `/`.

To create a production build, run `npm run build`. The project uses Astro’s Node adapter; the standalone server entry point is `dist/server/entry.mjs`. Set the preview token as a server-side environment variable in any deployment that needs to render draft content. Never commit a real token.

## Content model

- **Article** is a root content type with a summary, category, optional banner, and Markdown body.
- **Article card** is a nestable block with a link to an Article story.
- **Article listing** is a nestable block containing a list of Article cards.
- **Page** is the existing root type. The Home story uses it to contain the Article listing.

The card resolves its linked Article at request time, so its title, summary, category, and banner come from the article story. The banner field is optional; without one, the card shows a letter tile.

## How the nested article cards work

Storyblok separates the shape of content from each saved entry. A **component** defines that shape: the Article component describes one grammar note, while Article card and Article listing describe reusable blocks editors can arrange on a page. A **story** is one saved entry that follows a root component’s schema. The five articles are Article stories; Home is a Page story.

Home’s `body` field contains an Article listing block. That block’s `cards` field contains five Article card blocks, and each card’s `article` field links to one of the Article stories. This gives the frontend a small, explicit relationship: the page controls which notes appear and in what order, while the article story remains the source of its own title and body.

The Astro route requests the draft Home story and renders its blocks through `StoryblokComponent`. The Article card follows its internal story link to read the linked Article. On an article route, the Article block renders the Markdown body with a Markdown parser. `storyblokEditable` adds the identifiers Storyblok’s Visual Editor uses to connect a rendered block to its editing form. The Storyblok Astro integration enables live preview, and `getPayload` uses the latest draft payload sent by the editor after a change.

This is useful when content editors need to reorder or replace cards without changing the page template, while developers keep control of how each component is displayed.

## Article banners

The five JPGs are uploaded to the Storyblok Assets area and connected to their matching Article stories’ **Banner** fields. `index.json` provides the article slug to banner filename mapping. The Home cards resolve each linked story’s banner automatically. The banner and Markdown rendering have been checked in the Visual Editor preview.

The article currently has no in-page link back to Home; use the browser’s Back button to return to the card list.
