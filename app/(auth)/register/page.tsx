"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle";

const shema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});
type RegisterSchema = z.infer<typeof shema>;
export default function RegisterPage() {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterSchema>({
        resolver: zodResolver(shema),
    });
    const onSubmit = (data: RegisterSchema) => {
        toast.success("Registered successfully")
        router.push("/home")
        console.log(data);

    };


    return (
        <div className="flex flex-col min-h-screen px-6 py-4 max-w-4xl mx-auto gap-4 items-center justify-center">
            <div className="flex items-center justify-between">
                <Link href="/home"><ArrowLeft /> Back to Home</Link>


            </div>

            <div className="flex flex-col items-center justify-center gap-4">
                <h1 className="text-3xl font-bold">Join the community of <span className="text-amber-700">builders and innovators</span></h1>
                <p className="text-muted-foreground">Unlock your full potential with Innatevoid</p>
            </div>

            <Card className="p-6">
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                    <CardDescription>Register to get access to Innatevoid</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-4">
                            <Input {...register("email")} placeholder="Email" />
                            <Input {...register("password")} placeholder="Password" />
                            <Button type="submit">Register</Button>


                        </div>
                        <div className="flex items-center justify-center gap-2">

                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    <p>Already have an account? <Link href="/login">Login</Link></p>
                </CardFooter>
            </Card>



        </div>
    );
}