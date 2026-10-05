# Hypothetical Discord reply

For a small site, you can get a real Storyblok-backed page working quickly: define a content type, add a few stories, then render them through one of Storyblok’s framework integrations. In this demo, Codex connected to my Storyblok space through MCP and created an Article type, five draft articles, and a nested Home → Article listing → Article cards structure. The whole Markdown body stays in Storyblok, while each card links back to its Article story.

It also plays well with AI tools when the assistant has enough context. MCP let Codex inspect the existing space and create components and stories through the Management API. I used Astro and Storyblok’s official integration for the frontend, including the Visual Editor bridge so draft edits can flow back into the preview.

I still checked the generated structure against the space and the docs. One rough edge: the MCP asset upload tool returned “Authentication required,” even though story and component operations worked. I left banner fields ready and used the article-to-banner mapping from `index.json` to document the manual upload fallback. So the short answer is: yes, you can get a useful prototype working fast, and AI can do meaningful CMS work, but verify the result and expect to handle an occasional tool or permission edge case yourself.
