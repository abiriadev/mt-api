import { z } from 'zod'
import { emailSchema } from '@/models/email.js'
import { passwordSchema } from '@/models/password.js'

export const signupSchema = z
	.object({
		email: emailSchema,
		password: passwordSchema,
	})
	.openapi('Signup')
