import { OpenAPIHono } from '@hono/zod-openapi'
import { signinSchema } from '../models/signin'
import { signupSchema } from '../models/signup'
import { authInfoSchema } from '../models/auth-info'
import { RouteOptions, newRoute } from '../utils'

const sharedOptions = {
	tags: ['Auth'],
} satisfies RouteOptions

export const authRoute = new OpenAPIHono()

authRoute.openapi(
	newRoute(
		'post',
		'/signup',
		signupSchema,
		authInfoSchema,
		{
			summary: '회원가입',
			description: `이메일, 비밀번호로 회원가입. 이메일 중복시 에러`,
			reqDescription: '회원가입 시 기입하는 정보',
			resDescription: '발급된 인증 정보',
			resStatus: 201,
			errors: {
				409: '이미 가입된 이메일 사용',
			},
			...sharedOptions,
		},
	),
	c => {
		return c.json({
			token: '',
		})
	},
)

authRoute.openapi(
	newRoute(
		'post',
		'/signin',
		signinSchema,
		authInfoSchema,
		{
			summary: '로그인',
			description: `이메일, 비밀번호로 로그인 시도. 없는 계정이거나 비밀번호가 틀릴 경우 에러`,
			reqDescription: '로그인 정보',
			resDescription: '발급된 인증 정보',
			errors: {
				401: '등록되지 않은 이메일 또는 틀린 비밀번호 사용',
			},
			...sharedOptions,
		},
	),
	c => {
		return c.json({
			token: '',
		})
	},
)
