import { OpenAPIHono } from '@hono/zod-openapi'
import { RouteOptions, newRoute } from '../utils'
import { idRuleSchema, idSchema } from '../models/params'
import {
	createTunnelSchema,
	tunnelDetailSchema,
	tunnelSchema,
	updateTunnelSchema,
} from '../models/tunnel'
import {
	createRuleSchema,
	ruleSchema,
	updateRuleSchema,
} from '../models/rule'
import { guardOptions } from '../guard'

const sharedOptions = {
	tags: ['Tunnels'],
	...guardOptions,
} satisfies RouteOptions

const hono = new OpenAPIHono()
export { hono as tunnelsRoute }

hono.openapi(
	newRoute('get', '/', null, tunnelSchema.array(), {
		summary: '활성 터널 조회',
		description: `터널 목록 조회`,
		resDescription: '터널 배열',
		...sharedOptions,
	}),
	c => {
		return c.json([])
	},
)

hono.openapi(
	newRoute('post', '/', createTunnelSchema, null, {
		summary: '신규 터널 생성',
		description: `주어진 정보로 새 터널 생성`,
		reqDescription: '새 터널 정보',
		resDescription: '성공시 추가 응답 데이터 없음',
		resStatus: 201,
		...sharedOptions,
	}),
	_ => {
		return new Response(null, {
			status: 201,
		})
	},
)

hono.openapi(
	newRoute('patch', '/{id}', updateTunnelSchema, null, {
		summary: '터널 정보 수정',
		description: `기존 터널 정보를 수정`,
		resDescription: '성공시 추가 응답 데이터 없음',
		params: idSchema,
		...sharedOptions,
	}),
	_ => {
		return new Response(null, {
			status: 200,
		})
	},
)

hono.openapi(
	newRoute('delete', '/{id}', null, null, {
		summary: '터널 삭제',
		description: `해당 터널을 삭제`,
		resDescription: '성공시 추가 응답 데이터 없음',
		resStatus: 204,
		params: idSchema,
		...sharedOptions,
	}),
	_ => {
		return new Response(null, {
			status: 204,
		})
	},
)

hono.openapi(
	newRoute('get', '/{id}', null, tunnelDetailSchema, {
		summary: '터널 상세 정보 조회',
		description: `터널 통계 및 트래픽 정보 반환`,
		resDescription:
			'기존 터널 정보에 추가적으로 통계 정보 반환',
		params: idSchema,
		...sharedOptions,
	}),
	c => {
		return c.json([])
	},
)

hono.openapi(
	newRoute(
		'get',
		'/{id}/rules',
		null,
		ruleSchema.array(),
		{
			summary: '방화벽 규칙 목록 조회',
			description: `제곧내`,
			resDescription: '방화벽 규칙 배열',
			...sharedOptions,
		},
	),
	c => {
		return c.json([])
	},
)

hono.openapi(
	newRoute(
		'post',
		'/{id}/rules',
		createRuleSchema,
		null,
		{
			summary: '방화벽 규칙 등록',
			description: `신규 방화벽 규칙 등록`,
			reqDescription: '새 방화벽 규칙',
			resDescription: '성공시 추가 응답 데이터 없음',
			resStatus: 201,
			...sharedOptions,
		},
	),
	_ => {
		return new Response(null, {
			status: 201,
		})
	},
)

hono.openapi(
	newRoute(
		'patch',
		'/{id}/rules/{ruleId}',
		updateRuleSchema,
		null,
		{
			summary: '방화벽 규칙 수정',
			description: `기존 방화벽 규칙 내용 수정`,
			resDescription: '성공시 추가 응답 데이터 없음',
			resStatus: 204,
			params: idRuleSchema,
			...sharedOptions,
		},
	),
	_ => {
		return new Response(null, {
			status: 204,
		})
	},
)

hono.openapi(
	newRoute('delete', '/{id}/rules/{ruleId}', null, null, {
		summary: '방화벽 규칙 삭제',
		description: `해당 방화벽 규칙을 제거`,
		resDescription: '성공시 추가 응답 데이터 없음',
		resStatus: 204,
		params: idRuleSchema,
		...sharedOptions,
	}),
	_ => {
		return new Response(null, {
			status: 204,
		})
	},
)
