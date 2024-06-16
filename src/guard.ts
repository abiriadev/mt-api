import { RouteOptions } from './utils'
import { OpenAPIHono } from '@hono/zod-openapi'

const hono = new OpenAPIHono()
export { hono as guard }

hono.openAPIRegistry.registerComponent(
	'securitySchemes',
	'Bearer',
	{
		type: 'http',
		scheme: 'bearer',
		bearerFormat: 'JWT',
	},
)

export const guardOptions = {
	security: [
		{
			Bearer: [],
		},
	],
} satisfies RouteOptions
