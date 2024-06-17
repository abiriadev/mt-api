import { OpenAPIHono } from '@hono/zod-openapi'
import { authRoute } from '@/controllers/auth.js'
import { accountRoute } from '@/controllers/account.js'
import { paymentsRoute } from '@/controllers/payments.js'
import { tunnelsRoute } from '@/controllers/tunnels.js'
import { openapi } from '@/openapi.js'
import { logger } from './middlewares/logger.js'
import { guard } from './middlewares/guard.js'

export const hono = new OpenAPIHono()

hono.use(logger)
hono.use(guard)

hono.doc('/openapi', {
	openapi: '3.0.1',
	info: {
		title: 'Mitigation KR',
		version: '0.1.0',
		description: 'Mitigation KR 백엔드 API',
		contact: {
			name: '이승하',
			url: 'mitigation.kr',
			email: 'abuse@hanarin.uk',
		},
		license: { name: 'MIT' },
	},
	servers: [
		{
			url: 'https://api.mitigation.kr',
			description: 'Hanarin 온프레미스 서버',
		},
	],
	externalDocs: {
		description: 'Notion 위키',
		url: 'https://www.notion.so/MITI-Wiki-32b5df14cf214a06bdcd695059734f3c#bc9f3e8270aa43609c8a674e490c28f1',
	},
})
hono.route('/', openapi)

hono.route('/auth', authRoute)
hono.route('/account', accountRoute)
hono.route('/payments', paymentsRoute)
hono.route('/tunnels', tunnelsRoute)
