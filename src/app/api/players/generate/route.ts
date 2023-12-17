import { NextResponse, NextRequest } from "next/server"
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

const fs = require('fs')

export async function GET(req: NextRequest) {
    try {
        // const session = await getAuthSession();
        
        // if (session?.user.role !== "ADMIN") {
        //     return NextResponse.json(`Unauthorized`, {status: 401})
        // }
        
        // const heads: Array<any> = JSON.parse(fs.readFileSync("heads.json"))
        
        // heads.map(async (head) => {
        //     const name = head.Nickname ? `${head.Nickname} ${head.LastName}` : `${head.FirstName} ${head.LastName}`

        //     const existingHead = await db.user.findFirst({
        //         where: {
        //             email: head.Email
        //         }
        //     })

        //     if (existingHead) {
        //         return existingHead
        //     }

        //     const createdHead = await db.user.create({
        //         data: {
        //             email: head.Email,
        //             password: `${head.UserID}`,
        //             name: name,
        //             role: "PLAYER",
        //             status: "ALIVE",
        //             image: `https://bbk12e1-cdn.myschoolcdn.com/ftpimages/376/user/${head.LargeFileName}`
        //         }
        //     })

        //     return createdHead
        // })

        // return NextResponse.json(`Heads Exist`, {status: 200})
    } catch (err) {
        return NextResponse.json(`An Error Occurred: ${err}`, {status: 500})
    }
}