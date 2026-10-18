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
  redirects: {
    // Como en Next: el índice de flashcards redirige al detalle del ramo
    '/inacap/[courseId]/flashcards': '/inacap/[courseId]',
    // El breadcrumb de las lecciones enlaza /ejercicios/<subseccion>, que en
    // Next era 404; aquí redirige al índice de ejercicios
    '/ejercicios/leetcode': '/ejercicios',
    '/ejercicios/java': '/ejercicios',
  },
  markdown: {
    // Desactiva el Shiki integrado: el resaltado lo hace rehype-prism-plus
    // (mismas clases/tokens que el Prism cliente del sitio Next)
    syntaxHighlight: false,
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
