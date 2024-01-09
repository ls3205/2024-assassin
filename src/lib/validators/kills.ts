import { z } from "zod"

export const KillConfirmValidator = z.object({
    userId: z.string().min(25).max(25),
    targetId: z.string().min(25).max(25)
})
