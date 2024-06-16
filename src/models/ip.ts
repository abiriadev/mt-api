import { z } from 'zod'

export const ipSchema = z.string().ip().openapi({
	description: '아이피 주소',
	example: '123.456.789.012',
})
