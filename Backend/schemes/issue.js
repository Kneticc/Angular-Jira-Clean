import { z } from 'zod';
import { userSchema } from './user.js';

export const issueSchema = z.object({
  id: z.string(),
  type: z.string(),
  title: z.string(),
  priority: z.string(),
  description: z.string(),
  status: z.string(),
  date: z.string(),
  author: userSchema,
  assignee: z.array(userSchema)
});

export const validateIssue = (data) => {
  const result = issueSchema.safeParse(data);
  if (!result.success) {
    throw new Error(JSON.stringify(result.error.format(), null, 2));
  }
  return result.data;
}