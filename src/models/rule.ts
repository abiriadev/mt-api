import { indexableSchema } from '@/models/interfaces/indexable.js'
import { commentableSchema } from '@/models/interfaces/commentable.js'
import { portSchema } from '@/models/atoms/port.js'
import { protocolSchema } from '@/models/atoms/protocol.js'

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
