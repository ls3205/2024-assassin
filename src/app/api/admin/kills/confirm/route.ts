import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { KillConfirmValidator } from "@/lib/validators/kills";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    try {
        const session = await getAuthSession();

        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json(`Unauthorized`, { status: 401 })
        }

        const body = await req.json()

        const kill = KillConfirmValidator.parse(body);

        if (kill.targetId === kill.userId) {
            return NextResponse.json(`You cannot kill yourself 💀`, { status: 400 })
        }

        const user = await db.user.findFirst({
            where: {
                id: kill.userId
            }
        })

        if (!user) {
            return
        }

        const updatedUser = await db.user.update({
            where: {
                id: kill.userId
            },
            data: {
                numberKills: user?.numberKills + 1 
            }
        })

        const killedTarget = await db.user.update({
            where: {
                id: kill.targetId
            },
            data: {
                status: "DEAD",
                killedBy: kill.userId
            }
        })

        const createdKill = await db.kill.create({
            data: {
                userId: kill.userId,
                userName: user?.name!,
                targetId: kill.targetId,
                targetName: killedTarget.name
            }
        })

        const completedPairing = await db.targetPairing.update({
            where: {
                userId: kill.userId
            },
            data: {
                complete: true
            }
        })

        const deletedPairing = await db.targetPairing.delete({
            where: {
                userId: kill.targetId
            }
        })

        return NextResponse.json(createdKill, { status: 200 })
    } catch (err) {
        return NextResponse.json(`An Error Occurred: ${err}`, { status: 500 })
    }
}