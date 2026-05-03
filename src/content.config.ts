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

const bookingItemSchema = z.object({
  id: z.string(),
  confirmation: z.string().optional(),
}).passthrough();

const trips = defineCollection({
  loader: glob({ pattern: '**/index.{yaml,yml}', base: './src/content/trips' }),
  schema: z.object({
    title: z.string(),
    visibility: z.enum(['public', 'unlisted', 'private']),
    destinations: z.array(z.string()),
    date_start: z.coerce.date(),
    date_end: z.coerce.date(),
    cover_photo: z.string(),
    description: z.string(),
  }),
});

const days = defineCollection({
  loader: glob({ pattern: '**/days/*.md', base: './src/content/trips' }),
  schema: z.object({
    date: z.coerce.date(),
    location: z.string(),
    title: z.string().optional(),
    notes: z.string().optional(),
    accommodation: z.object({
      name: z.string(),
      url: z.string().optional(),
    }).optional(),
    activities: z.array(activitySchema).default([]),
    meals: z.array(mealSchema).default([]),
  }),
});

const bookings = defineCollection({
  loader: glob({ pattern: '**/bookings.{yaml,yml}', base: './src/content/trips' }),
  schema: z.object({
    flights: z.array(bookingItemSchema).default([]),
    hotels: z.array(bookingItemSchema).default([]),
    activities: z.array(bookingItemSchema).default([]),
    restaurants: z.array(bookingItemSchema).default([]),
    rail: z.array(bookingItemSchema).default([]),
    ferries: z.array(bookingItemSchema).default([]),
  }),
});

const suggestions = defineCollection({
  loader: glob({ pattern: '**/suggestions.{yaml,yml}', base: './src/content/trips' }),
  schema: z.object({
    suggestions: z.array(z.object({
      activity_id: z.string(),
      author: z.string(),
      note: z.string(),
      url: z.string().optional(),
    })).default([]),
  }),
});

const diary = defineCollection({
  loader: glob({ pattern: '**/diary/*.md', base: './src/content/trips' }),
  schema: z.object({
    date: z.coerce.date(),
    location: z.string(),
    title: z.string().optional(),
    photos: z.array(z.string()).default([]),
    trip: z.string(),
  }),
});

export const collections = { trips, days, bookings, suggestions, diary };
