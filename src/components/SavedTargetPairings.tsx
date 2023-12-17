"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { AlertCircle, ArrowRightIcon, Loader2 } from "lucide-react";
import React from "react";
import { Separator } from "./ui/Separator";
import DashboardTargetPairing from "./DashboardTargetPairing";
import { Button } from "./ui/Button";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

interface SavedTargetPairingsProps {}

const SavedTargetPairings: React.FC<SavedTargetPairingsProps> = ({}) => {
    const { toast } = useToast();
    const router = useRouter();

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

    const { mutate: applyPairings } = useMutation({
        mutationFn: async () => {
            const { data } = await axios.put("/api/admin/pairings/apply");
            return data;
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
                title: "Applied Pairings",
                description: "Target Pairings are now Live!",
                variant: "success",
                duration: 2000,
            });

            return router.refresh();
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
        <>
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

                    const target = data.players.find(
                        (targetPlayer) => targetPlayer.id === pairing?.targetId,
                    );

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
                            {data.players[data.players.length - 1] !==
                            player ? (
                                <Separator className="w-[225%]" />
                            ) : (
                                ""
                            )}
                        </>
                    );
                })}
            </table>
            <Button
                variant={"default"}
                className="w-full bg-green-500"
                onClick={() => {
                    applyPairings();
                }}
            >
                Apply
            </Button>
        </>
    );
};

export default SavedTargetPairings;
