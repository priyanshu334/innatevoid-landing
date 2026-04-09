import { db } from "@/lib/db"
import { contact } from "@/lib/schema"
import { desc } from "drizzle-orm"
import { Mail, Calendar, User } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default async function ContactQueriesPage() {
    const queries = await db.select().from(contact).orderBy(desc(contact.createdAt))

    return (
        <div className="w-full p-6 md:p-10 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Contact Queries</h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        {queries.length} message{queries.length !== 1 ? "s" : ""} received
                    </p>
                </div>
                <Badge variant="secondary" className="text-sm px-3 py-1">
                    {queries.length} total
                </Badge>
            </div>

            {queries.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground gap-3">
                    <Mail className="h-12 w-12 opacity-30" />
                    <p className="text-lg">No contact queries yet.</p>
                </div>
            ) : (
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    <span className="flex items-center gap-1"><User className="h-4 w-4" />Name</span>
                                </TableHead>
                                <TableHead>
                                    <span className="flex items-center gap-1"><Mail className="h-4 w-4" />Email</span>
                                </TableHead>
                                <TableHead>Message</TableHead>
                                <TableHead>
                                    <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />Received</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {queries.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell>
                                        <a
                                            href={`mailto:${item.email}`}
                                            className="text-primary underline-offset-4 hover:underline"
                                        >
                                            {item.email}
                                        </a>
                                    </TableCell>
                                    <TableCell className="max-w-md">
                                        <p className="text-sm text-muted-foreground line-clamp-3 whitespace-pre-wrap">
                                            {item.message}
                                        </p>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-sm whitespace-nowrap">
                                        {new Date(item.createdAt).toLocaleDateString("en-IN", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    )
}