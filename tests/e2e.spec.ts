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

beforeEach(clearAll)

afterEach(clearAll)

afterAll(clearAll)

describe('signup', () => {
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

describe('signin', () => {
	it('should issue a valid token when credentials are correct', async () => {
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
			'/auth/signin',
			data,
		)

		expect(res2.status).toBe(200)
	})

	it('should fail when email does not match', async () => {
		const res1 = await hono.request('/auth/signup', {
			method: 'POST',
			body: JSON.stringify({
				email: 'a@kmail.com',
				password: '12!34',
			}),
			headers: new Headers({
				'Content-Type': 'application/json',
			}),
		})

		expect(res1.status).toBe(200)

		const res2 = await hono.request('/auth/signin', {
			method: 'POST',
			body: JSON.stringify({
				email: 'ab@kmail.com',
				password: '12!34',
			}),
			headers: new Headers({
				'Content-Type': 'application/json',
			}),
		})

		expect(res2.status).toBe(401)
	})

	it('should fail when password does not match', async () => {
		const res1 = await hono.request('/auth/signup', {
			method: 'POST',
			body: JSON.stringify({
				email: 'a@kmail.com',
				password: '12!34',
			}),
			headers: new Headers({
				'Content-Type': 'application/json',
			}),
		})

		expect(res1.status).toBe(200)

		const res2 = await hono.request('/auth/signin', {
			method: 'POST',
			body: JSON.stringify({
				email: 'a@kmail.com',
				password: '12!3a',
			}),
			headers: new Headers({
				'Content-Type': 'application/json',
			}),
		})

		expect(res2.status).toBe(401)
	})
})

describe('rules', () => {
	describe('create rule', () => {
		it('should find a correct tunnel based on ruleId and authId', async () => {
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

			expect(
				await hono.request('/auth/signup', data),
			).toHaveProperty('status', 200)

			const res = await hono.request(
				'/auth/signin',
				data,
			)

			expect(res.status).toBe(200)

			const { token } = await res.json()

			expect(
				await hono.request('/tunnels', {
					method: 'POST',
					body: JSON.stringify({
						ip: '123.4.5.123',
						serverIp: '123.46.79.123',
						comment: null,
					}),
					headers: new Headers({
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					}),
				}),
			).toHaveProperty('status', 200)

			const res2 = await hono.request('/tunnels', {
				method: 'GET',
				headers: new Headers({
					Authorization: `Bearer ${token}`,
				}),
			})

			expect(res2).toHaveProperty('status', 200)

			const tunnels = await res2.json()

			expect(tunnels).toHaveLength(1)

			const [{ index: tunnelIndex }] = tunnels

			expect(
				await hono.request(
					`/tunnels/${tunnelIndex}/rules`,
					{
						method: 'POST',
						body: JSON.stringify({
							protocol: 'TCP',
							port: 1234,
							comment: null,
						}),
						headers: new Headers({
							'Content-Type':
								'application/json',
							Authorization: `Bearer ${token}`,
						}),
					},
				),
			).toHaveProperty('status', 200)

			const res3 = await hono.request(
				`/tunnels/${tunnelIndex}/rules`,
				{
					method: 'GET',
					headers: new Headers({
						Authorization: `Bearer ${token}`,
					}),
				},
			)

			const rules = await res3.json()

			expect(rules).toHaveLength(1)
			expect(rules[0]).toHaveProperty('port', 1234)
		})
	})
})
