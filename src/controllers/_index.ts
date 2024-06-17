import { OpenAPIHono } from '@hono/zod-openapi'
import { versionSchema } from '@/models/version.js'
import { version } from '@/services/package.js'
import { getConfig } from '@/services/config.js'

const hono = new OpenAPIHono()
export { hono as indexRoute }

const { host, port } = getConfig()

hono.get('/', c => {
	return c.json(
		versionSchema.parse({
			version,
			host: `http://${host}:${port}`,
		}),
	)
})
