// @ts-check
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypePrism from 'rehype-prism-plus';
import remarkAutoNumber from './src/plugins/remark-auto-number.mjs';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), mdx()],
  markdown: {
    remarkPlugins: [remarkAutoNumber, remarkMath],
    // rehype-prism-plus resalta el código en build (mismos tokens/clases que
    // el Prism cliente del sitio Next, así el theme CSS aplica igual)
    rehypePlugins: [rehypeKatex, [rehypePrism, { ignoreMissing: true }]],
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        // Permite copiar componentes del sitio Next sin reescribir imports
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        'next/link': fileURLToPath(new URL('./src/shims/next-link.jsx', import.meta.url)),
        'next/image': fileURLToPath(new URL('./src/shims/next-image.jsx', import.meta.url)),
      },
    },
  },
});
