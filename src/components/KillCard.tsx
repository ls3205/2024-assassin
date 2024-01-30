import { cn } from "@/lib/utils";
import { MoveRight, SkullIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Button, buttonVariants } from "./ui/Button";
import { useToast } from "./ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

interface KillCardProps {
    kill: Kill;
    mutable?: boolean;
    className?: string;
}

const KillCard: React.FC<KillCardProps> = ({ kill, mutable = false, className }) => {
    const [toggled, setToggled] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const fixDate = (date: string) => {
        date.replace(/[-]/g, "/");
        const newDate = new Date(Date.parse(date));
        return newDate.toLocaleDateString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };

    const { mutate: undoKill } = useMutation({
        mutationFn: async () => {
            const payload = {
                kill: kill,
            };

            const { data } = await axios.patch(`/api/admin/kills`, payload);

            return data as Kill;
        },
        onError(err) {
            if (err instanceof AxiosError) {
                if (err.response?.status === 401) {
                    return toast({
                        title: "Unauthorized!",
                        variant: "destructive",
                        duration: 2000,
                    });
                }
                if (err.response?.status === 500) {
                    const target = JSON.parse(err.response.data)[0].path;
                    const res = JSON.parse(err.response.data)[0].message;

                    return toast({
                        title: "Error!",
                        description: `${target}: ${res}`,
                        variant: "destructive",
                        duration: 2000,
                    });
                }
            }

            return toast({
                title: "Error!",
                description: `Could not apply target pairings.`,
                variant: "destructive",
                duration: 2000,
            });
        },
        onSuccess: (data) => {
            toast({
                title: `Undid Kill`,
                description: ``,
                variant: "success",
                duration: 2000,
            });

            return router.refresh();
        },
    });

    const handleUndoKill = () => {
        undoKill();
        setToggled(false);
    };

    return (
        <div
            className={cn("relative my-2 rounded-lg bg-secondary/80 p-4", className)}
            onClick={() => mutable && !toggled && setToggled(true)}
        >
            <table>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
                <tr>
                    <td
                        className={cn(
                            mutable ? "" : buttonVariants({ variant: "ghost" }),
                            "px-2 text-center",
                        )}
                    >
                        {mutable ? (
                            kill.userName
                        ) : (
                            <Link href={`/players/${kill.userId}`}>
                                {kill.userName}
                            </Link>
                        )}
                    </td>
                    <td className="px-2 text-center">
                        <SkullIcon />
                        <MoveRight />
                    </td>
                    <td
                        className={cn(
                            mutable ? "" : buttonVariants({ variant: "ghost" }),
                            "px-2 text-center",
                        )}
                    >
                        {mutable ? (
                            kill.userName
                        ) : (
                            <Link href={`/players/${kill.targetId}`}>
                                {kill.targetName}
                            </Link>
                        )}
                    </td>
                </tr>
            </table>
            <p className="w-full text-center text-sm text-foreground/50">
                {fixDate(kill.time.toLocaleString())}
            </p>
            {toggled && mutable ? (
                <div className="absolute left-0 top-0 flex h-full w-full flex-row items-center justify-end bg-gradient-to-l from-background from-5% to-transparent text-foreground">
                    <Button
                        className="mr-5 bg-blue-400"
                        onClick={handleUndoKill}
                    >
                        Undo
                    </Button>
                    <Button
                        variant={"destructive"}
                        onClick={() => setToggled(false)}
                    >
                        Cancel
                    </Button>
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default KillCard;
