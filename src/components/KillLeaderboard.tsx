"use client";

import { KillLeaderboardGetPlayers } from "@/app/actions";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React from "react";

interface KillLeaderboardProps {}

const KillLeaderboard: React.FC<KillLeaderboardProps> = ({}) => {
    const { isLoading, error, data } = useQuery({
        queryKey: ["KillLeaderboardGetData"],
        queryFn: async () => {
            const data = await KillLeaderboardGetPlayers();
            return data;
        },
    });

    if (isLoading) {
        return (
            <div className="relative m-4 flex flex-col justify-center items-center rounded-lg bg-secondary p-4 md:h-[400px] md:w-1/2 md:overflow-y-auto">
                <Loader2 className="text-primary" />
            </div>
        );
    }

    return (
        <div className="relative m-4 flex flex-col items-center rounded-lg bg-secondary p-4 md:h-[800px] md:w-1/2 md:overflow-y-auto">
            <h1 className="text-2xl font-bold">Kill Leaderboard</h1>
            <ul className="w-full p-4">
                {data?.map((head, key) => {
                    return (
                        <li className="relative mb-2 flex w-full flex-row rounded-lg bg-background/80 p-3">
                            <h1 className="mr-5">
                                {`${head.tie ? "T" : ""}${head.number}. ${
                                    head.name
                                }`}
                            </h1>
                            <h2 className="relative ml-auto">
                                {`${head.numberKills} Kills`}
                            </h2>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default KillLeaderboard;
