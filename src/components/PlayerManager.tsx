"use client";

import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AlertCircle, Loader2 } from "lucide-react";
import React from "react";
import { Separator } from "./ui/Separator";
import {
    PlayerManagerGetPlayers,
    PlayerManagerKillPlayer,
} from "@/app/actions";
import { Button, buttonVariants } from "./ui/Button";
import { User } from "@prisma/client";
import { useToast } from "./ui/use-toast";

interface PlayerManagerProps {}

const PlayerManager: React.FC<PlayerManagerProps> = ({}) => {
    const { toast } = useToast();

    const { mutate: killPlayer } = useMutation({
        mutationFn: async (player: User) => {
            const data = await PlayerManagerKillPlayer(player);
            return data;
        },
        onSuccess: (data) => {
            return toast({
                title: "Killed Player",
                description: `System killed ${data.killedPlayer.name}`,
                variant: "success",
                duration: 2000
            })
        }
    });

    const { isLoading, error, data } = useQuery({
        queryKey: ["Players"],
        queryFn: async () => {
            const data = await PlayerManagerGetPlayers();
            return data;
        },
    });

    if (isLoading) {
        return (
            <div className="m-4 flex h-48 w-auto flex-col items-center justify-center rounded-lg bg-secondary p-4">
                <Loader2 className="animate-spin text-primary" />
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="m-4 flex h-48 w-auto flex-col items-center justify-center rounded-lg bg-secondary p-4">
                <AlertCircle />
                <h1 className="text-destructive">
                    An Error Occurred Fetching Players!
                </h1>
            </div>
        );
    }

    return (
        <div className="m-4 w-[95%] rounded-lg bg-secondary p-4 md:w-[70%]">
            {data.length === 0 ? (
                <div className="flex h-48 flex-col items-center justify-center">
                    <AlertCircle className="text-destructive" />
                    <h1 className="text-destructive">没有heads</h1>
                </div>
            ) : (
                <ul className="flex flex-row flex-wrap items-center justify-center">
                    {data.map((player, index) => {
                        return (
                            <li
                                className={cn(
                                    "group relative flex basis-[100%] flex-col items-center justify-center p-2 text-center text-lg sm:basis-1/2 md:basis-1/3 lg:basis-1/2",
                                    player.status === "ALIVE"
                                        ? "text-green-500"
                                        : "text-destructive line-through",
                                    buttonVariants({ variant: "ghost" }),
                                )}
                            >
                                <h1>{player.name}</h1>

                                <Separator className="mt-1 w-[70%] bg-background opacity-30" />
                                <div className="absolute right-5 hidden group-hover:block">
                                    <Button
                                        variant={"destructive"}
                                        onClick={() => killPlayer(player)}
                                    >
                                        Kill
                                    </Button>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default PlayerManager;
