"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import KillCard from "./KillCard";
import { AlertCircle, Loader2 } from "lucide-react";

interface PlayerKillFeedProps {
    playerID: string;
}

const PlayerKillFeed: React.FC<PlayerKillFeedProps> = ({ playerID }) => {
    const { isLoading, error, data } = useQuery({
        queryKey: ["PlayerKillFeed"],
        queryFn: async () => {
            const { data } = await axios.get(`/api/kills?player=${playerID}`);
            return data as Kill[];
        },
    });

    if (isLoading) {
        return (
            <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-background p-4">
                <Loader2 className="animate-spin text-primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-background p-4">
                <AlertCircle />
                <h1 className="text-destructive">
                    An Error Occurred Fetching Kills for Player {playerID}!
                </h1>
            </div>
        );
    }

    return (
        <div className="h-full w-full rounded-lg bg-background p-4">
            {data?.length === 0 ? (
                <div className="flex h-full w-full flex-col items-center justify-center">
                    <AlertCircle className="text-destructive" />
                    <h1 className="text-destructive">没有Kills</h1>
                </div>
            ) : (
                <ul className="h-full w-full overflow-y-scroll ">
                    {data?.map((kill) => {
                        return (
                            <li>
                                <KillCard kill={kill} />
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default PlayerKillFeed;
