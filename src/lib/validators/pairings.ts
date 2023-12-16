import { z } from "zod"

export const PairingUpdateValidator = z.object({
    id: z.string().min(25).max(25),
    userId: z.string().min(25).max(25),
    targetId: z.string().min(25).max(25).nullable()
})

export const PairingsUpdateValidator = z.array(PairingUpdateValidator)

export type UpdatePairingsPayload = z.infer<typeof PairingsUpdateValidator>