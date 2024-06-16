import { OpenAPIHono } from '@hono/zod-openapi'
import { RouteOptions, newRoute } from '../utils'
import {
	profileSchema,
	updateProfileSchema,
} from '../models/profile'
import { passwordSchema } from '../models/password'

const sharedOptions = {
	tags: ['Account'],
} satisfies RouteOptions

export const accountRoute = new OpenAPIHono()

accountRoute.openapi(
	newRoute('get', '/profile', null, profileSchema, {
		summary: '프로필 정보 조회',
		description: `로그인한 유저의 프로필 정보 조회`,
		resDescription: '프로필 정보',
		errors: {
			401: '로그인 필요',
		},
		...sharedOptions,
	}),
	c => {
		return c.json({
			name: '',
			tel: '',
			email: '',
		})
	},
)

accountRoute.openapi(
	newRoute(
		'patch',
		'/profile',
		updateProfileSchema,
		null,
		{
			summary: '프로필 정보 수정',
			description: `새 데이터로 프로필 정보를 갱신`,
			reqDescription: '갱신할 프로필 정보',
			resDescription: '성공시 추가 응답 데이터 없음',
			resStatus: 204,
			errors: {
				401: '로그인 필요',
			},
			...sharedOptions,
		},
	),
	_ => {
		return new Response(null, {
			status: 200, // NOTE: how can I return void without this hack?
		})
	},
)

accountRoute.openapi(
	newRoute('put', '/password', passwordSchema, null, {
		summary: '비밀번호 변경',
		description: `참고: 현재 old와 new가 같아도 아무 예외처리 없음`,
		reqDescription: '이전 비밀번호와 새 비밀번호',
		resDescription: '성공시 추가 응답 데이터 없음',
		resStatus: 204,
		errors: {
			401: '로그인 필요',
		},
		...sharedOptions,
	}),
	_ => {
		return new Response(null, {
			status: 200,
		})
	},
)

accountRoute.openapi(
	newRoute('delete', '/', null, null, {
		summary: '회원 탈퇴',
		description: `말그대로 계삭. 현재 복구 기능 그딴 거 없음.`,
		resDescription: '성공시 추가 응답 데이터 없음',
		resStatus: 204,
		errors: {
			401: '로그인 필요',
		},
		...sharedOptions,
	}),
	_ => {
		return new Response(null, {
			status: 200,
		})
	},
)
