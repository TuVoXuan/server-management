import { Card, CardContent } from "@/components/ui/card";
import { Construction, Hammer, Rocket } from "lucide-react";

export default function UnderDevelopmentPage() {
  return (
    <div className="flex items-center justify-center bg-background px-6 py-10">
      <Card className="w-full max-w-2xl border border-dashed ring-0 bg-transparent">
        <CardContent className="flex flex-col items-center justify-center gap-6 p-10 text-center">
          {/* Icon */}
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full border bg-primary/10">
              <Construction className="h-12 w-12 text-primary" />
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">
              Page Under Development
            </h1>

            <p className="mx-auto max-w-md text-muted-foreground">
              We're currently building this page and adding new features. Please
              check back later.
            </p>
          </div>

          {/* Status */}
          <div className="grid w-full gap-4 sm:grid-cols-3">
            <div className="rounded-xl border bg-muted/40 p-4">
              <Hammer className="mx-auto mb-2 h-5 w-5 text-primary" />
              <p className="text-sm font-medium">UI in Progress</p>
            </div>

            <div className="rounded-xl border bg-muted/40 p-4">
              <Rocket className="mx-auto mb-2 h-5 w-5 text-primary" />
              <p className="text-sm font-medium">Features Coming</p>
            </div>

            <div className="rounded-xl border bg-muted/40 p-4">
              <Construction className="mx-auto mb-2 h-5 w-5 text-primary" />
              <p className="text-sm font-medium">Maintenance Mode</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
