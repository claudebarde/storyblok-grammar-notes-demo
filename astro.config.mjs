import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import { storyblok } from "@storyblok/astro";
import { loadEnv } from "vite";
import mkcert from "vite-plugin-mkcert";

const env = loadEnv("", process.cwd(), "STORYBLOK");

export default defineConfig({
  output: "server",
  adapter: node({ mode: "standalone" }),
  integrations: [
    storyblok({
      accessToken: env.STORYBLOK_DELIVERY_API_TOKEN,
      livePreview: true,
      apiOptions: { region: "eu" },
      components: {
        page: "storyblok/Page",
        article: "storyblok/Article",
        article_listing: "storyblok/ArticleListing",
        article_card: "storyblok/ArticleCard",
      },
    }),
  ],
  vite: {
    plugins: [mkcert()],
  },
});
