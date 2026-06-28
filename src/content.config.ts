import { defineCollection, z } from 'astro:content';
import { file, glob } from 'astro/loaders';

const places = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/contents/places' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      featuredImage: image(),
      description: z.string(),
      photos: z.array(image()).optional(),
    }),
});

// Tambahkan koleksi artikel
const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/contents/articles' }),
  schema: ({ image }) => 
    z.object({
      title: z.string(),
      featuredImage: image(),
      author: z.string(),
      publishedDate: z.date(),
    }),
});

const culinary = defineCollection({
  loader: file('src/data/map/culinary.json'),
  schema: z.object({
    id: z.number(),
    name: z.string(),
    operational: z.string().optional(),
    price: z.string().optional(),
    facility: z.string().optional(),
    menu: z.string().optional(),
    lat: z.number(),
    lng: z.number(),
    products: z.array(z.object({
      id: z.number(),
      name: z.string(),
      price: z.string().optional(),
    }))
  }),
});

const lodgings = defineCollection({
  loader: file('src/data/map/lodgings.json'),
  schema: ({ image }) =>
    z.object({
      id: z.number(),
      name: z.string(),
      lat: z.number(),
      lng: z.number(),
      address: z.string().optional(),
      type: z.string().optional(),
      lowerPrice: z.number().min(0).optional(),
      upperPrice: z.number().min(0).optional(),
      capacity: z.number().min(1).optional(),
      bathroomType: z.enum(['Dalam', 'Luar', 'Dalam dan Luar']).optional(),
      facilities: z.array(z.string()).optional(),
      phone: z.string().optional(),
      note: z.string().optional(),
      images: z.array(image()).optional(),
    }),
});

const traditionalFoods = defineCollection({
  loader: file('src/data/traditionalFoods.json'),
  schema: ({ image }) =>
    z.object({
      id: z.number(),
      name: z.string(),
      featuredImage: image(),
      images: z.array(image()).optional(),
      productName: z.string().optional(),
      definition: z.string().optional(),
      ingredients: z.string(),
      philosophy: z.string().optional(),
      creation: z.string().optional()
    }),
});

export const collections = { places, culinary, lodgings, traditionalFoods, articles };
