import BountyForm from "@/components/BountyForm";
import Navbar from "@/components/Navbar";
import { getAuthSession } from "@/lib/auth";
import { AlertCircleIcon } from "lucide-react";
import React from "react";

interface pageProps {}

const page: React.FC<pageProps> = async ({}) => {
    const session = await getAuthSession();

    return (
        <main className="flex min-h-screen flex-col items-center">
            {/* <Navbar /> */}
            <div className="my-4 flex w-[95%] flex-col justify-center rounded-lg bg-yellow-300 p-4 align-middle text-black md:w-[60%]">
                <h1 className="flex w-full flex-row justify-center text-center text-2xl font-bold">
                    <AlertCircleIcon className="mr-4" />
                    Notice
                </h1>
                <h3 className="text-center text-xl">
                    Money must be given to Leon before bounty is marked as
                    confirmed becomes active.
                </h3>
            </div>
            <BountyForm user={session?.user} />
        </main>
    );
};

export default page;
