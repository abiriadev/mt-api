// Singleton config provider

import { configSchema } from '@/models/config.js'
import { parseEnv } from 'znv'
import { z } from 'zod'
import process from 'node:process'
import * as changeCase from 'change-case'

export type ResolvedConfig = z.infer<typeof configSchema>

interface Context {
	envs: Record<string, string | undefined>
}

const resolve = (ctx: Context) =>
	Object.fromEntries(
		Object.entries(
			parseEnv(
				ctx.envs,
				Object.fromEntries(
					Object.entries(configSchema.shape).map(
						([key, schema]) => [
							changeCase.constantCase(key),
							schema,
						],
					),
				),
			),
		).map(([key, schema]) => [
			changeCase.camelCase(key),
			schema,
		]),
	) as ResolvedConfig

// Singleton
let resolvedConfig: ResolvedConfig | null = null

export const getConfig = (): ResolvedConfig => {
	if (resolvedConfig === null)
		resolvedConfig = resolve({ envs: process.env })

	return resolvedConfig
}
