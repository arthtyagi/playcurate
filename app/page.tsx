import Link from "next/link";
import { Button } from "@/components/ui/button";
import { YouTubeTabs } from "@/components/youtube-tabs";
import { Preview } from "@/components/preview";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-16">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-light tracking-tight">
              PlayCurate
            </h1>
            <p className="text-muted-foreground text-lg">
              Purpose-built toolkit for producers
            </p>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4">
            <Button variant="outline" size="lg" asChild className="rounded-xl px-8">
              <Link href="/curate">Curate</Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="rounded-xl px-8">
              <Link href="/vault">Vault</Link>
            </Button>
          </div>

          {/* Main Content */}
          <div className="space-y-16">
            <YouTubeTabs />
            <Preview />
          </div>
        </div>
      </div>
    </div>
  );
}
