import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    try {
        const session = await getAuthSession();

        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json(`Unauthorized`, { status: 401 })
        }

        const players = await db.user.findMany({
            where: {
                role: "PLAYER",
                status: "ALIVE"
            }
        })

        players.map(async (player) => {
            const pairing = await db.targetPairing.findFirst({
                where: {
                    targetListId: '0',
                    userId: player.id
                }
            })

            if (!pairing) {
                return NextResponse.json('No Target Pairing Found for Requested Player', { status: 500 })
            }

            const head = await db.user.update({
                where: {
                    id: player.id
                },
                data: {
                    targetId: pairing.targetId
                }
            })

            return head
        })

        return NextResponse.json(`Successfully Applied Target Pairings`, { status: 200 })
    } catch (err) {
        return NextResponse.json(`An Error Occurred: ${err}`, { status: 500 })
    }
}