import { z } from 'zod'
import { indexableSchema } from './indexable'
import { commentableSchema } from './commentable'

export const ruleSchema = indexableSchema
	.extend({
		action: z.string(),
		protocol: z.string(),
		port: z.number().int().nonnegative(), // TODO: validate port number range
	})
	.extend(commentableSchema.shape)
	.openapi('Rule')

export const createRuleSchema = ruleSchema
	.omit({
		index: true,
	})
	.openapi('CreateRule')

export const updateRuleSchema = createRuleSchema
	.partial()
	.openapi('UpdateRule')
