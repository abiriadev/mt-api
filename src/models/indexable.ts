import { z } from 'zod'
import { indexSchema } from './index'

export const indexableSchema = z.object({
	index: indexSchema,
})
