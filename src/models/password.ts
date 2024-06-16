import { z } from 'zod'

export const passwordSchema = z
	.string()
	.min(5)
	.regex(/[@$!%*#?&]/)
	.openapi({
		description:
			'비밀번호. 참고: 현재 어떠한 조건도 없음.',
		example: 'q1w2e3r4',
	})

export const changePasswordSchema = z
	.object({
		old: passwordSchema.openapi({
			description: '이전 비밀번호',
		}),
		new: passwordSchema.openapi({
			description: '새 비밀번호',
		}),
	})
	.openapi('ChangePassword')
