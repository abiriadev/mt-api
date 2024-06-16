import { z } from 'zod'

// TODO: validate port number range
export const portSchema = z
	.number()
	.int()
	.nonnegative()
	.openapi({
		description: '사용할 포트 번호',
	})
