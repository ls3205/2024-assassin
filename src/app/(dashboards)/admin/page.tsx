import Navbar from "@/components/Navbar";
import SavedTargetPairings from "@/components/SavedTargetPairings";
import TargetPairings from "@/components/TargetPairings";
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
            <div className="m-4 flex min-h-[300px] w-[95%] flex-col rounded-lg bg-secondary p-4 md:w-[70%] lg:flex-row">
                <div className="m-2 h-full w-full rounded-lg bg-background p-2 lg:w-1/2">
                    <h1 className="my-2 mb-0 w-full text-center text-2xl font-semibold">
                        Active Target Pairings
                    </h1>
                    <h1 className="my-1 w-full text-center text-base font-light">
                        Click on Pairing to Confirm Kill
                    </h1>
                    <TargetPairings />
                </div>
                <div className="m-2 h-full w-full rounded-lg bg-background p-2 lg:w-1/2">
                    <h1 className="my-2 w-full text-center text-2xl font-semibold">
                        Stored Target Pairings
                    </h1>
                    <h1 className="my-1 w-full text-center text-base font-light">
                        Click on Apply at the Bottom to Apply
                    </h1>
                    <SavedTargetPairings />
                </div>
            </div>
        </main>
    );
};

export default page;
