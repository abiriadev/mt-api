import { OpenAPIHono } from '@hono/zod-openapi'
import { RouteOptions, newRoute } from '@/utils.js'
import {
	createPaymentSchema,
	paymentHistorySchema,
	paymentSchema,
} from '@/models/payment.js'
import { idSchema } from '@/models/params.js'
import { guardOptions } from '@/middlewares/guard.js'

const sharedOptions: RouteOptions = {
	...guardOptions,
	tags: ['Payments'],
}

const hono = new OpenAPIHono()
export { hono as paymentsRoute }

hono.openapi(
	newRoute('get', '/', null, paymentSchema.array(), {
		...sharedOptions,
		summary: '결제 수단 조회',
		description: `현재 사용자의 모든 결제 수단 조회.`,
		resDescription: '결제 수단 배열',
	}),
	c => {
		return c.json([])
	},
)

hono.openapi(
	newRoute('post', '/', createPaymentSchema, null, {
		...sharedOptions,
		summary: '신규 결제 수단 등록',
		description: `참고: 본 API는 프런트 서버(Next)가 받은 토스 콜백으로부터 간접적으로 호출됨.`,
		reqDescription:
			'토스가 전달한 authKey 정보. `customerKey`의 경우 인증 토큰으로부터 추론하므로 불필요.',
		resDescription: '성공시 추가 응답 데이터 없음',
	}),
	c => {
		const { authKey } = c.req.valid('json')

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
			...sharedOptions,
			summary: '청구 내역 조회',
			description: `성공 또는 실패한 결제 시도를 전부 조회`,
			resDescription: '청구 내역 배열',
		},
	),
	c => {
		return c.json([])
	},
)

hono.openapi(
	newRoute('delete', '/{id}', null, null, {
		...sharedOptions,
		summary: '결제 수단 삭제',
		description: `해당 계정에서 결제 수단을 삭제함.`,
		resDescription: '성공시 추가 응답 데이터 없음',
		params: idSchema,
	}),
	c => {
		const { id } = c.req.valid('param')

		return new Response(null, {
			status: 200,
		})
	},
)
