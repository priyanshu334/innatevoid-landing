import { Navbar } from "@/components/navbar";

export default function ProductLayouts({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative min-h-screen">
            <Navbar />
            <main className="pt-24">{children}</main>
        </div>
    )
}