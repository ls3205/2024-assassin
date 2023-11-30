import { getAuthSession } from "@/lib/auth";
import React from "react";
import UserAccountNav from "./UserAccountNav";
import ThemeDropdown from "./ThemeDropdown";
import Link from "next/link";
import { Button } from "./ui/Button";
import MobileNavbar from "./MobileNavbar";
import NavbarLinks from "./NavbarLinks";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = async ({}) => {
    const session = await getAuthSession();

    return (
        <>
            <div className="relative hidden w-full flex-row items-center justify-center md:flex">
                <div className="relative flex w-[70%] flex-row justify-center border-b-[1px] border-primary p-5">
                    <div className="relative mr-auto flex w-1/2 flex-row items-center justify-start gap-5">
                        <NavbarLinks session={session} />
                    </div>
                    <div className="relative ml-auto flex w-1/2 flex-row items-center justify-end gap-5">
                        {session?.user ? (
                            <UserAccountNav user={session.user} />
                        ) : (
                            <Button variant={"secondary"}>
                                <Link href={"sign-in"}>Sign In</Link>
                            </Button>
                        )}
                        <ThemeDropdown />
                    </div>
                </div>
            </div>

            <MobileNavbar session={session} />
        </>
    );
};

export default Navbar;
