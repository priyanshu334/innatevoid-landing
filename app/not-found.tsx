import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="text-center space-y-6 max-w-md">

                {/* 404 Number */}
                <h1 className="text-7xl font-bold tracking-tight">404</h1>

                {/* Message */}
                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold">Page Not Found</h2>
                    <p className="text-muted-foreground">
                        Sorry, the page you’re looking for doesn’t exist or has been moved.
                    </p>
                </div>

                {/* Action */}
                <div className="pt-4">
                    <Button asChild size="lg">
                        <Link href="/">Go Back Home</Link>
                    </Button>
                </div>

            </div>
        </div>
    );
}