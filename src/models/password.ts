import { z } from 'zod'

export const changePasswordSchema = z.object({
	old: z.string(),
	new: z.string(),
})
