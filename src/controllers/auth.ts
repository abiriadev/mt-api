import { OpenAPIHono } from '@hono/zod-openapi'
import { signinSchema } from '@/models/signin.js'
import { signupSchema } from '@/models/signup.js'
import { authInfoSchema } from '@/models/auth-info.js'
import { RouteOptions, newRoute } from '@/utils.js'
import { prisma } from '@/services/prisma.js'
import { hash } from '@/services/crypt.js'
import { Prisma } from '@prisma/client'

const sharedOptions: RouteOptions = {
	tags: ['Auth'],
}

const hono = new OpenAPIHono()
export { hono as authRoute }

hono.openapi(
	newRoute(
		'post',
		'/signup',
		signupSchema,
		authInfoSchema,
		{
			...sharedOptions,
			summary: '회원가입',
			description: `이메일, 비밀번호로 회원가입. 이메일 중복시 에러`,
			reqDescription: '회원가입 시 기입하는 정보',
			resDescription: '발급된 인증 정보',
			errors: {
				409: '이미 가입된 이메일 사용',
			},
		},
	),
	async c => {
		const { email, password } = c.req.valid('json')

		try {
			await prisma.user.create({
				data: {
					email,
					hash: await hash(password),
					name: '<실명> PASS placeholder',
					tel: '<전화번호> PASS placeholder',
				},
			})

			return c.json({
				token: '',
			})
		} catch (e) {
			if (
				!(
					e instanceof
					Prisma.PrismaClientKnownRequestError
				)
			)
				throw e
			if (e.code !== 'P2002') throw e

			return new Response(null, {
				status: 409,
			}) as any // TODO: fix typing
		}
	},
)

hono.openapi(
	newRoute(
		'post',
		'/signin',
		signinSchema,
		authInfoSchema,
		{
			...sharedOptions,
			summary: '로그인',
			description: `이메일, 비밀번호로 로그인 시도. 없는 계정이거나 비밀번호가 틀릴 경우 에러`,
			reqDescription: '로그인 정보',
			resDescription: '발급된 인증 정보',
			errors: {
				401: '등록되지 않은 이메일 또는 틀린 비밀번호 사용',
			},
		},
	),
	c => {
		const { email, password } = c.req.valid('json')

		return c.json({
			token: '',
		})
	},
)
