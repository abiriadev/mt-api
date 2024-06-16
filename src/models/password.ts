import { z } from 'zod'

export const passwordSchema = z.object({
	old: z.string(),
	new: z.string(),
})
