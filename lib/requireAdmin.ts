import { redirect } from "next/navigation";
import { getCurrentUser } from "./auth";

export async function RequireAdmin() {
    const user = await getCurrentUser();
    if (!user) {
        redirect("/login")
    }
    if (user.role !== "admin") {
        redirect("/")
    }
    return user;
}