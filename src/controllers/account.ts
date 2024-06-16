import { OpenAPIHono } from '@hono/zod-openapi'
import { RouteOptions, newRoute } from '../utils'
import {
	profileSchema,
	updateProfileSchema,
} from '../models/profile'
import { passwordSchema } from '../models/password'

const sharedOptions = {
	tags: ['Account'],
} satisfies RouteOptions

export const accountRoute = new OpenAPIHono()

accountRoute.openapi(
	newRoute(
		'get',
		'/profile',
		null,
		profileSchema,
		sharedOptions,
	),
	c => {
		return c.json({
			name: '',
			tel: '',
			email: '',
		})
	},
)

accountRoute.openapi(
	newRoute(
		'patch',
		'/profile',
		updateProfileSchema,
		null,
		sharedOptions,
	),
	_ => {
		return new Response(null, {
			status: 200, // NOTE: how can I return void without this hack?
		})
	},
)

accountRoute.openapi(
	newRoute(
		'put',
		'/password',
		passwordSchema,
		null,
		sharedOptions,
	),
	_ => {
		return new Response(null, {
			status: 200,
		})
	},
)

accountRoute.openapi(
	newRoute('delete', '/', null, null, sharedOptions),
	_ => {
		return new Response(null, {
			status: 200,
		})
	},
)
