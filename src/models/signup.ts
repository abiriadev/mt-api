import { z } from 'zod'

export const signupSchema = z.object({
	email: z.string().email().openapi({
		description: '이메일 주소',
	}),
	password: z.string().openapi({
		description: '비밀번호',
	}),
})
