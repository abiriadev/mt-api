import { z } from 'zod'

export const versionSchema = z.object({
	version: z.string(),
	host: z.string(),
})
