import KillFeed from "@/components/KillFeed";
import Navbar from "@/components/Navbar";
import React from "react";

interface pageProps {}

const page: React.FC<pageProps> = ({}) => {
    return (
        <main className="flex min-h-screen flex-col items-center">
            <Navbar />
            <KillFeed />
        </main>
    );
};

export default page;
