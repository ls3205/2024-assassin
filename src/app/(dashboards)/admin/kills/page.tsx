import KillFeed from "@/components/KillFeed";
import Navbar from "@/components/Navbar";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

interface pageProps {}

const page: React.FC<pageProps> = async ({}) => {
    const session = await getAuthSession();
    return !session || session.user.role !== "ADMIN" ? (
        redirect("/")
    ) : (
        <main className="flex min-h-screen flex-col items-center">
            <Navbar />
            <KillFeed mutable />
        </main>
    ); 
};

export default page;
