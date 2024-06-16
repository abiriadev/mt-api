import { z } from 'zod'
import { indexSchema } from '@/models/_index.js'

export const indexableSchema = z.object({
	index: indexSchema,
})
