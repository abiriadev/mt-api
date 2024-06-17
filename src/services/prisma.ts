import { PrismaClient } from '@prisma/client'
import { getConfig } from '@/services/config.js'

const { dbHost, dbPort, dbUser, dbPassword, dbDatabase } =
	getConfig()

export const prisma = new PrismaClient({
	datasourceUrl: `postgresql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbDatabase}`,
})
