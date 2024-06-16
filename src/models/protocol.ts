import { z } from 'zod'

export const protocolSchema = z
	.enum(['TCP', 'ICMP', 'IDP'])
	.openapi({
		description: '소켓 프로토콜',
	})
