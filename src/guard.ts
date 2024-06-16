import { RouteOptions } from '@/utils.js'

export const guardOptions: RouteOptions = {
	security: [
		{
			Bearer: [],
		},
	],
	errors: {
		401: '로그인 필요',
	},
}
