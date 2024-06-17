import { serve } from '@hono/node-server'
import { hono } from './app.js'
import { getConfig } from './services/config.js'
import { logger } from './services/logger.js'

const { port } = getConfig()
logger.info(`Server is running on port ${port}`)

process.on('SIGINT', () => {
	logger.info('Server is shutting down')

	process.exit(0)
})

serve({
	fetch: hono.fetch,
	port,
})
