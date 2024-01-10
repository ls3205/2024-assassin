"use server"

import { db } from "@/lib/db"

export const PlayerDashboardCardGet = async (id: string) => {
    const dbPlayers = await db.user.findMany()

    const dbPlayer = await db.user.findFirst({
        where: {
            id: id
        }
    })

    if (!dbPlayer) {
        throw new Error("Player not found")
    }

    return {
        dbPlayer,
        dbPlayers
    }
}