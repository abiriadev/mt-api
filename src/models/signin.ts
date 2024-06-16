import { z } from 'zod'
import { emailSchema } from '@/models/email.js'
import { passwordSchema } from '@/models/password.js'

export const signinSchema = z
	.object({
		email: emailSchema,
		password: passwordSchema,
	})
	.openapi('Signin')
