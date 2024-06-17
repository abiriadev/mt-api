import { z } from 'zod'
import { emailSchema } from '@/models/atoms/email.js'

export const profileSchema = z
	.object({
		name: z.string().openapi({
			description: '사용자 실명',
			example: '박헌의',
		}),
		tel: z.string().openapi({
			description: '사용자 전화번호',
			example: '010-1234-5678',
		}),
		email: emailSchema,
	})
	.openapi('Profile')

export const updateProfileSchema = profileSchema
	.omit({
		name: true,
		tel: true,
	})
	.partial()
	.openapi('UpdateProfile')
