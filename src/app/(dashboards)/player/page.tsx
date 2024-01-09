import Navbar from "@/components/Navbar";
import PlayerCard from "@/components/PlayerCard";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

interface pageProps {}

const page: React.FC<pageProps> = async ({}) => {
    const session = await getAuthSession();

    return session && session.user && session.user.id ? (
        <main className="flex min-h-screen flex-col items-center">
            <Navbar />
            <PlayerCard playerID={session.user.id} session={session} />
        </main>
    ) : (
        redirect("/")
    );
};

export default page;
