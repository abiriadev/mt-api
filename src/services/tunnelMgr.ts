import shellExecModule from 'shell-exec'

const shellExec = (shellExecModule as any)
	.default as typeof shellExecModule

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
	await shellExec(
		`ip tunnel add ${interfaceId} mode gre local ${serverIp} remote ${clientIp} ttl 255`,
	)
	await shellExec(`vnstat --add -i ${interfaceId}`)
}

export const tunnelDown = async (interfaceId: string) => {
	await shellExec(`ip tunnel del ${interfaceId}`)
	await shellExec(
		`vnstat --remove --force -i ${interfaceId}`,
	)
}
