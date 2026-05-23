import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-background text-foreground flex items-center justify-center px-6">
      <Card className="w-full max-w-4xl border-none ring-0 shadow-none bg-transparent">
        <CardContent className="flex flex-col items-center text-center space-y-8 py-10">
          {/* 404 Badge */}
          <div className="rounded-full border border-border px-5 py-2 text-sm text-muted-foreground backdrop-blur-sm">
            404 Error
          </div>

          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold tracking-tight sm:text-2xl md:text-3xl lg:text-5xl">
              This page doesn't exist
            </h1>

            <p className="mx-auto max-w-2xl text-muted-foreground text-xs sm:text-lg md:text-base">
              Oops... this page seems to have wandered off.
              <br />
              It might have been moved, renamed, or decided to take a vacation.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => navigate("/")}
            >
              <Home className="mr-2 h-4 w-4" />
              Back home
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go back
            </Button>
          </div>

          {/* Decorative glow */}
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute left-1/2 top-1/2 h-100 w-100 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
