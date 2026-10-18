import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Los MDX del sitio Next no llevan frontmatter: schema laxo a propósito
const inacap = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/inacap' }),
  schema: z.object({}).passthrough().optional(),
});

const ejercicios = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/ejercicios' }),
  schema: z.object({}).passthrough().optional(),
});

export const collections = { inacap, ejercicios };
