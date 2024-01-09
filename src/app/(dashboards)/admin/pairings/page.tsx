import Navbar from "@/components/Navbar";
import TargetPairingsForm from "@/components/TargetPairingsForm";
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
            <div className="flex h-full max-w-[95%] items-center justify-center rounded-lg bg-secondary md:max-w-[70%] m-4 p-4">
                <TargetPairingsForm />
            </div>
        </main>
    );
};

export default page;
