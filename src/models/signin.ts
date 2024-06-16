import { z } from 'zod'
import { emailSchema } from './email'
import { passwordSchema } from './password'

export const signinSchema = z
	.object({
		email: emailSchema,
		password: passwordSchema,
	})
	.openapi('Signin')
