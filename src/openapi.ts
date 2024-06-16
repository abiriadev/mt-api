import { swaggerUI } from '@hono/swagger-ui'
import { OpenAPIHono } from '@hono/zod-openapi'

const hono = new OpenAPIHono()
export { hono as openapi }

hono.get('/openapi/ui', swaggerUI({ url: '/openapi' }))

hono.openAPIRegistry.registerComponent(
	'securitySchemes',
	'Bearer',
	{
		type: 'http',
		scheme: 'bearer',
		bearerFormat: 'JWT',
	},
)
