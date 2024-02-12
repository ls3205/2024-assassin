import BountyForm from "@/components/BountyForm";
import Navbar from "@/components/Navbar";
import { getAuthSession } from "@/lib/auth";
import React from "react";

interface pageProps {}

const page: React.FC<pageProps> = async ({}) => {
    const session = await getAuthSession()

    return (
        <main className="flex min-h-screen flex-col items-center">
            <Navbar />
            <BountyForm user={session?.user} />
        </main>
    )
};

export default page;
