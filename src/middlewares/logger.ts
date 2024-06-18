import { createMiddleware } from 'hono/factory'
import { logger } from '@/services/logger.js'

const loggerMiddleware = createMiddleware(
	async (c, next) => {
		let body = null
		const clonedReq = c.req.raw.clone()

		try {
			const rawText = await clonedReq.text()

			try {
				body = JSON.parse(rawText)
			} catch {
				body = rawText
			}
		} catch {
			body = '[failed to parse body]'
		}

		logger.info({
			method: c.req.method,
			path: c.req.path,
			query: c.req.query(),
			header: c.req.header(),
			url: c.req.url,
			body,
			routes: c.req.matchedRoutes.map(
				({ path, method, handler }) => ({
					path,
					method,
					handler:
						handler.name ||
						(handler.length < 2
							? '[handler]'
							: '[middleware]'),
				}),
			),
		})

		await next()
	},
)
export { loggerMiddleware as logger }
