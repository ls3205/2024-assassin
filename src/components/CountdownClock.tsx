"use client";

import { CountdownClockCountdownGet } from "@/app/actions";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

interface CountdownClockProps {
    className?: string;
    title?: string;
}

const CountdownClock: React.FC<CountdownClockProps> = ({
    className,
    title,
}) => {
    const [date, setDate] = useState<Date>();

    const { isLoading, error, data } = useQuery({
        queryKey: ["GetCountdown"],
        queryFn: async () => {
            const data = await CountdownClockCountdownGet();
            setDate(data.date);
            return data;
        },
    });

    if (isLoading) {
        return;
    }

    if (error) {
        return;
    }

    if (!data) {
        return;
    }

    const getTimeString = () => {
        const timeLeftms = data.date.getTime() - new Date().getTime();

        const totalSeconds = Math.floor(timeLeftms / 1000);
        const totalMinutes = Math.floor(totalSeconds / 60);
        const totalHours = Math.floor(totalMinutes / 60);
        const totalDays = Math.floor(totalHours / 24)
        const remSeconds = totalSeconds % 60;
        const remMinutes = totalMinutes % 60;
        const remHours = totalHours % 24

        return `${totalDays}:${remHours}:${remMinutes}:${remSeconds}`;
    };

    return (
        <div className={cn(className, "rounded-lg p-4")}>
            <h1 className="m-4 text-4xl font-bold">{title}</h1>
            <h2 className="m-4 text-2xl font-semibold">
                Next Update At: {data.date.toLocaleDateString()}
            </h2>
            <h2 className="m-4 text-2xl font-semibold">
                In: {getTimeString()}
            </h2>
        </div>
    );
};

export default CountdownClock;
