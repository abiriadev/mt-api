import { prisma } from '@/services/prisma.js'
import { z } from 'zod'
import { profileSchema } from '@/models/profile'

type Profile = z.infer<typeof profileSchema>

export interface FetchProfileServiceParam {
	authId: string
}

export const fetchProfileService = async ({
	authId,
}: FetchProfileServiceParam): Promise<Profile | null> => {
	const res = await prisma.user.findUnique({
		where: {
			id: authId,
		},
	})

	if (res === null) return null
	const { name, tel, email } = res

	return {
		name,
		tel,
		email,
	}
}
