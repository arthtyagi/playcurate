import Link from "next/link";
import { Button } from "@/components/ui/button";
import { YouTubeTabs } from "@/components/youtube-tabs";
import { Preview } from "@/components/preview";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-6xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-light tracking-tighter">PlayCurate</h1>
          <p className="text-sm text-muted-foreground">
            Purpose-built toolkit for producers.
          </p>
          <p className="text-sm text-muted-foreground">
            Split, chop, screw, and sample.
          </p>
        </div>

        <div className="flex justify-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/curate">Curate</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/vault">Vault</Link>
          </Button>
        </div>

        <div className="flex flex-col items-center space-y-6">
          <YouTubeTabs />
          <Preview />
        </div>
      </div>
    </div>
  );
}
