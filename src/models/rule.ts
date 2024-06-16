import { z } from 'zod'
import { indexableSchema } from './indexable'
import { commentableSchema } from './commentable'
import { portSchema } from './port'
import { protocolSchema } from './protocol'

export const ruleSchema = indexableSchema
	.extend({
		action: z.string(),
		protocol: protocolSchema,
		port: portSchema,
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
