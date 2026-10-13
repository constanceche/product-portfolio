import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const work = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    org: z.string(),
    role: z.string(),
    period: z.string(),
    summary: z.string(),
    figure: z.enum(['network', 'tiers', 'ads']),
    order: z.number(),
    results: z.array(z.object({ value: z.string(), label: z.string() })),
    tools: z.array(z.string()),
  }),
});

export const collections = { work };
