import { z } from 'zod'
import { passwordSchema } from './password'
import { emailSchema } from './email'

export const signupSchema = z
	.object({
		email: emailSchema,
		password: passwordSchema,
	})
	.openapi('Signup')
