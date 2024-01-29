"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AlertCircle, Loader2 } from "lucide-react";
import { Session } from "next-auth";
import React from "react";
import PlayerKillFeed from "./PlayerKillFeed";

interface PlayerCardProps {
    playerID: string;
    session?: Session | null;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ playerID, session }) => {
    const { isLoading, error, data } = useQuery({
        queryKey: ["PlayerCard"],
        queryFn: async () => {
            const { data } = await axios.get(`/api/players?player=${playerID}`);
            return data as Player;
        },
    });

    if (isLoading) {
        return (
            <div className="m-4 flex h-96 w-[70%] flex-col items-center justify-center rounded-lg bg-secondary p-4">
                <Loader2 className="animate-spin text-primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="m-4 flex h-96 w-[70%] flex-col items-center justify-center rounded-lg bg-secondary p-4">
                <AlertCircle />
                <h1 className="text-destructive">
                    An Error Occurred Fetching Player {playerID}!
                </h1>
            </div>
        );
    }

    return (
        <>
            {data ? (
                <div className="m-4 flex h-[88vh] w-[95%] flex-col justify-center rounded-lg bg-secondary p-4 md:w-[70%] lg:flex-row lg:items-center">
                    <div className="flex h-full flex-col justify-center lg:w-1/2">
                        <h1 className="text-4xl font-bold">{data?.name}</h1>
                        <h2 className="text-2xl font-semibold">
                            {data.status === "ALIVE" ? "Alive" : "Dead"}
                        </h2>
                        {data.status === "DEAD" && (
                            <h2 className="text-xl font-medium">
                                Eliminated By: {}
                            </h2>
                        )}
                    </div>
                    <div className="h-full lg:w-1/2">
                        <PlayerKillFeed playerID={playerID} />
                    </div>
                </div>
            ) : (
                <div className="m-4 flex h-96 w-[70%] flex-col items-center justify-center rounded-lg bg-secondary p-4">
                    <AlertCircle className="text-destructive" />
                    <h1 className="text-destructive">我们有一个Problem</h1>
                </div>
            )}
        </>
    );
};

export default PlayerCard;
