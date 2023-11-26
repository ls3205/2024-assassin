"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import axios from "axios";
import { AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlayerListProps {}

const PlayerList: React.FC<PlayerListProps> = ({}) => {
    const { isLoading, error, data } = useQuery({
        queryKey: ["Players"],
        queryFn: async () => {
            const { data } = await axios.get("/api/players");
            return data as Player[];
        },
    });

    if (isLoading) {
        return (
            <div className="m-4 flex h-48 w-1/2 flex-col items-center justify-center rounded-lg bg-secondary p-4">
                <Loader2 className="animate-spin text-primary" />
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="m-4 flex h-48 w-1/2 flex-col items-center justify-center rounded-lg bg-secondary p-4">
                <AlertCircle />
                <h1 className="text-destructive">
                    An Error Occurred Fetching Players!
                </h1>
            </div>
        );
    }

    return (
        <div className="m-4 w-1/2 rounded-lg bg-secondary">
            {data.length === 0 ? (
                <div className="flex h-48 flex-col items-center justify-center">
                    <AlertCircle className="text-destructive" />
                    <h1 className="text-destructive">没有heads</h1>
                </div>
            ) : (
                <ul className="flex flex-col items-center">
                    {data.map((player, index) => {
                        return (
                            <li
                                className={cn(
                                    "p-2 text-lg",
                                    player.status === "ALIVE"
                                        ? "text-green-500"
                                        : "text-destructive line-through",
                                )}
                            >
                                {player.name}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default PlayerList;
