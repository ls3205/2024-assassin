"use client";

import React from "react";
import { AlignJustifyIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/Sheet";
import UserAccountNav from "./UserAccountNav";
import { Button } from "./ui/Button";
import Link from "next/link";
import ThemeDropdown from "./ThemeDropdown";
import { Session } from "next-auth";
import NavbarLinks from "./NavbarLinks";

interface MobileNavbarProps {
    session: Session | null;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ session }) => {
    return (
        <Sheet>
            <SheetTrigger className="relative my-2 flex h-auto w-[95%] flex-row items-center justify-center rounded-md bg-secondary md:hidden">
                <AlignJustifyIcon className="absolute left-[2.5%]" />
                <div className="h-8 w-1/2 rounded-md bg-secondary"></div>
            </SheetTrigger>
            <SheetContent side={"left"} className="flex flex-col">
                <div className="relative mb-auto flex flex-col items-center space-y-8">
                    <NavbarLinks session={session} />
                </div>
                <div className="relative mt-auto flex flex-row items-center justify-center space-x-8">
                    {session?.user ? (
                        <UserAccountNav user={session.user} />
                    ) : (
                        <Button variant={"secondary"}>
                            <Link href={"sign-in"}>Sign In</Link>
                        </Button>
                    )}
                    <ThemeDropdown />
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default MobileNavbar;
