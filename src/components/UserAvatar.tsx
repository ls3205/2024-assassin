import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { User } from "next-auth";
import { UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
    user: Pick<User, "name" | "image">;
    className?: string;
    width?: string | number;
    height?: string | number;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
    user,
    className,
    width,
    height,
}) => {
    return (
        <Avatar className={cn(className)}>
            {user.image ? (
                <AvatarImage
                    className="object-cover"
                    src={user.image}
                    width={width ? width : undefined}
                    height={height ? height : undefined}
                    alt="User Avatar"
                />
            ) : (
                <AvatarFallback className={cn(className)}>
                    <UserIcon />
                </AvatarFallback>
            )}
        </Avatar>
    );
};

export default UserAvatar;
