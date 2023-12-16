import ConfirmKill from "@/components/ConfirmKill";
import React from "react";

interface pageProps {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
}

const page: React.FC<pageProps> = ({ params, searchParams }) => {
    const user = searchParams.user as string;
    const target = searchParams.target as string;

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-black opacity-30">
            <div className="h-96 w-96 rounded-lg bg-background">
                <ConfirmKill user={user} target={target} />
            </div>
        </main>
    );
};

export default page;
