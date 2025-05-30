import { z } from 'zod';

export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  avatar: z.string()
})