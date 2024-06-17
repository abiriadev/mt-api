import { z } from 'zod'

const simplePortSchema = z
	.number()
	.int()
	.nonnegative()
	.lt(1 << 16)

const secretSchema = z.string().min(4)

const networkConfigSchema = z.object({
	host: z.string().default('api.mitigation.kr'),
	port: simplePortSchema.default(2727),
})

const authCredentialsConfigSchema = z.object({
	jwtSecret: secretSchema,
	jwtExpiry: z.string().default('4w'),
	pepper: secretSchema,
})

const dbCredentialsConfigSchema = z.object({
	dbHost: z.string().default('db'),
	dbPort: simplePortSchema.default(5432),
	dbUser: z.string().default('postgres'),
	dbPassword: secretSchema,
	dbDatabase: z.string().default('miti'),
})

const logConfigSchema = z.object({
	level: z
		.enum(['debug', 'info', 'warn', 'error'])
		.default('info'),
})

export const configSchema = z
	.object({})
	.merge(networkConfigSchema)
	.merge(authCredentialsConfigSchema)
	.merge(dbCredentialsConfigSchema)
	.merge(logConfigSchema)
