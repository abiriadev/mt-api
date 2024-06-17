import { z } from 'zod'
import { indexSchema } from '@/models/atoms/_index.js'

export const indexableSchema = z.object({
	index: indexSchema,
})
