// @ts-check
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import unlessSupportsDirective from './src/integrations/astro-css-directives/register';

export default defineConfig({
  integrations: [react(), unlessSupportsDirective()],

  vite: {
    plugins: [tailwindcss()],
  },
});