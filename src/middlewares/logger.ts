import { createMiddleware } from 'hono/factory'
import { logger } from '@/services/logger.js'

const loggerMiddleware = createMiddleware((c, next) => {
	logger.info(`[${c.req.method}] ${c.req.path}`)

	return next()
})
export { loggerMiddleware as logger }
