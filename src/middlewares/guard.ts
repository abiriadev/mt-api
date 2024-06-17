import { getConfig } from '@/services/config.js'
import { createMiddleware } from 'hono/factory'
import { HTTPException } from 'hono/http-exception'
import { jwt } from 'hono/jwt'

// NOTE: 타입 정보 날려도 됨
export const guardOptions = {
	security: [
		{
			Bearer: [],
		},
	],
	errors: {
		401: '로그인 필요 또는 토큰 만료됨',
	},
}

export interface AuthContext {
	Variables: {
		auth: {
			authId: string
		}
	}
}

interface RawJwtPayload {
	sub: string
	exp: number
}

const { jwtSecret } = getConfig()

const jwtInner = jwt({
	secret: jwtSecret,
})

export const guard = createMiddleware<AuthContext>(
	async (c, next) =>
		await jwtInner(c, async () => {
			const { sub, exp } = c.get(
				'jwtPayload',
			) as RawJwtPayload

			if (exp < Date.now() / 1000)
				throw new HTTPException(401, {
					message: 'JWT Token expired',
				})

			c.set('auth', {
				authId: sub,
			})

			await next()
		}),
)
