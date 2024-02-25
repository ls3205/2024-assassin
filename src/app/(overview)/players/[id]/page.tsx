import Navbar from "@/components/Navbar";
import PlayerCard from "@/components/PlayerCard";
import { getAuthSession } from "@/lib/auth";
import React from "react";

interface pageProps {
    params: {
        id: string;
    };
}

const page: React.FC<pageProps> = async ({params}) => {
    const session = await getAuthSession();
    const { id } = params;

    return (
        <main className="flex min-h-screen flex-col items-center">
            {/* <Navbar /> */}
            <PlayerCard playerID={id} session={session} />
        </main>
    );
};

export default page;
