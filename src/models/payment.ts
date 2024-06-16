import { z } from 'zod'
import { indexableSchema } from './indexable'

export const paymentSchema = indexableSchema
	.extend({
		issuerCode: z.string(),
		number: z.string(),
		cardType: z.string(),
		ownerType: z.string(),
	})
	.openapi('Payment')

export const createPaymentSchema = z
	.object({
		authKey: z.string(),
	})
	.openapi('CreatePayment')

export const paymentHistorySchema = z
	.object({
		successedAt: z.string().datetime(),
		payment: paymentSchema,
		amount: z.number().int().nonnegative(),
	})
	.openapi('PaymentHistory')
