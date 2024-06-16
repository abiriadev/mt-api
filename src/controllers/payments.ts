import { OpenAPIHono } from '@hono/zod-openapi'
import { RouteOptions, newRoute } from '../utils'
import {
	createPaymentSchema,
	paymentHistorySchema,
	paymentSchema,
} from '../models/payment'
import { idSchema } from '../models/id'

const sharedOptions = {
	tags: ['Payments'],
} satisfies RouteOptions

const hono = new OpenAPIHono()
export { hono as paymentsRoute }

hono.openapi(
	newRoute('get', '/', null, paymentSchema.array(), {
		summary: '결제 수단 조회',
		description: `현재 사용자의 모든 결제 수단 조회.`,
		resDescription: '결제 수단 배열',
		errors: {
			401: '로그인 필요',
		},
		...sharedOptions,
	}),
	c => {
		return c.json([])
	},
)

hono.openapi(
	newRoute('post', '/', createPaymentSchema, null, {
		summary: '신규 결제 수단 등록',
		description: `참고: 본 API는 프런트 서버(Next)가 받은 토스 콜백으로부터 간접적으로 호출됨.`,
		reqDescription:
			'토스가 전달한 authKey 정보. `customerKey`의 경우 인증 토큰으로부터 추론하므로 불필요.',
		resDescription: '성공시 추가 응답 데이터 없음',
		resStatus: 201,
		errors: {
			401: '로그인 필요. 해당 로그인 정보로부터 customerKey를 추출하므로 반드시 필요함.',
		},
		...sharedOptions,
	}),
	_ => {
		return new Response(null, {
			status: 201,
		})
	},
)

hono.openapi(
	newRoute(
		'get',
		'/history',
		null,
		paymentHistorySchema.array(),
		{
			summary: '청구 내역 조회',
			description: `성공 또는 실패한 결제 시도를 전부 조회`,
			resDescription: '청구 내역 배열',
			resStatus: 200,
			errors: {
				401: '로그인 필요',
			},
			...sharedOptions,
		},
	),
	_ => {
		return new Response(null, {
			status: 200,
		})
	},
)

hono.openapi(
	newRoute('delete', '/{id}', null, null, {
		summary: '결제 수단 삭제',
		description: `해당 계정에서 결제 수단을 삭제함.`,
		resDescription: '성공시 추가 응답 데이터 없음',
		resStatus: 204,
		params: idSchema,
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
