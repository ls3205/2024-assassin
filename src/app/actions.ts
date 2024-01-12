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
        throw new Error("Player not found!")
    }

    const dbTarget = dbPlayer.targetId ? await db.user.findFirst({
        where: {
            id: dbPlayer.targetId
        }
    }) : undefined

    const dbKiller = dbPlayer.killedBy ? await db.user.findFirst({
        where: {
            id: dbPlayer.killedBy
        }
    }) : undefined

    return {
        dbPlayer,
        dbTarget,
        dbKiller,
        dbPlayers
    }
}

export const CountdownClockCountdownGet = async () => {
    const dbTargetsCountdown = await db.countdownDate.findFirst({
        where: {
            id: 'targets'
        }
    })

    const dbSafezoneCountdown = await db.countdownDate.findFirst({
        where: {
            id: "safezone"
        }
    })

    if (!dbTargetsCountdown) {
        throw new Error("Countdown not found!")
    }

    if (!dbSafezoneCountdown) {
        throw new Error("Countdown not found!")
    }

    return {
        dbTargetsCountdown,
        dbSafezoneCountdown
    }
}