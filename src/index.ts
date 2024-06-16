import { serve } from '@hono/node-server'
import { swaggerUI } from '@hono/swagger-ui'
import { OpenAPIHono } from '@hono/zod-openapi'
import { authRoute } from './controllers/auth'
import { accountRoute } from './controllers/account'
import { paymentsRoute } from './controllers/payments'

const app = new OpenAPIHono()

app.doc('/openapi', {
	openapi: '3.0.0',
	info: { title: 'Mitigation KR', version: '1.0.0' },
})

app.get('/openapi/ui', swaggerUI({ url: '/openapi' }))

app.route('/auth', authRoute)
app.route('/account', accountRoute)
app.route('/payments', paymentsRoute)

const port = 2727
console.log(`Server is running on port ${port}`)

serve({
	fetch: app.fetch,
	port,
})
