"use client";

import { BountyFormGetPlayers } from "@/app/actions";
import { useQuery } from "@tanstack/react-query";
import { User } from "next-auth";
import React from "react";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/Input";

interface BountyFormProps {
    user: Pick<User, "name" | "email" | "image"> | undefined;
}

const formSchema = z.object({
    Target: z.string().min(25).max(25),
    CreatorName: z.string(),
    Amount: z.number().positive().max(100, "Bounty must be below $100."),
});

const BountyForm: React.FC<BountyFormProps> = ({ user }) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            CreatorName: user?.name ? user.name : "",
            Amount: 0.0,
            Target: "",
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {};

    const { isLoading, error, data } = useQuery({
        queryKey: ["BountyFormDataGet"],
        queryFn: async () => {
            const data = await BountyFormGetPlayers();
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
        <>
            {data.length === 0 ? (
                <div></div>
            ) : (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="Target"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Target</FormLabel>
                                    <FormControl>
                                        <select className="text-black">
                                            <option value="" />
                                            {data.map((user) => {
                                                return (
                                                    <option value={user.id}>
                                                        {user.name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </FormControl>
                                    <FormDescription>
                                        The player you want to place a bounty on.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        ></FormField>
                        <FormField
                            control={form.control}
                            name="Amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Amount</FormLabel>
                                    <FormControl>
                                        <Input placeholder="0.00" type="number" {...field}></Input>
                                    </FormControl>
                                    <FormDescription>
                                        The amount of money you want to place on the player.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        ></FormField>
                    </form>
                </Form>
            )}
        </>
    );
};

export default BountyForm;
