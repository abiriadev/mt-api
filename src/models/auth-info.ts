import { z } from 'zod'

export const authInfoSchema = z
	.object({
		token: z.string(),
	})
	.openapi('AuthInfo')
