import { z } from 'zod'
import { indexSchema } from '.'

export const ruleSchema = z.object({
	index: indexSchema,
	action: z.string(),
	protocol: z.string(),
	port: z.number().int().nonnegative(), // TODO: validate port number range
	comment: z.string().nullable(),
})

export const createRuleSchema = ruleSchema.omit({
	index: true,
})

export const updateRuleSchema = createRuleSchema.partial()
