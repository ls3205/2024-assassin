import { NextResponse, NextRequest } from "next/server"
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
    try {
        // const session = await getAuthSession();
        
        // if (session?.user.role !== "ADMIN") {
        //     return NextResponse.json(`Unauthorized`, {status: 401})
        // }
                
        // const players = await db.user.findMany({
        //     where: {
        //         status: "ALIVE",
        //         role: "PLAYER"
        //     }
        // })

        // players.map(async (player) => {
        //     const head = await db.targetPairing.create({
        //         data: {
        //             targetListId: '0',
        //             userId: player.id,
        //             targetId: player.id
        //         }
        //     })

        //     return head
        // })

        return NextResponse.json(`Heads Exist`, {status: 200})
    } catch (err) {
        return NextResponse.json(`An Error Occurred: ${err}`, {status: 500})
    }
}