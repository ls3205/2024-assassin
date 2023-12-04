import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { PairingsUpdateValidator } from "@/lib/validators/pairings";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const session = await getAuthSession();

        const reqPlayerID = req.nextUrl.searchParams.get("player")

        if (reqPlayerID) {
            if (!session || session.user.role !== "ADMIN" || session.user.id !== reqPlayerID) {
                return NextResponse.json(`Unauthorized`, { status: 401 })
            }

            const pairing = await db.targetPairing.findFirst({
                where: {
                    targetListId: '0',
                    killerID: reqPlayerID
                }
            })

            return NextResponse.json(pairing, { status: 200 })
        }

        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json(`Unauthorized`, { status: 401 })
        }

        const pairings = await db.targetPairing.findMany({
            where: {
                targetListId: '0'
            }
        })

        return NextResponse.json(pairings, { status: 200 })
    } catch (err) {
        return NextResponse.json(`An Error Occurred: ${err}`, { status: 500 })
    }
}

export async function PUT(req: NextRequest) {
    try {
        const session = await getAuthSession();

        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json(`Unauthorized`, { status: 401 })
        }

        const body = await req.json()

        const pairings = PairingsUpdateValidator.parse(body)

        pairings.map(async (pairing) => {
            const thing = await db.targetPairing.update({
                where: {
                    id: pairing.id,
                    targetListId: '0',
                    killerID: pairing.killerID
                },
                data: {
                    killedID: pairing.killedID
                }
            })

            return thing
        })

        return NextResponse.json(`Targets Updated Successfully`, { status: 200 })
    } catch (err) {
        return NextResponse.json(`An Error Occurred: ${err}`, { status: 500 })
    }
}