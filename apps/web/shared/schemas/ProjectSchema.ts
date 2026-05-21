import { z } from 'zod';

const optionalUrl = z
  .string()
  .trim()
  .optional()
  .refine((v) => !v || /^https?:\/\/.+/i.test(v), {
    message: 'URL must start with http:// or https://'
  });

const environmentUrl = z
  .string()
  .trim()
  .min(1, 'URL is required')
  .refine((v) => /^https?:\/\/.+/i.test(v), {
    message: 'URL must start with http:// or https://'
  });

export const projectEnvironmentSchema = z.object({
  name: z.string().trim().min(1, 'Environment name is required'),
  url: environmentUrl
});

export type ProjectEnvironmentInput = z.infer<typeof projectEnvironmentSchema>;

export const projectUpsertSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  author: z.string().trim().min(1, 'Author is required'),
  description: z.string().trim().optional().default(''),
  otherInfo: z.string().trim().optional().default(''),
  repoUrl: optionalUrl,
  environments: z.array(projectEnvironmentSchema).optional().default([]),
  tags: z.array(z.string().trim().min(1)).optional().default([])
});

export type ProjectUpsertInput = z.infer<typeof projectUpsertSchema>;

export const projectRowSchema = z.object({
  id: z.number(),
  name: z.string(),
  repo_url: z.string().nullable().optional(),
  environments: z.array(projectEnvironmentSchema).optional().default([]),
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
  'environments',
  'author',
  'other_info',
  'description',
  'tags',
  'sort_order'
] as const;
