import { z } from 'zod'

export const commentableSchema = z.object({
	comment: z.string().nullable().openapi({
		description: '메모',
	}),
})
