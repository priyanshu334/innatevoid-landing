import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { BookOpen, ChevronRight, Files, Home, Layout, Settings, Terminal } from "lucide-react"

const items = [
    {
        title: "Introduction",
        url: "/docs",
        icon: Home,
    },
    {
        title: "Installation",
        url: "/docs/installation",
        icon: Terminal,
    },
    {
        title: "Components",
        url: "/docs/components",
        icon: Layout,
    },
    {
        title: "Templates",
        url: "/docs/templates",
        icon: Files,
    },
    {
        title: "API Reference",
        url: "/docs/api",
        icon: BookOpen,
    },
    {
        title: "Settings",
        url: "/docs/settings",
        icon: Settings,
    },
]

export function AppSidebar() {
    return (
        <Sidebar variant="inset" collapsible="icon">
            <SidebarHeader className="h-16 border-b flex items-center px-4">
                <div className="flex items-center gap-2 font-semibold">
                    <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground">
                        <Terminal className="h-4 w-4" />
                    </div>
                    <span className="truncate">InnateVoid Docs</span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Platform</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild tooltip={item.title}>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="border-t p-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    v1.0.0
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}