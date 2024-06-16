import { z } from 'zod'
import { indexableSchema } from '@/models/indexable.js'

export const paymentSchema = indexableSchema
	.extend({
		issuerCode: z.string().openapi({
			description: '기관 코드',
			example: '61',
		}),
		number: z.string().openapi({
			description: '마스킹한 카드 번호',
			example: '12345678****123*',
		}),
		cardType: z.string().openapi({
			description:
				'카드 종류입니다. 신용, 체크, 기프트 중 하나입니다.',
			example: '신용',
		}),
		ownerType: z.string().openapi({
			description:
				'카드의 소유자 타입입니다. 개인, 법인 중 하나입니다.',
			example: '개인',
		}),
	})
	.openapi('Payment')

export const createPaymentSchema = z
	.object({
		authKey: z.string().openapi({
			description: '토스 `authKey`',
			example:
				'Z_t5vOvQxrj4499PeiJcjen28-V2RyqgYTwN44Rdzk0=',
		}),
	})
	.openapi('CreatePayment')

export const paymentHistorySchema = z
	.object({
		successedAt: z.string().datetime().openapi({
			description: '결제 발생 시각',
		}),
		payment: paymentSchema,
		amount: z.number().int().nonnegative().openapi({
			description: '청구 금액',
			example: 120000,
		}),
	})
	.openapi('PaymentHistory')
