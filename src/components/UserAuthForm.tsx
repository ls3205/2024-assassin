"use client";

import React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/Form";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { signIn } from "next-auth/react";

interface UserAuthFormProps {}

const formSchema = z.object({
    Email: z
        .string()
        .email("This is not a valid email.")
        .refine((e) => e.split("@")[1] !== "@trevor.org", {
            message: "This is not a valid Trevor email.",
        }),
    Password: z.string(),
});

const UserAuthForm: React.FC<UserAuthFormProps> = ({}) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            Email: "",
            Password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        signIn("credentials", {
            email: values.Email,
            password: values.Password,
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="Email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="______@trevor.org"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>Your Trevor Email</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="Password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder=""
                                    type="password"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>Your Password</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" variant={"default"}>
                    Sign In
                </Button>
            </form>
        </Form>
    );
};

export default UserAuthForm;
