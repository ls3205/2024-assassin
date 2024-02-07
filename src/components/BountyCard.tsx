"use client";

import { BountyCardGetData } from "@/app/actions";
import { Bounty } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import UserAvatar from "./UserAvatar";

interface BountyCardProps {
    bounty: Bounty;
    mutable?: boolean;
}

const BountyCard: React.FC<BountyCardProps> = ({ bounty, mutable = false }) => {
    const fixDate = (date: string) => {
        date.replace(/[-]/g, "/");
        const newDate = new Date(Date.parse(date));
        return newDate.toLocaleDateString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };

    const { isLoading, error, data } = useQuery({
        queryKey: ["BountyCardDataGet"],
        queryFn: async () => {
            const data = await BountyCardGetData(bounty);
            return data;
        },
    });

    if (isLoading) {
        return <div></div>;
    }

    if (error || !data) {
        return <div></div>;
    }

    return (
        <div className="flex flex-col justify-center rounded-lg bg-primary">
            <h1 className="text-2xl font-bold">{data.name}</h1>

            <UserAvatar user={data} />

            <h3>{`Created By: ${bounty.creatorName}`}</h3>

            <p>{fixDate(bounty.created.toLocaleString())}</p>

            {bounty.confirmed ? (
                <p className="text-green-500">Confirmed</p>
            ) : (
                <p className="italic text-red-500">Unconfirmed</p>
            )}

            {mutable ? <div></div> : ""}
        </div>
    );
};

export default BountyCard;
