"use client";

import { ArrowRightIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/Button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { cn } from "@/lib/utils";

interface DashboardTargetPairingProps {
    userId: string;
    userName: string;
    targetId?: string;
    targetName?: string;
    status?: boolean;
}

const DashboardTargetPairing: React.FC<DashboardTargetPairingProps> = ({
    userId,
    userName,
    targetId,
    targetName,
    status,
}) => {
    const [toggled, setToggled] = useState(false);

    const { mutate: confirmKill } = useMutation({
        mutationFn: async () => {
            const payload = {
                userId: userId,
                targetId: targetId,
            };

            const { data } = await axios.put(
                "/api/admin/kills/confirm",
                payload,
            );
            return data;
        },
    });

    const handleConfirmKill = () => {
        confirmKill();
        setToggled(false);
    };

    return (
        <>
            <tr
                data-status={toggled}
                className={cn(
                    status && "text-destructive line-through",
                    "relative cursor-pointer data-[status=false]:hover:text-primary",
                )}
                onClick={() => !toggled && !status && targetId && setToggled(true)}
            >
                <td className="py-2">{userName}</td>
                <td className="py-2">
                    <ArrowRightIcon />
                </td>
                <td className="py-2">{targetName}</td>
                {toggled ? (
                    <div className="absolute left-0 top-0 flex h-full w-full flex-row items-center justify-end bg-gradient-to-l from-background from-5% to-transparent text-foreground">
                        <Button
                            className="mr-5 bg-green-400"
                            onClick={handleConfirmKill}
                        >
                            Confirm
                        </Button>
                        <Button
                            variant={"destructive"}
                            onClick={() => setToggled(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                ) : (
                    ""
                )}
            </tr>
        </>
    );
};

export default DashboardTargetPairing;
