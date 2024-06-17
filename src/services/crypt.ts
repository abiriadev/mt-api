// password, secrets and hash related services
import { getConfig } from './config.js'
import { hash as agHash, verify as agVerify } from 'argon2'

const { pepper } = getConfig()

const agOption = {
	timeCost: 4,
	secret: Buffer.from(pepper),
}

export const hash = async (
	password: string,
): Promise<string> => await agHash(password, agOption)

export const verify = async (
	password: string,
	hash: string,
): Promise<boolean> =>
	await agVerify(hash, password, agOption)
