import { createRoute } from '@hono/zod-openapi'

export type Method =
	| 'get'
	| 'post'
	| 'put'
	| 'patch'
	| 'delete'

type I = Parameters<typeof createRoute>[0]

export type RouteOptions = Partial<{
	summary: string
	description: string
	reqDescription: string
	resDescription: string
	resStatus: number
	tags: Array<string>
	query: NonNullable<I['request']>['query']
	params: NonNullable<I['request']>['params']
	security: NonNullable<I['security']>
	errors: Record<number, string>
}>

export const newRoute = <
	Res extends NonNullable<
		NonNullable<
			I['responses'][200]['content']
		>['application/json']
	>['schema'],
>(
	method: Method,
	path: I['path'],
	req:
		| NonNullable<
				NonNullable<
					NonNullable<I['request']>['body']
				>['content']['application/json']
		  >['schema']
		| null,
	res: Res | null,
	{
		summary,
		description,
		reqDescription,
		resDescription,
		resStatus,
		tags,
		query,
		params,
		security,
		errors,
	}: RouteOptions = {},
) =>
	createRoute({
		method,
		path,
		summary,
		description,
		tags,
		security,
		request: {
			query,
			params,
			body: req
				? {
						description: reqDescription,
						content: {
							'application/json': {
								schema: req,
							},
						},
					}
				: undefined,
		},
		responses: {
			[resStatus ?? 200]: {
				description: resDescription ?? '응답',
				content: res
					? {
							'application/json': {
								schema: res,
							},
						}
					: undefined,
			},
			...newErrors(errors ?? {}),
		},
	})

const newErrors = (
	errors: Record<number, string>,
): Record<number, I['responses']['']> =>
	Object.fromEntries(
		Object.entries(errors).map(
			([code, description]) => [
				code,
				{
					description,
					content: undefined,
				},
			],
		),
	)
