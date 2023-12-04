"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Button } from "./ui/Button";
import { Loader2 } from "lucide-react";
import { UpdatePairingsPayload } from "@/lib/validators/pairings";

interface TargetPairingsFormProps {}

interface CheckDuplicateState {
    id: string;
    UserID: string;
    TargetID: string;
    duplicate: boolean;
}

const TargetPairingsForm: React.FC<TargetPairingsFormProps> = ({}) => {
    const [pairings, setPairings] = useState<Pairing[]>();
    const [checkDuplicatePairs, setCheckDuplicatePairs] = useState<
        CheckDuplicateState[]
    >([]);

    const revertPairings = () => {
        const selectors = document.getElementsByClassName(
            "targetSelector",
        ) as HTMLCollectionOf<HTMLSelectElement>;

        Array.from(selectors).map((selector) => {
            selector.value = selector.id;
        });
    };

    const getTableData = () => {
        const rows = document.getElementsByClassName(
            "pairingRow",
        ) as HTMLCollectionOf<HTMLTableRowElement>;
        const pairings: Pairing[] = [];

        Array.from(rows).map((row) => {
            let pairing: Pairing = {
                id: "",
                killerID: "",
                killedID: "",
                targetListId: "",
            };

            pairing.id = row.getElementsByClassName("pairingID")[0]!.id;
            pairing.killerID = row.getElementsByClassName("userID")[0]!.id;
            pairing.killedID =
                (
                    row.getElementsByClassName(
                        "targetSelector",
                    )[0]! as HTMLSelectElement
                ).value === ""
                    ? null
                    : (
                          row.getElementsByClassName(
                              "targetSelector",
                          )[0]! as HTMLSelectElement
                      ).value;
            pairing.targetListId = row.getElementsByClassName("listID")[0]!.id;

            pairings.push(pairing);
        });

        return pairings;
    };

    const clearOpts = () => {
        const selectors = document.getElementsByClassName(
            "targetSelector",
        ) as HTMLCollectionOf<HTMLSelectElement>;

        Array.from(selectors).map((selector) => {
            selector.value = "";
        });
    };

    const setDefaults = () => {
        const selectors = document.getElementsByClassName(
            "targetSelector",
        ) as HTMLCollectionOf<HTMLSelectElement>;

        Array.from(selectors).map((selector) => {
            selector.value = selector.parentElement!.previousElementSibling!.id;
        });
    };

    const getRandomPlayer = () => {
        const player =
            data?.players[Math.floor(Math.random() * data.players.length)];

        return player;
    };

    const randomize = () => {
        const picked: string[] = [];

        const selectors = document.getElementsByClassName(
            "targetSelector",
        ) as HTMLCollectionOf<HTMLSelectElement>;

        Array.from(selectors).map((selector) => {
            var playerID = getRandomPlayer()!.id;

            if (playerID in picked) {
                playerID = getRandomPlayer()!.id;
            }

            picked.push(playerID);

            selector.value = playerID;
        });
    };

    const checkDuplicate = () => {
        const duplicates: HTMLSelectElement[] = [];

        const selectors = Array.from(
            document.getElementsByClassName(
                "targetSelector",
            ) as HTMLCollectionOf<HTMLSelectElement>,
        );

        selectors.sort((a, b) => {
            return a.value.localeCompare(b.value);
        });

        for (var i = 0; i < selectors.length - 1; i++) {
            const sel = selectors[i];
            const selp1 = selectors[i + 1];

            sel?.parentElement?.classList.remove("bg-primary");
            selp1?.parentElement?.classList.remove("bg-primary");

            if (sel!.value !== "") {
                if (sel!.value === selp1!.value) {
                    if (!duplicates.includes(sel!)) {
                        duplicates.push(sel!);
                    }

                    duplicates.push(selp1!);
                }
            }
        }

        for (var duplicate of duplicates) {
            duplicate.parentElement?.classList.add("bg-primary");
        }
    };

    const handleSave = () => {
        const tablePairings = getTableData();

        updatePairings(tablePairings);
    };

    const handleApply = () => {
        handleSave();

        applyPairings();
    };

    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ["TargetPairings"],
        queryFn: async () => {
            const pairings = (await axios.get("/api/admin/pairings"))
                .data as Pairing[];
            const players = (await axios.get("/api/players")).data as Player[];

            const data = {
                pairings,
                players,
            };

            setPairings(pairings);

            const checkPairings: CheckDuplicateState[] = [];

            for (var pairing of data.pairings) {
                checkPairings.push({
                    id: pairing.id,
                    UserID: pairing.killerID,
                    TargetID: pairing.killedID || "",
                    duplicate: false,
                });
            }

            setCheckDuplicatePairs(checkPairings);

            return data;
        },
    });

    const { mutate: updatePairings } = useMutation({
        mutationFn: async (pairings: Pairing[]) => {
            const payload: UpdatePairingsPayload = pairings;

            const { data } = await axios.put("/api/admin/pairings", payload);
            return data;
        },
    });

    const { mutate: applyPairings } = useMutation({
        mutationFn: async () => {
            const { data } = await axios.put("/api/admin/pairings/apply");
            return data;
        },
    });

    if (isLoading) {
        return (
            <div className="flex h-96 w-full flex-col items-center justify-center">
                <Loader2 className="animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="flex h-full w-full flex-col">
            <table>
                <tr>
                    <th className="px-5">ID</th>
                    <th className="px-5">Target List ID</th>
                    <th className="px-5">User</th>
                    <th className="px-5">Target</th>
                </tr>
                {pairings?.map((pairing) => {
                    const UserName = data?.players.find(
                        (player) => player.id === pairing.killerID,
                    );

                    return (
                        <tr className="pairingRow">
                            <td className="pairingID px-5 py-2" id={pairing.id}>
                                {pairing.id}
                            </td>
                            <td
                                className="listID px-5 py-2"
                                id={
                                    pairing.targetListId
                                        ? pairing.targetListId
                                        : "bruh"
                                }
                            >
                                {pairing.targetListId}
                            </td>
                            <td
                                className="userID px-5 py-2"
                                id={pairing.killerID}
                            >
                                {UserName?.name} ({pairing.killerID})
                            </td>
                            <td className="px-5 py-2">
                                <select
                                    className="targetSelector text-black"
                                    defaultValue={
                                        pairing.killedID ? pairing.killedID : ""
                                    }
                                    id={
                                        pairing.killedID ? pairing.killedID : ""
                                    }
                                    onChange={() => checkDuplicate()}
                                >
                                    <option id="" value="" />
                                    {data?.players.map((player) => {
                                        return (
                                            <option
                                                id={player.id}
                                                value={player.id}
                                            >
                                                {player.name} ({player.id})
                                            </option>
                                        );
                                    })}
                                </select>
                            </td>
                        </tr>
                    );
                })}
            </table>
            <div className="flex w-full flex-row items-center justify-end space-x-4">
                <Button
                    onClick={() => {
                        randomize();
                        checkDuplicate();
                    }}
                    className="bg-blue-400"
                >
                    Randomize
                </Button>
                <Button
                    variant={"destructive"}
                    onClick={() => {
                        setDefaults();
                        checkDuplicate();
                    }}
                >
                    Defaults
                </Button>
                <Button
                    variant={"destructive"}
                    onClick={() => {
                        clearOpts();
                        checkDuplicate();
                    }}
                >
                    Clear
                </Button>
                <Button
                    variant={"destructive"}
                    onClick={() => {
                        revertPairings();
                        checkDuplicate();
                    }}
                >
                    Revert
                </Button>
                <Button
                    variant={"secondary"}
                    onClick={() => {
                        refetch();
                        checkDuplicate();
                    }}
                >
                    Refresh
                </Button>
                <Button onClick={() => handleSave()} className="bg-blue-400">
                    Save
                </Button>
                <Button onClick={() => handleApply()} className="bg-green-400">
                    Apply
                </Button>
            </div>
        </div>
    );
};

export default TargetPairingsForm;