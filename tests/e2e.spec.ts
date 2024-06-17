import { hono } from '@/app'
import { prisma } from '@/services/prisma'
import { describe } from 'node:test'
import { afterAll, beforeAll, expect, it } from 'vitest'

const clearAll = async () => {
	await prisma.$transaction([prisma.user.deleteMany()])
}

beforeAll(async () => {
	await clearAll()
})

afterAll(async () => {
	await clearAll()
})

describe('e2e', () => {
	it('should return 409 when the same email already exists', async () => {
		const data = {
			method: 'POST',
			body: JSON.stringify({
				email: 'a@kmail.com',
				password: '12!34',
			}),
			headers: new Headers({
				'Content-Type': 'application/json',
			}),
		}

		const res1 = await hono.request(
			'/auth/signup',
			data,
		)

		expect(res1.status).toBe(200)

		const res2 = await hono.request(
			'/auth/signup',
			data,
		)

		expect(res2.status).toBe(409)
	})
})
