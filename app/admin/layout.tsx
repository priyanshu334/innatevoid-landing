import { Navbar } from "@/components/navbar";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return <div>
        <Navbar />
        <div className="flex pt-28">
            <aside className="hidden md:flex w-64 flex-col border-r p-4 gap-2">
                <Link className="rounded-md px-3 py-2 hover:bg-muted" href="/admin">Dashboard</Link>
                <Link className="rounded-md px-3 py-2 hover:bg-muted" href="/admin/prompts">Manage Prompts</Link>
                <Link className="rounded-md px-3 py-2 hover:bg-muted" href="/admin/prompts/create">Create Prompt</Link>
            </aside>
            {children}
        </div>
    </div>
}