import { z } from 'zod'
import { ipSchema } from './ip'
import { indexableSchema } from './indexable'

export const tunnelSchema = indexableSchema
	.extend({
		name: z.string().openapi({
			description: '터널 이름',
		}),
		ip: ipSchema,
		serverIp: ipSchema,
		type: z.string(),
		comment: z.string().nullable(),
	})
	.openapi('Tunnel')

export const createTunnelSchema = tunnelSchema
	.omit({
		index: true,
	})
	.openapi('CreateTunnel')

export const updateTunnelSchema = createTunnelSchema
	.partial()
	.openapi('UpdateTunnel')

export const tunnelDetailSchema = tunnelSchema
	.extend({
		statistics: z.object({
			bandwidth: z.number().array(),
			inLast: z.number(),
			in95: z.number(),
			inTraffic: z.number(),
			outLast: z.number(),
			out95: z.number(),
			outTraffic: z.number(),
		}),
	})
	.openapi('TunnelDetail')
