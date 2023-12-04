import { z } from "zod"

export const PairingUpdateValidator = z.object({
    id: z.string().min(25).max(25),
    killerID: z.string().min(25).max(25),
    killedID: z.string().min(25).max(25)
})

export const PairingsUpdateValidator = z.array(PairingUpdateValidator)

export type UpdatePairingsPayload = z.infer<typeof PairingsUpdateValidator>