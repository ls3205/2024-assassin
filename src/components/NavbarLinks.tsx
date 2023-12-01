"use client";

import { Session } from "next-auth";
import React from "react";
import { Button } from "./ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface NavbarLinksProps {
    session: Session | null;
}

const NavbarLinks: React.FC<NavbarLinksProps> = ({ session }) => {
    const pathname = usePathname();

    return (
        <>
            <Button variant={"ghost"}>
                <Link
                    className={cn(
                        pathname === "/" ? "text-primary" : "text-foreground",
                    )}
                    href={"/"}
                >
                    Home
                </Link>
            </Button>
            <Button variant={"ghost"}>
                <Link className={cn(pathname === "/players" ? "text-primary" : "text-foreground")} href={"/players"}>
                    Players
                </Link>
            </Button>
            <Button variant={"ghost"}>
                <Link className={cn(pathname === "/kills" ? "text-primary" : "text-foreground")} href={"/kills"}>
                    Kills
                </Link>
            </Button>
            {session?.user &&
                (session.user.role === "ADMIN" ? (
                    <Button variant={"ghost"}>
                        <Link
                            className={cn(
                                pathname === "/admin"
                                    ? "text-primary"
                                    : "text-foreground",
                            )}
                            href={"/admin"}
                        >
                            Admin Dashboard
                        </Link>
                    </Button>
                ) : (
                    <Button variant={"ghost"}>
                        <Link
                            className={cn(
                                pathname === "/player"
                                    ? "text-primary"
                                    : "text-foreground",
                            )}
                            href={"/player"}
                        >
                            Player Dashboard
                        </Link>
                    </Button>
                ))}
        </>
    );
};

export default NavbarLinks;
