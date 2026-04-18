import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const activitySchema = z.object({
  id: z.string(),
  time: z.string().optional(),
  name: z.string(),
  description: z.string().optional(),
  url: z.string().optional(),
  photo: z.string().optional(),
});

const mealSchema = z.object({
  id: z.string(),
  time: z.string().optional(),
  restaurant: z.string(),
  dish: z.string().optional(),
  notes: z.string().optional(),
  url: z.string().optional(),
});

const daySchema = z.object({
  date: z.coerce.date(),
  location: z.string(),
  notes: z.string().optional(),
  accommodation: z.object({
    name: z.string(),
    url: z.string().optional(),
    confirmation: z.string().optional(),
  }).optional(),
  activities: z.array(activitySchema).default([]),
  meals: z.array(mealSchema).default([]),
});

const trips = defineCollection({
  loader: glob({ pattern: '**/*.{json,yaml,yml}', base: './src/content/trips' }),
  schema: z.object({
    title: z.string(),
    visibility: z.enum(['public', 'unlisted', 'private']),
    destinations: z.array(z.string()),
    date_start: z.coerce.date(),
    date_end: z.coerce.date(),
    cover_photo: z.string(),
    description: z.string(),
    days: z.array(daySchema).default([]),
    pre_trip_input: z.array(z.object({
      activity_id: z.string(),
      author: z.string(),
      note: z.string(),
      url: z.string().optional(),
    })).default([]),
  }),
});

export const collections = { trips };
