import { hono } from '@/app'
import { signVerify } from '@/services/crypt'
import { prisma } from '@/services/prisma'
import {
	afterAll,
	afterEach,
	beforeAll,
	beforeEach,
	describe,
	expect,
	it,
} from 'vitest'

const clearAll = async () => {
	await prisma.$transaction([prisma.user.deleteMany()])
}

beforeAll(clearAll)

afterAll(clearAll)

describe('signup', () => {
	beforeEach(clearAll)

	afterEach(clearAll)

	it('should issue a new access token when signup success', async () => {
		const res = await hono.request('/auth/signup', {
			method: 'POST',
			body: JSON.stringify({
				email: 'a@kmail.com',
				password: '12!34',
			}),
			headers: new Headers({
				'Content-Type': 'application/json',
			}),
		})

		expect(res.status).toBe(200)

		const { token } = await res.json()

		expect(signVerify(token)).toBeTruthy()
	})

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
