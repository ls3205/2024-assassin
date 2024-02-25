"use client";

import {
    BountyCardGetData,
    CompleteBounty,
    ConfirmBounty,
    DeleteBounty,
    UnConfirmBounty,
} from "@/app/actions";
import { Bounty } from "@prisma/client";
import {
    QueryObserverResult,
    useMutation,
    useQuery,
} from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import UserAvatar from "./UserAvatar";
import { Button } from "./ui/Button";
import { useToast } from "./ui/use-toast";
import { Skeleton } from "./ui/Skeleton";
import { AvatarFallback } from "./ui/Avatar";

interface BountyCardProps {
    bounty: Bounty;
    mutable?: boolean;
    refetchFn?: () => Promise<QueryObserverResult<Bounty[], Error>>;
}

const BountyCard: React.FC<BountyCardProps> = ({
    bounty,
    mutable = false,
    refetchFn,
}) => {
    const [timeRemaining, setTimeRemaining] = useState("...");

    const { toast } = useToast();

    const [isLoadingConfirm, setIsLoadingConfirm] = useState(false);
    const [isLoadingUnConfirm, setIsLoadingUnConfirm] = useState(false);
    const [isLoadingComplete, setIsLoadingComplete] = useState(false);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);

    const fixDate = (date: string) => {
        date.replace(/[-]/g, "/");
        const newDate = new Date(Date.parse(date));
        return newDate.toLocaleDateString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };

    const getTimeString = (date: Date) => {
        const timeLeftms = date.getTime() - new Date().getTime();

        if (timeLeftms < 0) {
            return "00:00:00";
        }

        const totalSeconds = Math.floor(timeLeftms / 1000);
        const totalMinutes = Math.floor(totalSeconds / 60);
        const totalHours = Math.floor(totalMinutes / 60);
        const remSeconds =
            totalSeconds % 60 < 10
                ? `0${totalSeconds % 60}`
                : totalSeconds % 60;
        const remMinutes =
            totalMinutes % 60 < 10
                ? `0${totalMinutes % 60}`
                : totalMinutes % 60;
        const remHours =
            totalHours % 24 < 10 ? `0${totalHours % 24}` : totalHours % 24;

        return `${remHours}:${remMinutes}:${remSeconds}`;
    };

    const { isLoading, error, data } = useQuery({
        queryKey: [`BountyCardDataGet${bounty.id}`],
        queryFn: async () => {
            const data = await BountyCardGetData(bounty);
            return data;
        },
    });

    useEffect(() => {
        if (data) {
            const timer = setInterval(() => {
                setTimeRemaining(getTimeString(bounty.confirmBy));
            }, 1000);
            return () => {
                clearInterval(timer);
            };
        }
    }, [data]);

    const { mutate: ConfirmBountyMutation } = useMutation({
        mutationKey: [`BountyCardConfirmBounty${bounty.id}`],
        mutationFn: async (bounty: Bounty) => {
            const data = await ConfirmBounty(bounty);
            return data;
        },
        onError: (err) => {
            return toast({
                title: "An Error Occurred!",
                description: `${err}`,
                variant: "destructive",
                duration: 2000,
            });
        },
        onSuccess: (data) => {
            toast({
                title: "Confirmed Bounty!",
                description: `Confirmed Bounty: ${data.userId}, ${data.amount}`,
                variant: "success",
                duration: 2000,
            });

            if (refetchFn) {
                return refetchFn();
            } else {
                return;
            }
        },
    });

    const { mutate: UnConfirmBountyMutation } = useMutation({
        mutationKey: [`BountyCardUnConfirm${bounty.id}`],
        mutationFn: async (bounty: Bounty) => {
            const data = await UnConfirmBounty(bounty);
            return data;
        },
        onError: (err) => {
            return toast({
                title: "An Error Occurred!",
                description: `${err}`,
                variant: "destructive",
                duration: 2000,
            });
        },
        onSuccess: (data) => {
            toast({
                title: "Unconfirmed Bounty!",
                description: `Unconfirmed Bounty: ${data.userId}, ${data.amount}`,
                variant: "success",
                duration: 2000,
            });

            if (refetchFn) {
                return refetchFn();
            } else {
                return;
            }
        },
    });

    const { mutate: CompleteBountyMutation } = useMutation({
        mutationKey: [`BountyCardComplete${bounty.id}`],
        mutationFn: async (bounty: Bounty) => {
            const data = await CompleteBounty(bounty);
            return data;
        },
        onError: (err) => {
            return toast({
                title: "An Error Occurred!",
                description: `${err}`,
                variant: "destructive",
                duration: 2000,
            });
        },
        onSuccess: (data) => {
            toast({
                title: "Completed Bounty!",
                description: `Completed Bounty: ${data.userId}, ${data.amount}`,
                variant: "success",
                duration: 2000,
            });

            if (refetchFn) {
                return refetchFn();
            } else {
                return;
            }
        },
    });

    const { mutate: DeleteBountyMutation } = useMutation({
        mutationKey: [`BountyCardDelete${bounty.id}`],
        mutationFn: async (bounty: Bounty) => {
            const data = await DeleteBounty(bounty);
            return data;
        },
        onError: (err) => {
            return toast({
                title: "An Error Occurred!",
                description: `${err}`,
                variant: "destructive",
                duration: 2000,
            });
        },
        onSuccess: (data) => {
            toast({
                title: "Deleted Bounty!",
                description: `Deleted Bounty: ${data.userId}, ${data.amount}`,
                variant: "success",
                duration: 2000,
            });

            if (refetchFn) {
                return refetchFn();
            } else {
                return;
            }
        },
    });

    if (isLoading) {
        return (
            <div className="m-4 flex h-80 w-60 flex-col items-center justify-center space-y-1 rounded-lg bg-background p-4 text-center">
                <Skeleton className="h-8 w-44" />
                <Skeleton className="my-2 h-28 w-28 rounded-lg" />
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-44" />
                <Skeleton className="h-6 w-36" />
                <Skeleton className="h-6 w-24" />
            </div>
        );
    }

    if (error || !data) {
        return <div></div>;
    }

    return (
        <div className="min-h-80 m-4 flex w-60 flex-col items-center justify-center rounded-lg bg-background p-4">
            <h1 className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-2xl font-bold">
                {data.name}
            </h1>

            <UserAvatar
                className="mx-auto my-2 block h-28 w-28 rounded-lg"
                user={data}
            />

            <h1 className="text-xl font-semibold">
                ${bounty.amount.toFixed(2)}
            </h1>

            <h3 className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap">{`Created By: ${bounty.creatorName}`}</h3>

            <p>{fixDate(bounty.created.toLocaleString())}</p>

            {bounty.confirmed ? (
                bounty.completed ? (
                    <p className="font-bold text-green-500">Completed</p>
                ) : (
                    <p className="text-green-500">Confirmed</p>
                )
            ) : (
                <p className="italic text-red-500">Unconfirmed</p>
            )}

            {mutable ? (
                <div className="flex w-full flex-col">
                    <div className="flex w-full flex-row justify-center">
                        <Button
                            disabled={isLoadingConfirm}
                            onClick={() => ConfirmBountyMutation(bounty)}
                            className="m-2 bg-green-500"
                            variant={"secondary"}
                        >
                            Confirm
                        </Button>
                        <Button
                            disabled={isLoadingUnConfirm}
                            onClick={() => UnConfirmBountyMutation(bounty)}
                            className="m-2"
                            variant={"secondary"}
                        >
                            Unconfirm
                        </Button>
                    </div>
                    <div className="flex w-full flex-row justify-center">
                        <Button
                            disabled={isLoadingComplete}
                            onClick={() => CompleteBountyMutation(bounty)}
                            className="m-2 bg-green-500"
                            variant={"secondary"}
                        >
                            Complete
                        </Button>
                        <Button
                            disabled={isLoadingDelete}
                            onClick={() => DeleteBountyMutation(bounty)}
                            className="m-2"
                            variant={"secondary"}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            ) : bounty.confirmed ? (
                ""
            ) : (
                <div className="flex w-full flex-col justify-center align-middle">
                    <h2 className="m-4 text-center text-2xl font-semibold">
                        {timeRemaining}
                    </h2>
                </div>
            )}
        </div>
    );
};

export default BountyCard;
