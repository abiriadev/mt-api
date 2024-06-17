import { prisma } from '@/services/prisma.js'
import { tunnelDown, tunnelUp } from './tunnelMgr.js'

export interface CreateTunnelServiceParam {
	authId: string
	ip: string
	serverIp: string
	comment: string | null
}

export const createTunnelService = async ({
	authId,
	ip,
	serverIp,
	comment,
}: CreateTunnelServiceParam) => {
	const { id } = await prisma.tunnel.create({
		data: {
			userId: authId,
			ip,
			serverIp,
			comment,
		},
	})

	await tunnelUp({
		interfaceId: id,
		serverIp,
		clientIp: ip,
	})
}

export interface DeleteTunnelServiceParam {
	authId: string
	id: string
}

export const deleteTunnelService = async ({
	authId,
	id: index,
}: DeleteTunnelServiceParam) => {
	const { id } = await prisma.tunnel.delete({
		where: {
			index: parseInt(index),
			userId: authId,
		},
	})

	await tunnelDown(id)
}
