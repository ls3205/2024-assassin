import { getAuthSession } from "@/lib/auth";
import { getServerSideProps } from "next/dist/build/templates/pages";
import { useSearchParams } from "next/navigation";
import React from "react";

interface pageProps {
    params: {slug: string}
    searchParams: {[key: string]: string | string[] | undefined}
}

const page: React.FC<pageProps> = ({params, searchParams}) => {
    const session = getAuthSession();

    const user = searchParams.user
    const target = searchParams.target

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-black opacity-30">
            <div className="h-96 w-96 rounded-lg bg-background"></div>
        </main>
    );
};

export default page;
