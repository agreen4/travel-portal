import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const activitySchema = z.object({
  id: z.string(),
  time: z.string().optional(),
  name: z.string(),
  description: z.string().optional(),
  url: z.string().optional(),
  photo: z.string().optional(),
  confirmation: z.string().optional(),
});

const mealSchema = z.object({
  id: z.string(),
  time: z.string().optional(),
  restaurant: z.string(),
  dish: z.string().optional(),
  notes: z.string().optional(),
  url: z.string().optional(),
  confirmation: z.string().optional(),
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
    status: z.enum(['planning', 'active', 'complete']).default('planning'),
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
      confirmation: z.string().optional(),
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

const packingItemSchema = z.object({
  label: z.string(),
});

const packingSectionSchema = z.object({
  name: z.string(),
  items: z.array(packingItemSchema),
});

const packing = defineCollection({
  loader: glob({ pattern: '*.{yaml,yml}', base: './src/content/packing' }),
  schema: z.object({
    trip: z.string(),
    dimensions: z.array(z.string()),
    generated: z.coerce.date(),
    sections: z.array(packingSectionSchema),
  }),
});

const preDeparture = defineCollection({
  loader: glob({ pattern: '**/pre-departure.{yaml,yml}', base: './src/content/trips' }),
  schema: z.object({
    trip: z.string(),
    flights: z.array(z.object({
      number: z.string(),
      route: z.string(),
      depart: z.string(),
      arrive: z.string(),
      notes: z.string().optional(),
    })).default([]),
    jet_lag: z.object({
      pre_departure: z.array(z.object({ day: z.string(), instructions: z.string() })).default([]),
      on_return: z.array(z.object({ day: z.string(), instructions: z.string() })).default([]),
    }).optional(),
    checklist: z.array(z.object({
      category: z.string(),
      items: z.array(z.object({
        label: z.string(),
        private: z.boolean().default(false),
      })),
    })).default([]),
    emergency_contacts: z.array(z.object({
      name: z.string(),
      phone: z.string(),
      address: z.string().optional(),
      notes: z.string().optional(),
    })).default([]),
    ta_q_bin: z.array(z.object({
      from_hotel: z.string(),
      to_hotel: z.string(),
      drop_by: z.string(),
      arrives: z.string(),
    })).default([]),
  }),
});

const highlights = defineCollection({
  loader: glob({ pattern: '**/highlights.md', base: './src/content/trips' }),
  schema: z.object({
    trip: z.string(),
    title: z.string(),
    published: z.boolean().default(false),
  }),
});

const recap = defineCollection({
  loader: glob({ pattern: '**/recap.md', base: './src/content/trips' }),
  schema: z.object({
    trip: z.string(),
    title: z.string(),
    published: z.boolean().default(false),
  }),
});

export const collections = {
  trips, days, bookings, suggestions, diary, packing,
  preDeparture, highlights, recap,
};
