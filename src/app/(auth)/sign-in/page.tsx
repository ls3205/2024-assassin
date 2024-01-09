import ThemeDropdown from "@/components/ThemeDropdown";
import UserAuthForm from "@/components/UserAuthForm";
import React from "react";

interface pageProps {}

const page: React.FC<pageProps> = ({}) => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <div className="">
                <UserAuthForm />
            </div>
            <ThemeDropdown className="absolute bottom-4 right-4" />
        </main>
    );
};

export default page;
