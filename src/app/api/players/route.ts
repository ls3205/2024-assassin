import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const reqPlayerID = req.nextUrl.searchParams.get("player")

        if (!reqPlayerID) {
            const players = []

            const users = await db.user.findMany({
                where: {
                    role: "PLAYER"
                },
                orderBy: {
                    status: "desc"
                }
            })

            for (var user of users) {
                players.push({
                    name: user.name,
                    status: user.status
                })
            }

            return NextResponse.json(players, { status: 200 })
        }

        const session = await getAuthSession()

        if (!session) {
            return NextResponse.json(`Unauthorized`, { status: 403 })
        }

        const dbPlayer = await db.user.findFirst({
            where: {
                id: reqPlayerID,
                role: "PLAYER"
            }
        })

        if (!dbPlayer) {
            return NextResponse.json(`User Not Found`, { status: 400 })
        }

        return NextResponse.json({ name: dbPlayer.name, image: dbPlayer.image, status: dbPlayer.status }, { status: 200 })

    } catch (err) {
        return NextResponse.json(`An Error Occurred: ${err}`, { status: 500 })
    }
}