import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { AlertCircle } from "lucide-react";
import React from "react";

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
                "flex basis-1/2 flex-row justify-center align-middle",
            )}
        >
            <AlertCircle />
                <h1 className="text-destructive">
                    
                </h1>
        </div>
        )
    }

    return (
        <div
            className={cn(
                className,
                "flex basis-1/2 flex-row justify-center align-middle",
            )}
        >
            <h1 className="text-2xl font-semibold">{user?.name}</h1>
        </div>
    );
};

export default UserInfoCard;
