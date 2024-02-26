"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { Button } from "./ui/Button";
import { Loader2 } from "lucide-react";
import { UpdatePairingsPayload } from "@/lib/validators/pairings";
import { useToast } from "./ui/use-toast";

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

    const { toast } = useToast();

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
            const pairing: Pairing = {
                id: "",
                userId: "",
                targetId: "",
                targetListId: "",
                complete: false,
            };

            pairing.id = row.getElementsByClassName("pairingID")[0]!.id;
            pairing.userId = row.getElementsByClassName("userID")[0]!.id;
            pairing.targetId =
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
            let playerID: string;

            do {
                playerID = getRandomPlayer()!.id;
            } while (picked.includes(playerID));

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

        for (let i = 0; i < selectors.length - 1; i++) {
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

        for (const duplicate of duplicates) {
            duplicate.parentElement?.classList.add("bg-primary");
        }
    };

    const checkSelfPick = () => {
        const selfPicks: HTMLSelectElement[] = [];

        const selectors = Array.from(
            document.getElementsByClassName(
                "targetSelector",
            ) as HTMLCollectionOf<HTMLSelectElement>,
        );

        selectors.map((selector) => {
            selector.parentElement?.classList.remove("bg-blue-400");

            if (
                selector.value ===
                selector.parentElement?.previousElementSibling?.id
            ) {
                selfPicks.push(selector);
            }
        });

        for (const selfPick of selfPicks) {
            selfPick.parentElement?.classList.add("bg-blue-400");
        }
    };

    const checkNotPicked = () => {
        const picked: string[] = [];

        const selectors = Array.from(
            document.getElementsByClassName(
                "targetSelector",
            ) as HTMLCollectionOf<HTMLSelectElement>,
        );

        selectors.map((selector) => {
            picked.push(selector.value);
        });

        data?.players.map((player) => {
            if (!picked.includes(player.id)) {
                console.log(player.name);
            }
        });
    };

    const validate = () => {
        checkDuplicate();
        checkSelfPick();
        checkNotPicked();
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
            const players = (await axios.get("/api/players?alive=true"))
                .data as Player[];

            const data = {
                pairings,
                players,
            };

            setPairings(pairings);

            const checkPairings: CheckDuplicateState[] = [];

            for (const pairing of data.pairings) {
                checkPairings.push({
                    id: pairing.id,
                    UserID: pairing.userId,
                    TargetID: pairing.targetId || "",
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
        onError: (err) => {
            if (err instanceof AxiosError) {
                if (err.response?.status === 401) {
                    return toast({
                        title: "Unauthorized!",
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
                description: `Could not update target pairings.`,
                variant: "destructive",
                duration: 2000,
            });
        },
        onSuccess: (data) => {
            return toast({
                title: "Updated Pairings",
                description:
                    "Target Pairings have been updated, but not yet applied!",
                variant: "success",
                duration: 2000,
            });
        },
    });

    const { mutate: applyPairings } = useMutation({
        mutationFn: async () => {
            const { data } = await axios.put("/api/admin/pairings/apply");
            return data;
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
            return toast({
                title: "Applied Pairings",
                description: "Target Pairings are now Live!",
                variant: "success",
                duration: 2000,
            });
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
                        (player) => player.id === pairing.userId,
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
                                id={pairing.userId}
                            >
                                {UserName?.name} ({pairing.userId})
                            </td>
                            <td className="px-5 py-2">
                                <select
                                    className="targetSelector text-black"
                                    defaultValue={
                                        pairing.targetId ? pairing.targetId : ""
                                    }
                                    id={
                                        pairing.targetId ? pairing.targetId : ""
                                    }
                                    onChange={() => validate()}
                                >
                                    <option id="" value="" />
                                    {data?.players.map((player) => {
                                        if (player.status === "DEAD") {
                                            return;
                                        }

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
                        validate();
                    }}
                    className="bg-blue-400"
                >
                    Validate
                </Button>
                <Button
                    onClick={() => {
                        randomize();
                        validate();
                    }}
                    className="bg-blue-400"
                >
                    Randomize
                </Button>
                <Button
                    variant={"destructive"}
                    onClick={() => {
                        setDefaults();
                        validate();
                    }}
                >
                    Defaults
                </Button>
                <Button
                    variant={"destructive"}
                    onClick={() => {
                        clearOpts();
                        validate();
                    }}
                >
                    Clear
                </Button>
                <Button
                    variant={"destructive"}
                    onClick={() => {
                        revertPairings();
                        validate();
                    }}
                >
                    Revert
                </Button>
                <Button
                    variant={"secondary"}
                    onClick={() => {
                        refetch();
                        validate();
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
