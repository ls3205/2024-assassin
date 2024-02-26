"use client";

import { GetBounty } from "@/app/actions";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, Loader2 } from "lucide-react";
import React from "react";
import BountyCard from "./BountyCard";
import { cn } from "@/lib/utils";

interface BountyListProps {
    mutable?: boolean;
    className?: string;
    playerId?: string;
}

const BountyList: React.FC<BountyListProps> = ({
    mutable = false,
    className,
    playerId
}) => {
    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ["BountyListDataGet"],
        queryFn: async () => {
            const data = await GetBounty(playerId ? playerId : undefined);
            return data;
        },
    });

    if (isLoading) {
        return (
            <div
                className={cn(
                    "m-4 flex h-48 w-full flex-col items-center justify-center rounded-lg bg-secondary p-4",
                    className,
                )}
            >
                <Loader2 className="animate-spin text-primary" />
            </div>
        );
    }

    if (error || !data) {
        return (
            <div
                className={cn(
                    "m-4 flex h-48 w-full flex-col items-center justify-center rounded-lg bg-secondary p-4",
                    className,
                )}
            >
                <AlertCircle />
                <h1 className="text-destructive">没有bounties</h1>
            </div>
        );
    }

    return (
        <>
            {data.length === 0 ? (
                <div
                    className={cn(
                        "my-4 flex h-48 w-full flex-col items-center justify-center rounded-lg bg-secondary p-4 lg:mx-4 lg:my-0",
                        className,
                    )}
                >
                    <AlertCircle className="text-destructive" />
                    <h1 className="text-destructive">没有bounties</h1>
                </div>
            ) : (
                <div
                    className={cn(
                        "min-h-48 my-4 flex w-full flex-col items-center justify-center rounded-lg bg-secondary p-4 lg:mx-4 lg:my-0",
                        className,
                    )}
                >
                    <ul className="flex flex-row flex-wrap items-center justify-center">
                        {data.map((bounty) => {
                            return (
                                <BountyCard bounty={bounty} mutable={mutable} refetchFn={refetch} />
                            );
                        })}
                    </ul>
                </div>
            )}
        </>
    );
};

export default BountyList;
