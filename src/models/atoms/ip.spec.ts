import { expect, it } from 'vitest'
import { ipSchema } from './ip.js'
import { describe } from 'node:test'

describe('ip', () => {
	it('should not accept invalid range', () => {
		expect(
			ipSchema.safeParse('123.456.789.123').success,
		).toBe(false)
	})
})
