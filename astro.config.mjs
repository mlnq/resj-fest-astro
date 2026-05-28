// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://rejsfest.pl';

export default defineConfig({
  integrations: [
    react(),
    sitemap({
      // SSR mode — pages aren't auto-discovered, list them explicitly
      customPages: [
        `${SITE}/`,
        `${SITE}/faq`,
        `${SITE}/galeria`,
        `${SITE}/informacje`,
        `${SITE}/organizatorzy-i-partnerzy`,
        `${SITE}/polityka-prywatnosci`,
        `${SITE}/program`,
        `${SITE}/regulamin`,
      ],
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  site: SITE,
  base: '/',
  output: 'server',
  adapter: vercel(),
});
