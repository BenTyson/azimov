"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function Nav() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <nav className="border-b border-border/40 backdrop-blur-sm fixed top-0 w-full z-50 bg-background/80">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-xl tracking-tight">
          Clarify
        </Link>
        <div className="flex items-center gap-1">
          <Link
            href="/explore"
            className={`text-sm px-3 py-2 rounded-md transition-colors ${
              isActive("/explore")
                ? "text-foreground bg-muted"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Explore
          </Link>
          <Link
            href="/journal"
            className={`text-sm px-3 py-2 rounded-md transition-colors ${
              isActive("/journal")
                ? "text-foreground bg-muted"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Journal
          </Link>
          <div className="w-px h-6 bg-border mx-2" />
          <ThemeToggle />
          <Link href="/journal/new" className="ml-2">
            <Button size="sm">New Entry</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
