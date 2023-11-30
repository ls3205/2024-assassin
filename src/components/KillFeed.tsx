"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import axios from "axios";
import { AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import KillCard from "./KillCard";
import Link from "next/link";
import { buttonVariants } from "./ui/Button";

interface KillFeedProps {}

const KillFeed: React.FC<KillFeedProps> = ({}) => {
    const { isLoading, error, data } = useQuery({
        queryKey: ["Kills"],
        queryFn: async () => {
            const { data } = await axios.get("/api/kills");
            return data as Kill[];
        },
    });

    if (isLoading) {
        return (
            <div className="m-4 flex h-48 w-1/2 flex-col items-center justify-center rounded-lg bg-secondary p-4">
                <Loader2 className="animate-spin text-primary" />
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="m-4 flex h-48 w-1/2 flex-col items-center justify-center rounded-lg bg-secondary p-4">
                <AlertCircle />
                <h1 className="text-destructive">
                    An Error Occurred Fetching Players!
                </h1>
            </div>
        );
    }

    return (
        <div className="m-4 h-min w-full rounded-lg bg-secondary p-4 lg:w-1/2">
            <Link
                className={cn(
                    buttonVariants({ variant: "link" }),
                    "my-2 w-full text-center text-2xl font-semibold text-foreground",
                )}
                href={"/kills"}
            >
                Kills
            </Link>
            {data?.length === 0 ? (
                <div className="flex h-48 flex-col items-center justify-center">
                    <AlertCircle className="text-destructive" />
                    <h1 className="text-destructive">没有kills</h1>
                </div>
            ) : (
                <ul className="flex flex-col items-center">
                    {data.map((kill) => {
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

export default KillFeed;