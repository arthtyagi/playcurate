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
        <header className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
                <Link href="/">
                    <Button variant="ghost" size="icon">
                        <p className="text-2xl font-bold">P</p>
                    </Button>
                </Link>
            </div>
            <div className="flex items-center gap-4">
                {navItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                        <Button variant="ghost" size="icon" className={cn(isActive(item.href) && "bg-primary text-primary-foreground")}>
                            {item.label}
                        </Button>
                    </Link>
                ))}
            </div>
            <ModeToggle />
        </header>
    );
}   