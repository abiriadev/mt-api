import { z } from 'zod'
import { indexSchema } from '.'

export const paymentSchema = z.object({
	index: indexSchema,
	issuerCode: z.string(),
	number: z.string(),
	cardType: z.string(),
	ownerType: z.string(),
})

export const createPaymentSchema = z.object({
	authKey: z.string(),
})

export const paymentHistorySchema = z.object({
	successedAt: z.string().datetime(),
	payment: paymentSchema,
	amount: z.number().int().nonnegative(),
})
