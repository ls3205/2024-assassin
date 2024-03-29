"use server"

import { formSchema } from "@/components/BountyForm"
import { db } from "@/lib/db"
import { Bounty, User } from "@prisma/client"
import { z } from "zod"

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

export const CountdownUpdaterCountdownGet = async () => {
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

export const CountdownUpdaterCountdownUpdate = async (newTargetDate: Date, newZoneDate: Date) => {
    const dbTargetsCountdown = await db.countdownDate.update({
        where: {
            id: 'targets'
        },
        data: {
            date: newTargetDate
        }
    })

    const dbSafezoneCountdown = await db.countdownDate.update({
        where: {
            id: "safezone"
        },
        data: {
            date: newZoneDate
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

export const KillLeaderboardGetPlayers = async () => {
    const dbPlayers = await db.user.findMany({
        where: {
            role: "PLAYER"
        }
    })

    const sortedPlayers = dbPlayers.sort((a, b) => {
        if (a.numberKills < b.numberKills) {
            return 1;
        } else if (a.numberKills > b.numberKills) {
            return -1;
        } else {
            return 0;
        }
    })

    const dataReturn = [] as { number: number, name: string, tie: boolean, numberKills: number }[];

    for (let i = 0; i < sortedPlayers.length; i++) {
        if (!sortedPlayers[i]) {
            continue
        }

        if (sortedPlayers[i]?.numberKills === 0) {
            continue
        }

        if (i === 0) {
            if (sortedPlayers[i]!.numberKills === sortedPlayers[i + 1]!.numberKills) {
                dataReturn.push({ number: 1, name: sortedPlayers[i]!.name, tie: true, numberKills: sortedPlayers[i]!.numberKills })
                continue
            }
        }

        if (sortedPlayers[i]?.numberKills === sortedPlayers[i - 1]?.numberKills) {
            dataReturn.push({ number: dataReturn[dataReturn.length - 1]!.number, name: sortedPlayers[i]!.name, tie: true, numberKills: sortedPlayers[i]!.numberKills })
            continue
        } else if (sortedPlayers[i]?.numberKills === sortedPlayers[i + 1]?.numberKills){
            dataReturn.push({ number: i + 1, name: sortedPlayers[i]!.name, tie: true, numberKills: sortedPlayers[i]!.numberKills })
            continue
        } else {
            dataReturn.push({ number: i + 1, name: sortedPlayers[i]!.name, tie: false, numberKills: sortedPlayers[i]!.numberKills })
            continue
        }
    }

    return dataReturn;
}

export const PlayerManagerGetPlayers = async () => {
    const dbPlayers = await db.user.findMany({
        where: {
            role: "PLAYER"
        }
    })

    dbPlayers.sort((a, b) => {
        return a.name!.localeCompare(b.name!);
    })

    return dbPlayers
}

export const PlayerManagerKillPlayer = async (player: User) => {
    const killedPlayer = await db.user.update({
        where: {
            id: player.id
        },
        data: {
            killedBy: "Admin",
            status: "DEAD"
        }
    })

    const deletedPairing = await db.targetPairing.delete({
        where: {
            userId: player.id
        }
    })

    const updatedPairings = await db.targetPairing.updateMany({
        where: {
            targetId: player.id
        },
        data: {
            targetId: null
        }
    })

    const createdKill = await db.kill.create({
        data: {
            userId: "0",
            userName: "Admin",
            targetId: player.id,
            targetName: player.name
        }
    })

    return {
        killedPlayer,
        deletedPairing,
        updatedPairings,
        createdKill
    }
}

export const GetBounty = async (playerId?: string) => {
    if (playerId) {
        const dbBounties = db.bounty.findMany({
            where: {
                userId: playerId
            }
        })

        return dbBounties
    }

    const dbBounties = db.bounty.findMany({
        orderBy: {
            userId: "asc"
        }
    })

    return dbBounties
}

export const ConfirmBounty = async (bounty: Bounty) => {
    const dbBounty = await db.bounty.update({
        where: {
            id: bounty.id
        },
        data: {
            confirmed: true
        }
    })

    return dbBounty
}

export const UnConfirmBounty = async (bounty: Bounty) => {
    const dbBounty = await db.bounty.update({
        where: {
            id: bounty.id
        },
        data: {
            confirmed: false
        }
    })

    return dbBounty
}

export const CompleteBounty = async (bounty: Bounty) => {
    const dbBounty = await db.bounty.update({
        where: {
            id: bounty.id
        },
        data: {
            completed: true
        }
    })

    return dbBounty
}

export const DeleteBounty = async (bounty: Bounty) => {
    const dbBounty = await db.bounty.delete({
        where: {
            id: bounty.id
        }
    })

    return dbBounty
}

export const BountyCardGetData = async (bounty: Bounty) => {
    const dbPlayer = await db.user.findFirst({
        where: {
            id: bounty.userId
        }
    })

    return dbPlayer
}

export const BountyFormGetPlayers = async () => {
    const dbPlayers = await db.user.findMany({
        where: {
            status: "ALIVE",
            role: "PLAYER"
        },
        orderBy: {
            name: "asc"
        }
    })

    return dbPlayers
}

export const BountyFormCreateBounty = async (bounty: z.infer<typeof formSchema>) => {
    const dbBounty = await db.bounty.create({
        data: {
            creatorName: bounty.CreatorName,
            userId: bounty.Target,
            amount: bounty.Amount
        }
    })

    return dbBounty
}

export const GetPlayers = async () => {
    const dbPlayers = await db.user.findMany({
        where: {
            role: "PLAYER"
        },
        orderBy: {
            name: "asc"
        }
    })

    return dbPlayers
}