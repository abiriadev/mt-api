import shellExecModule from 'shell-exec'
import { logger } from '@/services/logger.js'

const shellExec = (shellExecModule as any)
	.default as typeof shellExecModule

const tunnelMgrLogger = logger.getSubLogger({
	name: 'tunnel',
})

export interface TunnelUpInfo {
	interfaceId: string
	serverIp: string
	clientIp: string
}

export const tunnelUp = async ({
	interfaceId,
	serverIp,
	clientIp,
}: TunnelUpInfo) => {
	const tunnelRes = await shellExec(
		`ip tunnel add ${interfaceId} mode gre local ${serverIp} remote ${clientIp} ttl 255`,
	)

	if (tunnelRes.code !== 0) {
		// TODO: more detailed error message?
		tunnelMgrLogger.error(tunnelRes)

		// skip vnstat setting when failed
		return
	}

	const vnstatRes = await shellExec(
		`vnstat --add -i ${interfaceId}`,
	)

	if (vnstatRes.code !== 0) {
		tunnelMgrLogger.error(vnstatRes)
	}
}

export const tunnelDown = async (interfaceId: string) => {
	await shellExec(`ip tunnel del ${interfaceId}`)
	await shellExec(
		`vnstat --remove --force -i ${interfaceId}`,
	)
}
