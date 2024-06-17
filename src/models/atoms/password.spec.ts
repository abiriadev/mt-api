import { expect, it } from 'vitest'
import { passwordSchema } from './password'
import { describe } from 'node:test'

describe('password', () => {
	it('should contain at least one special character', () => {
		expect(
			passwordSchema.safeParse('abcde').success,
		).toBe(false)

		expect(
			passwordSchema.safeParse('12!34').success,
		).toBe(true)
	})

	it('should contain at least 5 characters', () => {
		expect(
			passwordSchema.safeParse('****').success,
		).toBe(false)

		expect(
			passwordSchema.safeParse('*****').success,
		).toBe(true)
	})
})
