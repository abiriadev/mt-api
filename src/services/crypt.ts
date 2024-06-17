// password, secrets and hash related services
import { getConfig } from './config.js'
import { hash as agHash, verify } from 'argon2'
import jwt from 'jsonwebtoken'

const { pepper, jwtSecret, jwtExpiry } = getConfig()

const agOption = {
	timeCost: 4,
	secret: Buffer.from(pepper),
}

export const hash = async (
	password: string,
): Promise<string> => await agHash(password, agOption)

export const hashVerify = async (
	password: string,
	hash: string,
): Promise<boolean> =>
	await verify(hash, password, agOption)

export const sign = async (id: string) =>
	new Promise((resolve, reject) =>
		jwt.sign(
			{},
			jwtSecret,
			{
				expiresIn: jwtExpiry,
				subject: id,
			},
			(err, token) =>
				err ? reject(err) : resolve(token),
		),
	)
