import { z } from 'zod'
import { emailSchema } from '@/models/atoms/email.js'
import { passwordSchema } from '@/models/atoms/password.js'

export const signinSchema = z
	.object({
		email: emailSchema,
		password: passwordSchema,
	})
	.openapi('Signin')
