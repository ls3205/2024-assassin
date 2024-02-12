"use client";

import { ArrowRightIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/Button";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { cn } from "@/lib/utils";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

interface DashboardTargetPairingProps {
    userId: string;
    userName: string;
    targetId?: string;
    targetName?: string;
    status?: boolean;
    confirmable?: boolean;
}

const DashboardTargetPairing: React.FC<DashboardTargetPairingProps> = ({
    userId,
    userName,
    targetId,
    targetName,
    status,
    confirmable = false,
}) => {
    const [toggled, setToggled] = useState(false);

    const { toast } = useToast();
    const router = useRouter();

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
            return data as Kill;
        },
        onError(err) {
            if (err instanceof AxiosError) {
                if (err.response?.status === 401) {
                    return toast({
                        title: "Unauthorized!",
                        variant: "destructive",
                        duration: 2000,
                    });
                }
                if (err.response?.status === 400) {
                    return toast({
                        title: "Error!",
                        description: "You cannot kill yourself 💀",
                        variant: "destructive",
                        duration: 2000,
                    });
                }
                if (err.response?.status === 500) {
                    const target = JSON.parse(err.response.data)[0].path;
                    const res = JSON.parse(err.response.data)[0].message;

                    return toast({
                        title: "Error!",
                        description: `${target}: ${res}`,
                        variant: "destructive",
                        duration: 2000,
                    });
                }
            }

            return toast({
                title: "Error!",
                description: `Could not apply target pairings.`,
                variant: "destructive",
                duration: 2000,
            });
        },
        onSuccess: (data) => {
            toast({
                title: `Created Kill #${data.id}`,
                description: `${data.userName} → ${data.targetName}`,
                variant: "success",
                duration: 2000,
            });

            return router.push('/admin');
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
                onClick={() =>
                    !toggled &&
                    !status &&
                    targetId &&
                    confirmable &&
                    setToggled(true)
                }
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
