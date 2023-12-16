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
    const router = useRouter();

    const { isLoading, error, data } = useQuery({
        queryKey: ["TargetPairings"],
        queryFn: async () => {
            const { data } = await axios.get("/api/players");

            return data as Player[];
        },
    });

    const confirmKill = (user: Player, target: Player | undefined) => {
        if (user.id && target?.id) {
            router.push(
                `/admin/pairings/confirm?user=${user.id}&target=${target?.id}`,
            );
        }
    };

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
            {data.map((player) => {
                const target = data.find(
                    (target) => target.id === player.targetID,
                );

                return (
                    <>
                        {data[0] === player ? (
                            <Separator className="w-[225%]" />
                        ) : (
                            ""
                        )}
                        {/* <tr
                            className="cursor-pointer hover:text-primary"
                            onClick={() => confirmKill(player, target)}
                        >
                            <td className="py-2">{player.name}</td>
                            <td className="py-2">
                                <ArrowRightIcon />
                            </td>
                            <td className="py-2">{target?.name}</td>
                        </tr> */}
                        <DashboardTargetPairing targetId={target?.id} userId={player.id} userName={player.name} targetName={target?.name} />
                        {data[data.length - 1] !== player ? (
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
