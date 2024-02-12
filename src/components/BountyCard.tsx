"use client";

import { BountyCardGetData, ConfirmBounty } from "@/app/actions";
import { Bounty, User } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import UserAvatar from "./UserAvatar";
import axios from "axios";
import { Button } from "./ui/Button";

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
        queryKey: [`BountyCardDataGet${bounty.id}`],
        queryFn: async () => {
            const data = await BountyCardGetData(bounty);
            return data;
        },
    });

    const { mutate: ConfirmBountyMutation } = useMutation({
        mutationKey: [`BountyCardConfirmBounty${bounty.id}`],
        mutationFn: async (bounty: Bounty) => {
            const data = await ConfirmBounty(bounty);
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
        <div className="m-4 flex flex-col justify-center rounded-lg bg-background p-4 text-center align-middle">
            <h1 className="text-2xl font-bold">{data.name}</h1>

            <UserAvatar
                className="mx-auto my-2 block h-28 w-28 rounded-lg"
                user={data}
            />

            <h1 className="text-xl font-semibold">
                ${bounty.amount.toFixed(2)}
            </h1>

            <h3>{`Created By: ${bounty.creatorName}`}</h3>

            <p>{fixDate(bounty.created.toLocaleString())}</p>

            {bounty.confirmed ? (
                <p className="text-green-500">Confirmed</p>
            ) : (
                <p className="italic text-red-500">Unconfirmed</p>
            )}

            {mutable ? (
                <div className="flex flex-col w-full">
                    <div className="flex flex-row w-full justify-center">
                        <Button className="m-2 bg-green-500">Confirm</Button>
                        <Button className="m-2">Unconfirm</Button>
                    </div>
                    <div className="flex flex-row w-full justify-center">
                        <Button className="m-2 bg-green-500">Complete</Button>
                        <Button className="m-2">Delete</Button>
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default BountyCard;
