import { z } from 'zod'
import { indexableSchema } from '@/models/interfaces/indexable.js'
import { commentableSchema } from '@/models/interfaces/commentable.js'
import { ipSchema } from '@/models/atoms/ip.js'

export const tunnelSchema = indexableSchema
	.extend({
		ip: ipSchema,
		serverIp: ipSchema,
	})
	.extend(commentableSchema.shape)
	.openapi('Tunnel')

export const createTunnelSchema = tunnelSchema
	.omit({
		index: true,
	})
	.openapi('CreateTunnel')

export const updateTunnelSchema = commentableSchema
	.partial()
	.openapi('UpdateTunnel')

export const tunnelDetailSchema = tunnelSchema
	.extend({
		statistics: z.object({
			bandwidth: z
				.number()
				.array()
				.openapi({
					description: '트래픽 통계',
					example: [
						-2.1213203435596415,
						-6.928203230275507,
						-2.1213203435596415,
						-6.928203230275507,
						-2.1213203435596415,
						-6.928203230275507,
						-2.1213203435596415,
						-6.928203230275507,
						-2.1213203435596415,
						-6.928203230275507,
					],
				}),
			inLast: z.number().openapi({
				example: 97.58,
			}),
			in95: z.number().openapi({
				example: 97.58,
			}),
			inTraffic: z.number().openapi({
				example: 97.58,
			}),
			outLast: z.number().openapi({
				example: 102.45,
			}),
			out95: z.number().openapi({
				example: 102.45,
			}),
			outTraffic: z.number().openapi({
				example: 102.45,
			}),
		}),
	})
	.openapi('TunnelDetail')
