import { createMiddleware } from 'hono/factory'
import { logger } from '@/services/logger.js'

const endpintLogger = logger.getSubLogger({
	name: 'endpoint',
})

const loggerMiddleware = createMiddleware(
	async (c, next) => {
		let reqBody = null
		const clonedReq = c.req.raw.clone()

		try {
			const rawText = await clonedReq.text()

			try {
				reqBody = JSON.parse(rawText)
			} catch {
				reqBody = rawText
			}
		} catch {
			reqBody = '[failed to parse body]'
		}

		endpintLogger.info({
			method: c.req.method,
			path: c.req.path,
			query: c.req.query(),
			header: c.req.header(),
			url: c.req.url,
			body: reqBody,
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

		if (c.error)
			return void endpintLogger.error(c.error)

		let resBody = null
		const clonedRes = c.res.clone()

		try {
			const rawText = await clonedRes.text()

			try {
				resBody = JSON.parse(rawText)
			} catch {
				resBody = rawText
			}
		} catch {
			resBody = '[failed to parse body]'
		}

		endpintLogger.info({
			ok: c.res.ok,
			status: c.res.status,
			header: Object.fromEntries(
				c.res.headers.entries(),
			),
			body: resBody,
		})
	},
)
export { loggerMiddleware as logger }
