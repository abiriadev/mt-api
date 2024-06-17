import { prisma } from '@/services/prisma.js'
import { z } from 'zod'
import { changePasswordSchema } from '@/models/atoms/password.js'
import {
	hashVerify,
	hash as makeHash,
} from '@/services/crypt.js'

type ChangePasswordServiceParam = z.infer<
	typeof changePasswordSchema
> & {
	authId: string
}

export const changePasswordService = async ({
	authId,
	oldPassword,
	newPassword,
}: ChangePasswordServiceParam): Promise<void | null> => {
	const userRes = await prisma.user.findUnique({
		where: {
			id: authId,
		},
	})

	if (userRes === null) return null
	const { hash } = userRes

	if (!(await hashVerify(oldPassword, hash))) return null

	await prisma.user.update({
		where: {
			id: authId,
		},
		data: {
			hash: await makeHash(newPassword),
		},
	})
}

export const deleteAccountService = async (
	authId: string,
): Promise<void> => {
	await prisma.user.delete({
		where: {
			id: authId,
		},
	})
}
