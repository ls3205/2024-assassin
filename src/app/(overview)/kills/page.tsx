import Navbar from "@/components/Navbar";
import React from "react";

interface pageProps {}

const page: React.FC<pageProps> = ({}) => {
    return (
        <main className="flex min-h-screen flex-col items-center">
            <Navbar />
        </main>
    );
};

export default page;
