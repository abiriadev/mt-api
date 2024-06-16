import { z } from 'zod'
import { indexSchema } from '@/models/index.js'

export const indexableSchema = z.object({
	index: indexSchema,
})
