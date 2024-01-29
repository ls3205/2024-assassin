"use client";

import { Session } from "next-auth";
import React from "react";
import { buttonVariants } from "./ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "./ui/NavigationMenu";

interface NavbarLinksProps {
    session: Session | null;
}

const NavbarLinks: React.FC<NavbarLinksProps> = ({ session }) => {
    const pathname = usePathname();

    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link
                        className={cn(
                            pathname === "/"
                                ? "text-primary"
                                : "text-foreground",
                            buttonVariants({ variant: "ghost" }),
                        )}
                        href={"/"}
                    >
                        Home
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link
                        className={cn(
                            pathname === "/players"
                                ? "text-primary"
                                : "text-foreground",
                            buttonVariants({ variant: "ghost" }),
                        )}
                        href={"/players"}
                    >
                        Players
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link
                        className={cn(
                            pathname === "/kills"
                                ? "text-primary"
                                : "text-foreground",
                            buttonVariants({ variant: "ghost" }),
                        )}
                        href={"/kills"}
                    >
                        Kills
                    </Link>
                </NavigationMenuItem>
                {session?.user &&
                    (session.user.role === "ADMIN" ? (
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Admin</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
                                    <li>
                                        <NavigationMenuLink>
                                            <Link
                                                className={cn(
                                                    pathname === "/admin"
                                                        ? "text-primary"
                                                        : "text-foreground",
                                                    buttonVariants({
                                                        variant: "ghost",
                                                    }),
                                                )}
                                                href={"/admin"}
                                            >
                                                Admin Dashboard
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                    <li>
                                        <NavigationMenuLink>
                                            <Link
                                                className={cn(
                                                    pathname ===
                                                        "/admin/pairings"
                                                        ? "text-primary"
                                                        : "text-foreground",
                                                    buttonVariants({
                                                        variant: "ghost",
                                                    }),
                                                )}
                                                href={"/admin/pairings"}
                                            >
                                                Target Pairings
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                    <li>
                                        <NavigationMenuLink>
                                            <Link
                                                className={cn(
                                                    pathname === "/admin/kills"
                                                        ? "text-primary"
                                                        : "text-foreground",
                                                    buttonVariants({
                                                        variant: "ghost",
                                                    }),
                                                )}
                                                href={"/admin/kills"}
                                            >
                                                Kill Manager
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                    <li>
                                        <NavigationMenuLink>
                                            <Link
                                                className={cn(
                                                    pathname === "/admin/countdowns"
                                                        ? "text-primary"
                                                        : "text-foreground",
                                                    buttonVariants({
                                                        variant: "ghost",
                                                    }),
                                                )}
                                                href={"/admin/countdowns"}
                                            >
                                                Countdown Manager
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    ) : (
                        <NavigationMenuItem>
                            <Link
                                className={cn(
                                    pathname === "/player"
                                        ? "text-primary"
                                        : "text-foreground",
                                    buttonVariants({ variant: "ghost" }),
                                )}
                                href={"/player"}
                            >
                                Player Dashboard
                            </Link>
                        </NavigationMenuItem>
                    ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
};

export default NavbarLinks;
