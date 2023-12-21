import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
    try {
        const session = await getAuthSession();

        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json(`Unauthorized`, { status: 401 })
        }

        const { kill }: { kill: Kill } = await req.json()

        const deletedKill = await db.kill.delete({
            where: {
                id: kill.id
            }
        })

        const user = await db.user.findFirst({
            where: {
                id: kill.userId
            }
        })

        const updatedPairing = await db.targetPairing.update({
            where: {
                userId: kill.userId
            },
            data: {
                complete: false
            }
        })

        const target = await db.user.update({
            where: {
                id: kill.targetId
            },
            data: {
                status: "ALIVE",
                killedBy: null,
            }
        })

        const createdPairing = await db.targetPairing.create({
            data: {
                targetListId: '0',
                userId: kill.targetId
            }
        })

        return NextResponse.json(`Undid Kill`, { status: 200 })
    } catch (err) {
        return NextResponse.json(`An Error Occurred: ${err}`, { status: 500 })
    }
}