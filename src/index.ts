import { serve } from '@hono/node-server'
import { swaggerUI } from '@hono/swagger-ui'
import { OpenAPIHono } from '@hono/zod-openapi'
import { authRoute } from './controllers/auth'
import { accountRoute } from './controllers/account'
import { paymentsRoute } from './controllers/payments'
import { tunnelsRoute } from './controllers/tunnels'
import { guard } from './guard'

const hono = new OpenAPIHono()

hono.doc('/openapi', {
	openapi: '3.0.0',
	info: { title: 'Mitigation KR', version: '1.0.0' },
})
hono.get('/openapi/ui', swaggerUI({ url: '/openapi' }))

hono.route('/', guard)

hono.route('/auth', authRoute)
hono.route('/account', accountRoute)
hono.route('/payments', paymentsRoute)
hono.route('/tunnels', tunnelsRoute)

const port = 2727
console.log(`Server is running on port ${port}`)

serve({
	fetch: hono.fetch,
	port,
})
