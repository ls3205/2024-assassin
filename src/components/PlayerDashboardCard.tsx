"use client";

import { Session } from "next-auth";
import React from "react";
import PlayerKillFeed from "./PlayerKillFeed";
import { redirect } from "next/navigation";
import { AlertCircle, Loader2, User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { PlayerDashboardCardGet } from "@/app/actions";
import UserInfoCard from "./UserInfoCard";

interface PlayerDashboardCardProps {
    session?: Session | null;
}

const PlayerDashboardCard: React.FC<PlayerDashboardCardProps> = ({
    session,
}) => {
    if (!session || !session.user) {
        redirect("/");
    }

    const { isLoading, error, data } = useQuery({
        queryKey: ["PlayerCard"],
        queryFn: async () => {
            const data = await PlayerDashboardCardGet(session.user.id);

            return data;
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
                    An Error Occurred Fetching Player {session.user.id}!
                </h1>
            </div>
        );
    }

    return (
        <>
            {data ? (
                <div className="m-4 flex h-[88vh] w-[95%] flex-col justify-center rounded-lg bg-secondary p-4 md:w-[70%] lg:flex-row lg:items-center">
                    <div className="flex h-full flex-col justify-center lg:w-1/2">
                        <h1 className="text-4xl font-bold">
                            {data.dbPlayer.name}
                        </h1>
                        <div className="flex flex-col justify-center rounded-lg bg-background p-4 mt-4 lg:mr-4 w-auto">
                            <h1 className="text-4xl font-bold">
                                {session.user.status === "ALIVE"
                                    ? "Target"
                                    : "Killed By"}
                            </h1>
                            {session.user.status === "ALIVE" ? (
                                <UserInfoCard
                                    user={data.dbTarget ? data.dbTarget : undefined}
                                />
                            ) : (
                                <UserInfoCard
                                    user={data.dbKiller ? data.dbKiller : undefined}
                                />
                            )}
                        </div>
                    </div>
                    <div className="h-full lg:w-1/2">
                        <PlayerKillFeed playerID={session.user.id} />
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

export default PlayerDashboardCard;
