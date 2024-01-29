import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { AlertCircle } from "lucide-react";
import React from "react";
import UserAvatar from "./UserAvatar";

interface UserInfoCardProps {
    user?: User;
    className?: string;
}

const UserInfoCard: React.FC<UserInfoCardProps> = ({ user, className }) => {
    if (!user) {
        return (
            <div
                className={cn(
                    className,
                    "flex flex-row justify-center align-middle",
                )}
            >
                <AlertCircle />
                <h1 className="text-destructive">没有User</h1>
            </div>
        );
    }

    return (
        <div
            className={cn(
                className,
                "flex flex-row justify-start p-4 align-middle",
            )}
        >
            <h1 className="mr-4 flex flex-col justify-center text-2xl font-semibold">
                {user.name}
            </h1>
            <UserAvatar className="ml-4 h-20 w-20 rounded-sm" user={user} />
        </div>
    );
};

export default UserInfoCard;
