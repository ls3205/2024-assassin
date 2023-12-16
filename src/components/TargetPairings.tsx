"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AlertCircle, ArrowRightIcon, Loader2 } from "lucide-react";
import React from "react";
import { Button, buttonVariants } from "./ui/Button";
import { Separator } from "./ui/Separator";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DashboardTargetPairing from "./DashboardTargetPairing";

interface TargetPairingsProps {}

const TargetPairings: React.FC<TargetPairingsProps> = ({}) => {
    const { isLoading, error, data } = useQuery({
        queryKey: ["TargetPairings"],
        queryFn: async () => {
            const pairings = (await axios.get("/api/admin/pairings"))
                .data as Pairing[];
            const players = (await axios.get("/api/players")).data as Player[];

            const data = {
                pairings,
                players,
            };

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
        <table className="w-full">
            <tr>
                <th className="w-[44.44%]">User</th>
                <th className="w-[11.11%]">
                    <ArrowRightIcon />
                </th>
                <th className="w-[44.44%]">Target</th>
            </tr>
            {data.players.map((player) => {
                if (player.status === "DEAD") {
                    return;
                }

                const pairing = data.pairings.find(
                    (pairing) => pairing.userId === player.id,
                );

                const target = data.players.find((player) => {
                    if (player.targetId) {
                        player.id === pairing?.targetId;
                    }
                });

                const status = pairing?.complete;

                return (
                    <>
                        {data.players[0] === player ? (
                            <Separator className="w-[225%]" />
                        ) : (
                            ""
                        )}
                        <DashboardTargetPairing
                            targetId={target?.id}
                            userId={player.id}
                            userName={player.name}
                            targetName={target?.name}
                            status={status}
                        />
                        {data.players[data.players.length - 1] !== player ? (
                            <Separator className="w-[225%]" />
                        ) : (
                            ""
                        )}
                    </>
                );
            })}
        </table>
    );
};

export default TargetPairings;
