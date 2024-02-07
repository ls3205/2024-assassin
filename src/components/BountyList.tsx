"use client";

import { GetBounty } from "@/app/actions";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, Loader2 } from "lucide-react";
import React from "react";
import BountyCard from "./BountyCard";

interface BountyListProps {}

const BountyList: React.FC<BountyListProps> = ({}) => {
    const { isLoading, error, data } = useQuery({
        queryKey: ["BountyListDataGet"],
        queryFn: async () => {
            const data = await GetBounty();
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
                <h1 className="text-destructive">没有bounties</h1>
            </div>
        );
    }

    return (
        <>
            {data.length === 0 ? (
                <div className="mx-4 flex h-48 w-full flex-col items-center justify-center rounded-lg bg-secondary p-4">
                    <AlertCircle className="text-destructive" />
                    <h1 className="text-destructive">没有bounties</h1>
                </div>
            ) : (
                <div className=" mx-4 flex h-48 w-full flex-col items-center justify-center rounded-lg bg-secondary p-4">
                    <ul className="flex flex-row flex-wrap items-center justify-center">
                        {data.map((bounty) => {
                            return <BountyCard bounty={bounty} />;
                        })}
                    </ul>
                </div>
            )}
        </>
    );
};

export default BountyList;
