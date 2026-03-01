import { DocsSidebar } from "@/components/DocsSidebar";
import { Navbar } from "@/components/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background">

            <div className="container mx-auto">
                <div className="flex pt-22 lg:pt-26">
                    {/* Professional Sidebar */}
                    <DocsSidebar />

                    {/* Main Content Area */}
                    <main className="flex-1 md:ml-64 lg:ml-72 xl:ml-80 px-4 md:px-8 lg:px-12 pb-20">
                        <div className="max-w-4xl mx-auto">
                            <div className="prose prose-slate dark:prose-invert max-w-none">
                                {children}
                            </div>
                        </div>
                    </main>

                    {/* Optional Right Sidebar for Table of Contents could go here */}
                </div>
            </div>
        </div>
    )
}