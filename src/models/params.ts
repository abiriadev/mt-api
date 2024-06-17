import { z } from 'zod'

const paramIdSchema = z.string().openapi({
	description: '고유 ID',
	example: '123',
})

export const idSchema = z.object({
	id: paramIdSchema,
})

export const idRuleSchema = idSchema.extend({
	ruleId: paramIdSchema,
})
