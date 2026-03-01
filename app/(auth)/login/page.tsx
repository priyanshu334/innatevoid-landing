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
        <div className="min-h-screen px-6 py-4 max-w-6xl mx-auto">

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
                    </form>
                </CardContent>
                <CardFooter>
                    <p>Already have an account? <Link href="/login">Login</Link></p>
                </CardFooter>
            </Card>



        </div>
    );
}