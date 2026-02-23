// @ts-check
import { defineConfig } from 'astro/config';
import unlessSupportsDirective from './src/integrations/astro-css-directives/register';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  integrations: [react(), unlessSupportsDirective()],

  vite: {
    plugins: [tailwindcss()],
  },
});