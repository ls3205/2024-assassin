"use client";

import { ArrowRightIcon } from "lucide-react";
import React, { useState } from "react";

interface DashboardTargetPairingProps {
    userId: string;
    userName: string;
    targetId?: string;
    targetName?: string;
}

const DashboardTargetPairing: React.FC<DashboardTargetPairingProps> = ({
    userId,
    userName,
    targetId,
    targetName,
}) => {
    const [toggled, setToggled] = useState(false);

    return (
        <>
            <tr
                className="cursor-pointer hover:text-primary"
                onClick={() => setToggled(true)}
            >
                <td className="py-2">{userName}</td>
                <td className="py-2">
                    <ArrowRightIcon />
                </td>
                <td className="py-2">{targetName}</td>
            </tr>
            {toggled ? <div>bruh</div> : ""}
        </>
    );
};

export default DashboardTargetPairing;
