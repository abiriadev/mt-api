import { prisma } from '@/services/prisma.js'
import { z } from 'zod'
import {
	profileSchema,
	updateProfileSchema,
} from '@/models/profile'

type Profile = z.infer<typeof profileSchema>
type UpdateProfile = z.infer<typeof updateProfileSchema>

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

export interface UpdateProfileServiceParam {
	authId: string
	data: UpdateProfile
}

export const updateProfileService = async ({
	authId,
	data,
}: UpdateProfileServiceParam): Promise<void | null> => {
	const res = await prisma.user.update({
		where: {
			id: authId,
		},
		data,
	})

	if (res === null) return null
}
