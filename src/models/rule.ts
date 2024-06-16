import { indexableSchema } from '@/models/indexable.js'
import { commentableSchema } from '@/models/commentable.js'
import { portSchema } from '@/models/port.js'
import { protocolSchema } from '@/models/protocol.js'

export const ruleSchema = indexableSchema
	.extend({
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
