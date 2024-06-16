import { RouteOptions } from './utils'

export const guardOptions = {
	security: [
		{
			Bearer: [],
		},
	],
	errors: {
		401: '로그인 필요',
	},
} satisfies RouteOptions
