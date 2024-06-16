import { RouteParameter } from '@asteasolutions/zod-to-openapi/dist/openapi-registry'
import { createRoute } from '@hono/zod-openapi'
import { ZodType } from 'zod'

type UnwrapUnion<T, U> = T extends U ? U : Exclude<T, U>
type UnwrapUndef<T> = UnwrapUnion<T, undefined>

export type Method =
	| 'get'
	| 'post'
	| 'put'
	| 'patch'
	| 'delete'

export type RouteOptions<
	P extends RouteParameter = never,
	Q extends RouteParameter = never,
> = Partial<{
	summary: string
	description: string
	reqDescription: string
	resDescription: string
	tags: Array<string>
	query: Q
	params: P
	security: Array<Record<string, Array<string>>>
	errors: Record<number, string>
}>

export const newRoute = <
	Req extends ZodType<unknown> | null,
	Res extends ZodType<unknown> | null,
	Params extends RouteParameter,
	Queries extends RouteParameter,
>(
	method: Method,
	path: string,
	req: Req,
	res: Res,
	{
		summary,
		description,
		reqDescription,
		resDescription,
		tags,
		query,
		params,
		security,
		errors,
	}: RouteOptions<Params, Queries> = {},
) =>
	createRoute({
		method,
		path,
		summary,
		description,
		tags,
		security,
		request: {
			query: query as UnwrapUndef<Queries>,
			params: params as UnwrapUndef<Params>,
			body: (req
				? {
						description: reqDescription,
						required: true,
						content: {
							'application/json': {
								schema: req,
							},
						},
					}
				: undefined) as Req extends null
				? undefined
				: {
						description: typeof reqDescription
						required: true
						content: {
							'application/json': {
								schema: NonNullable<Req>
							}
						}
					},
		},
		responses: {
			200: {
				description: resDescription ?? '응답',
				content: (res
					? {
							'application/json': {
								schema: res,
							},
						}
					: undefined) as Res extends null
					? undefined
					: {
							'application/json': {
								schema: NonNullable<Res>
							}
						},
			},
			...newErrors(errors ?? {}),
		},
	})

const newErrors = (errors: Record<number, string>) =>
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
