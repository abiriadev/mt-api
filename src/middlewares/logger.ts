import { createMiddleware } from 'hono/factory'
import { logger } from 'hono/logger'

const honoLogger = logger()

const loggerMiddleware = createMiddleware((c, next) => {
	return honoLogger(c, next)
})
export { loggerMiddleware as logger }
