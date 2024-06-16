import { RouteOptions } from './utils'
import { OpenAPIHono } from '@hono/zod-openapi'

export const guard = new OpenAPIHono()

guard.openAPIRegistry.registerComponent(
	'securitySchemes',
	'Bearer',
	{
		type: 'http',
		scheme: 'bearer',
		bearerFormat: 'JWT',
	},
)

export const guardOptions = {
	security: [],
} satisfies RouteOptions
