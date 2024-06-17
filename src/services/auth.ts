import { prisma } from '@/services/prisma.js'
import { Prisma } from '@prisma/client'
import { hash, sign } from '@/services/crypt.js'

export interface SignupServiceParam {
	email: string
	password: string
}

export const signupService = async ({
	email,
	password,
}: SignupServiceParam): Promise<string | null> => {
	try {
		const { id } = await prisma.user.create({
			data: {
				email,
				hash: await hash(password),
				name: '<실명> PASS placeholder',
				tel:
					'<전화번호> PASS placeholder' +
					Math.random(),
			},
		})

		return await sign(id)
	} catch (e) {
		if (
			!(
				e instanceof
				Prisma.PrismaClientKnownRequestError
			)
		)
			throw e
		if (e.code !== 'P2002') throw e

		return null
	}
}
