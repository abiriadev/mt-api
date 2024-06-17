import { PrismaClient } from '@prisma/client'
import { getConfig } from './config'

const { dbHost, dbPort, dbUser, dbPassword, dbDatabase } =
	getConfig()

export const prisma = new PrismaClient({
	datasourceUrl: `postgresql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbDatabase}`,
})
