"use client";

import {
    CountdownUpdaterCountdownGet,
    CountdownUpdaterCountdownUpdate,
} from "@/app/actions";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Calendar } from "./ui/Calendar";
import { Button } from "./ui/Button";
import { useToast } from "./ui/use-toast";

interface CountdownUpdaterProps {}

const CountdownUpdater: React.FC<CountdownUpdaterProps> = ({}) => {
    const [zoneDate, setZoneDate] = useState<Date>();
    const [targetDate, setTargetDate] = useState<Date>();

    const { toast } = useToast();

    const { mutate: updateCountdown } = useMutation({
        mutationFn: async () => {
            if (zoneDate && targetDate) {
                const data = await CountdownUpdaterCountdownUpdate(
                    targetDate,
                    zoneDate,
                );

                return data;
            }
        },
        onSuccess: (data) => {
            return toast({
                title: "Successfully Updated Countdown Date(s)",
                description: `Targets: ${data?.dbTargetsCountdown.date.getDate()}, Zone: ${data?.dbSafezoneCountdown.date.getDate()}`,
                variant: "success",
                duration: 2000,
            });
        },
    });

    const { isLoading, error, data, isSuccess } = useQuery({
        queryKey: ["CountdownUpdaterGetDates"],
        queryFn: async () => {
            const data = await CountdownUpdaterCountdownGet();
            return data;
        },
    });

    useEffect(() => {
        if (data) {
            setZoneDate(data.dbSafezoneCountdown.date);
            setTargetDate(data.dbTargetsCountdown.date);
        }
    }, [isSuccess]);

    if (isLoading) {
        return <div>loading</div>;
    }

    return (
        <div className="relative m-4 flex md:h-96 w-[70%] flex-col md:flex-row items-center justify-center rounded-lg bg-secondary p-4">
            <div>
                <h1>Targets Countdown</h1>
                <Calendar
                    mode="single"
                    selected={targetDate}
                    onSelect={setTargetDate}
                />
            </div>
            <div>
                <h1>Safezone Countdown</h1>
                <Calendar
                    mode="single"
                    selected={zoneDate}
                    onSelect={setZoneDate}
                />
            </div>
            <Button
                className="absolute bottom-5 right-5 bg-green-500"
                onClick={() => updateCountdown()}
            >
                Apply
            </Button>
        </div>
    );
};

export default CountdownUpdater;
