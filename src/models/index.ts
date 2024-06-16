import { z } from 'zod'

export const indexSchema = z.number().int().nonnegative()
