import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import { signinSchema } from '../models/signin'
import { signupSchema } from '../models/signup'
import { authInfoSchema } from '../models/auth-info'
import { RouteOptions, newRoute } from '../utils'

const sharedOptions = {
	tags: ['Auth'],
} satisfies RouteOptions

export const authRoute = new OpenAPIHono()

authRoute.openapi(
	newRoute(
		'post',
		'/signup',
		signupSchema,
		authInfoSchema,
		sharedOptions,
	),
	c => {
		return c.json({
			token: '',
		})
	},
)

authRoute.openapi(
	newRoute(
		'post',
		'/signin',
		signinSchema,
		authInfoSchema,
		sharedOptions,
	),
	c => {
		return c.json({
			token: '',
		})
	},
)
