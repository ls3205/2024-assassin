import BountyList from "@/components/BountyList";
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
            {/* <Navbar /> */}
            <BountyList mutable className="w-[95%] lg:my-4 lg:w-[70%]" />
        </main>
    );
};

export default page;
