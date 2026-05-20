import { z } from 'zod';

export const projectRowSchema = z.object({
  id: z.number(),
  name: z.string(),
  repo_url: z.string().nullable().optional(),
  test_url: z.string().nullable().optional(),
  prod_url: z.string().nullable().optional(),
  author: z.string(),
  other_info: z.string(),
  description: z.string(),
  tags: z.array(z.string()).nullable().optional(),
  sort_order: z.number().optional(),
  created_at: z.union([z.string(), z.number()]).optional(),
  updated_at: z.union([z.string(), z.number()]).optional()
});

export type ProjectRow = z.infer<typeof projectRowSchema>;

export const PROJECT_LIST_FIELDS = [
  'id',
  'name',
  'repo_url',
  'test_url',
  'prod_url',
  'author',
  'other_info',
  'description',
  'tags',
  'sort_order'
] as const;
