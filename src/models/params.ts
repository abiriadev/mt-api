import { z } from 'zod'
import { indexSchema } from '.'

export const idSchema = z.object({
	id: indexSchema,
})

export const idRuleSchema = z.object({
	id: indexSchema,
	ruleId: indexSchema,
})
