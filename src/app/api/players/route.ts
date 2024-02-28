import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const session = await getAuthSession()

        const reqPlayerID = req.nextUrl.searchParams.get("player")

        const aliveCheck = req.nextUrl.searchParams.get("alive")

        if (!reqPlayerID) {
            const players = []
            let users

            if (aliveCheck === "true") {
                users = await db.user.findMany({
                    where: {
                        role: "PLAYER",
                        status: "ALIVE"
                    }
                })
            } else {
                users = await db.user.findMany({
                    where: {
                        role: "PLAYER"
                    },
                    orderBy: {
                        status: "desc"
                    }
                })
            }


            for (const user of users) {
                players.push({
                    name: user.name,
                    image: user.image,
                    status: user.status,
                    targetId: session?.user.role === "ADMIN" && user.targetId,
                    id: user.id,
                    killedBy: user.killedBy
                })
            }

            players.sort((a, b) => {
                return a.name!.localeCompare(b.name!);
            })

            return NextResponse.json(players, { status: 200 })
        }

        if (reqPlayerID === 'null') {
            return NextResponse.json(`Null user`, { status: 200 })
        }

        const dbPlayer = await db.user.findFirst({
            where: {
                id: reqPlayerID,
                role: reqPlayerID === '0' ? "ADMIN" : "PLAYER"
            }
        })

        if (!dbPlayer) {
            return NextResponse.json(`User Not Found`, { status: 400 })
        }

        return NextResponse.json({ name: dbPlayer.name, image: dbPlayer.image, status: dbPlayer.status, targetId: session?.user.role === "ADMIN" && dbPlayer.targetId, id: dbPlayer.id, killedBy: dbPlayer.killedBy }, { status: 200 })

    } catch (err) {
        return NextResponse.json(`An Error Occurred: ${err}`, { status: 500 })
    }
}