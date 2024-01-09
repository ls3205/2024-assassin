"use client";

import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/DropdownMenu";
import { User } from "next-auth";
import UserAvatar from "./UserAvatar";
import { Button } from "./ui/Button";
import { signOut } from "next-auth/react";

interface UserAccountNavProps {
    user: Pick<User, "name" | "email" | "image">;
}

const UserAccountNav: React.FC<UserAccountNavProps> = ({ user }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserAvatar user={user} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col items-center p-4">
                <DropdownMenuGroup className="mb-2 flex flex-col justify-start p-2">
                    <h1>{user.name}</h1>
                    <h3>{user.email}</h3>
                </DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Button variant={"destructive"} onClick={() => signOut()}>
                        Sign Out
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserAccountNav;
