import { z } from 'zod'

export const emailSchema = z.string().email().openapi({
	description: '이메일 주소',
})
