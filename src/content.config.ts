import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const inacap = defineCollection({
  // Los MDX del sitio Next no llevan frontmatter: schema laxo a propósito
  loader: glob({ pattern: '**/*.mdx', base: './src/content/inacap' }),
  schema: z.object({}).passthrough().optional(),
});

export const collections = { inacap };
