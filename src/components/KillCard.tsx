import { cn } from "@/lib/utils";
import { MoveRight, SkullIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/Button";

interface KillCardProps {
    kill: Kill;
}

const KillCard: React.FC<KillCardProps> = ({ kill }) => {
    const fixDate = (date: string) => {
        date.replace(/[-]/g, "/");
        const newDate = new Date(Date.parse(date));
        return newDate.toLocaleDateString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };

    return (
        <div className="my-2 rounded-lg bg-secondary/80 p-4">
            <table>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
                <tr>
                    <td
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "px-2 text-center",
                        )}
                    >
                        <Link href={`/players/${kill.userId}`}>
                            {kill.userName}
                        </Link>
                    </td>
                    <td className="px-2 text-center">
                        <SkullIcon />
                        <MoveRight />
                    </td>
                    <td
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "px-2 text-center",
                        )}
                    >
                        <Link href={`/players/${kill.targetId}`}>
                            {kill.targetName}
                        </Link>
                    </td>
                </tr>
            </table>
            <p className="w-full text-center text-sm text-foreground/50">
                {fixDate(kill.time.toLocaleString())}
            </p>
        </div>
    );
};

export default KillCard;
