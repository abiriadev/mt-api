import { OpenAPIHono } from '@hono/zod-openapi'
import { RouteOptions, newRoute } from '@/utils.js'
import { idRuleSchema, idSchema } from '@/models/params.js'
import {
	createTunnelSchema,
	tunnelDetailSchema,
	tunnelSchema,
	updateTunnelSchema,
} from '@/models/tunnel.js'
import {
	createRuleSchema,
	ruleSchema,
	updateRuleSchema,
} from '@/models/rule.js'
import {
	AuthContext,
	guard,
	guardOptions,
} from '@/middlewares/guard.js'
import { prisma } from '@/services/prisma.js'
import {
	createTunnelService,
	deleteTunnelService,
} from '@/services/tunnel.js'

const sharedOptions: RouteOptions = {
	...guardOptions,
	tags: ['Tunnels'],
}

const hono = new OpenAPIHono<AuthContext>()
export { hono as tunnelsRoute }

hono.use(guard)

hono.openapi(
	newRoute('get', '/', null, tunnelSchema.array(), {
		...sharedOptions,
		summary: '활성 터널 조회',
		description: `터널 목록 조회`,
		resDescription: '터널 배열',
	}),
	async c => {
		const { authId } = c.get('auth')

		const res = await prisma.tunnel.findMany({
			where: {
				userId: authId,
			},
			select: {
				index: true,
				ip: true,
				serverIp: true,
				comment: true,
			},
		})

		return c.json(res, 200)
	},
)

hono.openapi(
	newRoute('post', '/', createTunnelSchema, null, {
		...sharedOptions,
		summary: '신규 터널 생성',
		description: `주어진 정보로 새 터널 생성`,
		reqDescription: '새 터널 정보',
		resDescription: '성공시 추가 응답 데이터 없음',
	}),
	async c => {
		const { authId } = c.get('auth')
		const { ip, serverIp, comment } =
			c.req.valid('json')

		await createTunnelService({
			authId,
			ip,
			serverIp,
			comment,
		})

		return new Response(null, {
			status: 200,
		})
	},
)

hono.openapi(
	newRoute('patch', '/{id}', updateTunnelSchema, null, {
		...sharedOptions,
		summary: '터널 정보 수정',
		description: `기존 터널 정보를 수정`,
		resDescription: '성공시 추가 응답 데이터 없음',
		params: idSchema,
	}),
	async c => {
		const { authId } = c.get('auth')
		const { id } = c.req.valid('param')
		const { comment } = c.req.valid('json')

		await prisma.tunnel.update({
			where: {
				index: parseInt(id),
				userId: authId,
			},
			data: {
				comment,
			},
		})

		return new Response(null, {
			status: 200,
		})
	},
)

hono.openapi(
	newRoute('delete', '/{id}', null, null, {
		...sharedOptions,
		summary: '터널 삭제',
		description: `해당 터널을 삭제`,
		resDescription: '성공시 추가 응답 데이터 없음',
		params: idSchema,
	}),
	async c => {
		const { authId } = c.get('auth')
		const { id } = c.req.valid('param')

		await deleteTunnelService({
			authId,
			id,
		})

		return new Response(null, {
			status: 200,
		})
	},
)

hono.openapi(
	newRoute('get', '/{id}', null, tunnelDetailSchema, {
		...sharedOptions,
		summary: '터널 상세 정보 조회',
		description: `터널 통계 및 트래픽 정보 반환`,
		resDescription:
			'기존 터널 정보에 추가적으로 통계 정보 반환',
		params: idSchema,
	}),
	async c => {
		const { authId } = c.get('auth')
		const { id } = c.req.valid('param')

		const tunnel = await prisma.tunnel.findUnique({
			where: {
				index: parseInt(id),
				userId: authId,
			},
			select: {
				index: true,
				ip: true,
				serverIp: true,
				comment: true,
			},
		})

		if (tunnel === null)
			return new Response(null, {
				status: 404,
			}) as any

		return c.json({
			...tunnel,
			statistics: {
				bandwidth: [],
				inLast: 0,
				in95: 0,
				inTraffic: 0,
				outLast: 0,
				out95: 0,
				outTraffic: 0,
			},
		})
	},
)

hono.openapi(
	newRoute(
		'get',
		'/{id}/rules',
		null,
		ruleSchema.array(),
		{
			...sharedOptions,
			summary: '방화벽 규칙 목록 조회',
			description: `제곧내`,
			resDescription: '방화벽 규칙 배열',
			params: idSchema,
		},
	),
	async c => {
		const { authId } = c.get('auth')
		const { id } = c.req.valid('param')

		const res = await prisma.rule.findMany({
			where: {
				tunnel: {
					index: parseInt(id),
					userId: authId,
				},
			},
			select: {
				index: true,
				protocol: true,
				port: true,
				comment: true,
			},
		})

		return c.json(res)
	},
)

hono.openapi(
	newRoute(
		'post',
		'/{id}/rules',
		createRuleSchema,
		null,
		{
			...sharedOptions,
			summary: '방화벽 규칙 등록',
			description: `신규 방화벽 규칙 등록`,
			reqDescription: '새 방화벽 규칙',
			resDescription: '성공시 추가 응답 데이터 없음',
			params: idSchema,
		},
	),
	async c => {
		const { authId } = c.get('auth')
		const { id } = c.req.valid('param')
		const { protocol, port, comment } =
			c.req.valid('json')

		await prisma.rule.create({
			data: {
				tunnel: {
					connect: {
						index: parseInt(id),
						userId: authId,
					},
				},
				protocol,
				port,
				comment,
			},
		})

		return new Response(null, {
			status: 200,
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
			...sharedOptions,
			summary: '방화벽 규칙 수정',
			description: `기존 방화벽 규칙 내용 수정`,
			resDescription: '성공시 추가 응답 데이터 없음',
			params: idRuleSchema,
		},
	),
	async c => {
		const { authId } = c.get('auth')
		const { id, ruleId } = c.req.valid('param')
		const { comment } = c.req.valid('json')

		await prisma.rule.update({
			where: {
				index: parseInt(ruleId),
				tunnel: {
					index: parseInt(id),
					userId: authId,
				},
			},
			data: {
				comment,
			},
		})

		return new Response(null, {
			status: 200,
		})
	},
)

hono.openapi(
	newRoute('delete', '/{id}/rules/{ruleId}', null, null, {
		...sharedOptions,
		summary: '방화벽 규칙 삭제',
		description: `해당 방화벽 규칙을 제거`,
		resDescription: '성공시 추가 응답 데이터 없음',
		params: idRuleSchema,
	}),
	async c => {
		const { authId } = c.get('auth')
		const { id, ruleId } = c.req.valid('param')

		await prisma.rule.delete({
			where: {
				index: parseInt(ruleId),
				tunnel: {
					index: parseInt(id),
					userId: authId,
				},
			},
		})

		return new Response(null, {
			status: 200,
		})
	},
)
