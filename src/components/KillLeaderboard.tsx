"use client";

import { KillLeaderboardGetPlayers } from "@/app/actions";
import { useQuery } from "@tanstack/react-query";
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
        return <div></div>;
    }

    return (
        <div className="relative m-4 flex md:h-[800px] md:w-1/2 flex-col items-center rounded-lg bg-secondary p-4">
            <h1 className="font-bold text-2xl">Kill Leaderboard</h1>
            <ul className="w-full p-4">
                {data?.map((head, key) => {
                    return (
                        <li className="relative flex w-full flex-row p-3 rounded-lg mb-2 bg-background/80">
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
