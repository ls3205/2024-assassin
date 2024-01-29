"use client";

import { CountdownClockCountdownGet } from "@/app/actions";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

interface CountdownClockProps {
    className?: string;
    title?: string;
}

const CountdownClock: React.FC<CountdownClockProps> = ({
    className,
    title,
}) => {
    const [timeLeft, setTimeLeft] = useState<{
        targets: string;
        safezone: string;
    }>({
        targets: "Retrieving...",
        safezone: "Retrieving...",
    });

    const { isLoading, error, data } = useQuery({
        queryKey: ["GetCountdown"],
        queryFn: async () => {
            const data = await CountdownClockCountdownGet();
            return data;
        },
    });

    const getTimeString = (date: Date) => {
        const timeLeftms = date.getTime() - new Date().getTime();

        const totalSeconds = Math.floor(timeLeftms / 1000);
        const totalMinutes = Math.floor(totalSeconds / 60);
        const totalHours = Math.floor(totalMinutes / 60);
        const totalDays = Math.floor(totalHours / 24) < 10 ? `0${Math.floor(totalHours / 24)}` : Math.floor(totalHours / 24);
        const remSeconds = totalSeconds % 60 < 10 ? `0${totalSeconds % 60}` : totalSeconds % 60;
        const remMinutes = totalMinutes % 60 < 10 ? `0${totalMinutes % 60}` : totalMinutes % 60;
        const remHours = totalHours % 24 < 10 ? `0${totalHours % 24}` : totalHours % 24;

        return `${totalDays}:${remHours}:${remMinutes}:${remSeconds}`;
    };

    useEffect(() => {
        if (data) {
            const timer = setInterval(() => {
                setTimeLeft({
                    targets: getTimeString(data.dbTargetsCountdown.date),
                    safezone: getTimeString(data.dbSafezoneCountdown.date),
                });
            }, 1000);
            return () => {
                clearInterval(timer);
            };
        }
    }, [data]);

    if (isLoading) {
        return;
    }

    if (error) {
        return;
    }

    if (!data) {
        return;
    }

    return (
        <div className={cn(className, "rounded-lg p-4")}>
            {title ? <h1 className="m-4 text-4xl font-bold">{title}</h1> : ""}
            <h2 className="m-4 text-2xl font-semibold">
                New Targets In: {timeLeft?.targets}
            </h2>
            <h2 className="m-4 text-2xl font-semibold">
                New Safezone In: {timeLeft?.safezone}
            </h2>
        </div>
    );
};

export default CountdownClock;
