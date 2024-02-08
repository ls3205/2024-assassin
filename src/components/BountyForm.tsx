"use client";

import { BountyFormCreateBounty, BountyFormGetPlayers } from "@/app/actions";
import { useMutation, useQuery } from "@tanstack/react-query";
import { User } from "next-auth";
import React from "react";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/Input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/Select";
import { Button } from "./ui/Button";
import { useToast } from "./ui/use-toast";
import { redirect } from "next/navigation";

interface BountyFormProps {
    user: Pick<User, "name" | "email" | "image"> | undefined;
}

export const formSchema = z.object({
    Target: z.string(),
    CreatorName: z.string(),
    Amount: z.preprocess(
        (x) => Number(x),
        z
            .number()
            .positive("You cannot submit a negative bounty.")
            .min(20, "Bounty must be at least $20")
            .max(100, "Bounty must be below $100"),
    ),
});

const BountyForm: React.FC<BountyFormProps> = ({ user }) => {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            CreatorName: user?.name ? user.name : "",
            Amount: 0.0,
            Target: "",
        },
    });

    const { mutate: createBounty } = useMutation({
        mutationKey: ["BountyCardCreateBounty"],
        mutationFn: async (bounty: z.infer<typeof formSchema>) => {
            const data = await BountyFormCreateBounty(bounty);
            return data;
        },
        onError: (err) => {
            return toast({
                title: "Error!",
                description: `${err}`,
                variant: "destructive",
                duration: 2000,
            });
        },
        onSuccess: (data) => {
            toast({
                title: `Created Bounty #${data.id}`,
                description: `${data.userId}: ${data.amount}`,
                variant: "success",
                duration: 2000,
            });

            return redirect('/bounties')
        }
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        createBounty(values);
    };

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
        <div className="m-4 rounded-lg bg-secondary/80 p-4">
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
                                        <Select onValueChange={field.onChange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a Player" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {data.map((user) => {
                                                    return (
                                                        <SelectItem
                                                            value={user.id}
                                                        >
                                                            {user.name}
                                                        </SelectItem>
                                                    );
                                                })}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormDescription>
                                        The player you want to place a bounty
                                        on.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="Amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Amount</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="$0.00"
                                            type="number"
                                            {...field}
                                        ></Input>
                                    </FormControl>
                                    <FormDescription>
                                        The amount of money you want to place on
                                        the player.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="CreatorName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        {user?.name ? (
                                            <Input
                                                placeholder={
                                                    form.getValues().CreatorName
                                                }
                                                disabled
                                            />
                                        ) : (
                                            <Input
                                                placeholder="Name"
                                                disabled
                                                {...field}
                                            ></Input>
                                        )}
                                    </FormControl>
                                    <FormDescription>
                                        Your Name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" variant={"default"}>
                            Submit
                        </Button>
                    </form>
                </Form>
            )}
        </div>
    );
};

export default BountyForm;
