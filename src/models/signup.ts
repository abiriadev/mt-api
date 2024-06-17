import { z } from 'zod'
import { emailSchema } from '@/models/atoms/email.js'
import { passwordSchema } from '@/models/atoms/password.js'

export const signupSchema = z
	.object({
		email: emailSchema,
		password: passwordSchema,
	})
	.openapi('Signup')
