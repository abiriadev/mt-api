import { z } from 'zod'

export const indexSchema = z
	.number()
	.int()
	.nonnegative()
	.openapi({
		description: '고유 ID',
	})
