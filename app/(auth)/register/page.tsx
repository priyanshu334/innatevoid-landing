"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const schema = z
    .object({
        email: z
            .string()
            .min(1, "Email is required")
            .email("Please enter a valid email"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Must include at least one uppercase letter")
            .regex(/[0-9]/, "Must include at least one number"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type RegisterSchema = z.infer<typeof schema>;

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterSchema>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: RegisterSchema) => {
        try {
            setLoading(true);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            toast.success("Account created successfully 🎉");
            router.push("/home");

            console.log(data);
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center px-6 bg-background">
            <div className="w-full max-w-md space-y-6">

                {/* Back Button */}
                <Link
                    href="/home"
                    className="flex items-center absolute top-4 left-4 gap-2 text-sm text-muted-foreground hover:text-foreground transition"
                >
                    <ArrowLeft size={16} />
                    Back to Home
                </Link>

                {/* Heading */}
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold leading-tight">
                        Join the community of{" "}
                        <span className="bg-gradient-to-r from-amber-600 to-yellow-400 bg-clip-text text-transparent">
                            builders & innovators
                        </span>
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Unlock your full potential with Innatevoid
                    </p>
                </div>

                {/* Card */}
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle>Create Account</CardTitle>
                        <CardDescription>
                            Enter your details to get started
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            {/* Email */}
                            <div className="space-y-1">
                                <Input
                                    autoFocus
                                    type="email"
                                    placeholder="Email"
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            {/* Password */}
                            <div className="space-y-1">
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    {...register("password")}
                                />
                                {errors.password && (
                                    <p className="text-sm text-red-500">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-1">
                                <Input
                                    type="password"
                                    placeholder="Confirm Password"
                                    {...register("confirmPassword")}
                                />
                                {errors.confirmPassword && (
                                    <p className="text-sm text-red-500">
                                        {errors.confirmPassword.message}
                                    </p>
                                )}
                            </div>

                            {/* Submit */}
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={loading}
                            >
                                {loading ? "Creating account..." : "Create Account"}
                            </Button>
                        </form>
                    </CardContent>

                    <CardFooter className="flex justify-center text-sm">
                        <p>
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="text-amber-600 hover:underline"
                            >
                                Login
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}