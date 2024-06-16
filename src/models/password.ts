import { z } from 'zod'

export const passwordSchema = z.string().openapi({
	description: '비밀번호. 참고: 현재 어떠한 조건도 없음.',
})

export const changePasswordSchema = z
	.object({
		old: passwordSchema,
		new: passwordSchema,
	})
	.openapi('ChangePassword')
