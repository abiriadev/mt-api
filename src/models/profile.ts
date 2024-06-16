import { z } from 'zod'

export const profileSchema = z
	.object({
		name: z.string(),
		tel: z.string(),
		email: z.string().email(),
	})
	.openapi('Profile')

export const updateProfileSchema = profileSchema
	.partial()
	.openapi('UpdateProfile')
