// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from 'vite';

// https://astro.build/config
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const site = env.PUBLIC_SITE_URL || 'https://mlnq.github.io';
  const base = env.PUBLIC_BASE_PATH || '/';

  return {
    integrations: [react()],
    vite: {
      plugins: [tailwindcss()],
    },
    site,
    base,
  };
});
