import { OpenAPIHono } from '@hono/zod-openapi'
import { RouteOptions, newRoute } from '@/utils.js'
import {
	profileSchema,
	updateProfileSchema,
} from '@/models/profile.js'
import { changePasswordSchema } from '@/models/password.js'
import { guardOptions } from '@/guard.js'

const sharedOptions: RouteOptions = {
	...guardOptions,
	tags: ['Account'],
}

const hono = new OpenAPIHono()
export { hono as accountRoute }

hono.openapi(
	newRoute('get', '/profile', null, profileSchema, {
		...sharedOptions,
		summary: '프로필 정보 조회',
		description: `로그인한 유저의 프로필 정보 조회`,
		resDescription: '프로필 정보',
	}),
	c => {
		return c.json({
			name: '',
			tel: '',
			email: '',
		})
	},
)

hono.openapi(
	newRoute(
		'patch',
		'/profile',
		updateProfileSchema,
		null,
		{
			...sharedOptions,
			summary: '프로필 정보 수정',
			description: `새 데이터로 프로필 정보를 갱신`,
			reqDescription: '갱신할 프로필 정보',
			resDescription: '성공시 추가 응답 데이터 없음',
		},
	),
	c => {
		const { email } = c.req.valid('json')

		return new Response(null, {
			status: 200, // NOTE: how can I return void without this hack?
		})
	},
)

hono.openapi(
	newRoute(
		'put',
		'/password',
		changePasswordSchema,
		null,
		{
			...sharedOptions,
			summary: '비밀번호 변경',
			description: `참고: 현재 old와 new가 같아도 아무 예외처리 없음`,
			reqDescription: '이전 비밀번호와 새 비밀번호',
			resDescription: '성공시 추가 응답 데이터 없음',
		},
	),
	c => {
		const { oldPassword, newPassword } =
			c.req.valid('json')

		return new Response(null, {
			status: 200,
		})
	},
)

hono.openapi(
	newRoute('delete', '/', null, null, {
		...sharedOptions,
		summary: '회원 탈퇴',
		description: `말그대로 계삭. 현재 복구 기능 그딴 거 없음.`,
		resDescription: '성공시 추가 응답 데이터 없음',
	}),
	_ => {
		return new Response(null, {
			status: 200,
		})
	},
)
