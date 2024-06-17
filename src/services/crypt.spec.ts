import { describe, expect, it } from 'vitest'
import { hash } from './crypt.js'

describe('crypt', () => {
	describe('hash', () => {
		it('should have a length of 97', () => {
			expect(hash('password')).resolves.toHaveLength(
				97,
			)
		})
	})
})
