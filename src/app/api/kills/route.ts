import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const reqPlayerID = req.nextUrl.searchParams.get("player")

        if (!reqPlayerID) {
            const kills = await db.kill.findMany()

            kills.sort((a, b) => {
                const aTime = new Date(a.time).getTime()
                const bTime = new Date(b.time).getTime()

                return bTime - aTime
            })

            return NextResponse.json(kills, { status: 200 })
        }

        const kills = await db.kill.findMany({
            where: {
                userId: reqPlayerID
            }
        })

        kills.sort((a, b) => {
            const aTime = new Date(a.time).getTime()
            const bTime = new Date(b.time).getTime()

            return bTime - aTime
        })

        return NextResponse.json(kills, { status: 200 })
    } catch (err) {
        return NextResponse.json(`An Error Occurred: ${err}`, { status: 500 })
    }
}