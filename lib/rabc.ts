export function requireRole(
    user: { role: string } | null,
    role: "admin" | "user"
) {
    if (!user || user.role !== role) {
        throw new Error("Forbidden");
    }
}