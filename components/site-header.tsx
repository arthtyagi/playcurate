"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/theme-toggle";

const navItems = [
    { label: "Home", href: "/" },
    { label: "Curate", href: "/curate" },
    { label: "Vault", href: "/vault" },
];

export default function SiteHeader() {
    const pathname = usePathname();
    const isActive = (href: string) => pathname === href;
    return (
        <header className="flex items-center justify-center p-4">
            <div className="flex items-center gap-1 bg-muted/50 rounded-full p-1 border">
                <Link href="/">
                    <Button variant="ghost" size="sm" className="rounded-full">
                        <p className="text-lg font-bold">P</p>
                    </Button>
                </Link>
                {navItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            className={cn(
                                "rounded-full",
                                isActive(item.href) && "bg-background text-foreground shadow-sm"
                            )}
                        >
                            {item.label}
                        </Button>
                    </Link>
                ))}
                <ModeToggle />
            </div>
        </header>
    );
}   