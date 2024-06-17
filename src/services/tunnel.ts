import { prisma } from '@/services/prisma.js'
import { tunnelUp } from './tunnelMgr'

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
