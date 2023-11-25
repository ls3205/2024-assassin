import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { User } from "next-auth";
import { UserIcon } from "lucide-react"

interface UserAvatarProps {
    user: Pick<User, "name" | "image">;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
    return (
        <Avatar>
            {user.image ? (
                <AvatarImage src={user.image} alt="User Avatar" />
            ) : (
                <AvatarFallback><UserIcon /></AvatarFallback>
            )}
        </Avatar>
    );
};

export default UserAvatar;
