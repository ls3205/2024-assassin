import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
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
    } catch (err) {
        return NextResponse.json(`An Error Occurred: ${err}`, { status: 500 })
    }
}