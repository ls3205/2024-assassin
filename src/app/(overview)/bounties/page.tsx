import BountyList from "@/components/BountyList";
import Navbar from "@/components/Navbar";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

interface pageProps {}

const page: React.FC<pageProps> = ({}) => {
    return (
        <main className="flex min-h-screen flex-col items-center">
            {/* <Navbar /> */}
            <div className="flex w-[95%] flex-col p-4 lg:w-[70%] lg:flex-row">
                <div className="w-full h-16 rounded-lg bg-secondary p-4 lg:w-auto">
                    <Link
                        href={"/bounties/create"}
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "w-full hover:bg-green-500 hover:text-black lg:w-auto",
                        )}
                    >
                        <Plus />
                        Create
                    </Link>
                </div>
                <BountyList />
            </div>
        </main>
    );
};

export default page;
