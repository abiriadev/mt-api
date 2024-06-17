import { z } from 'zod'

// TODO: validate port number range
export const portSchema = z
	.number()
	.int()
	.nonnegative()
	.lt(1 << 16)
	.openapi({
		description: '사용할 포트 번호',
		example: 80,
	})
