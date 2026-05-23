import { AlertTriangle, ArrowLeft, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type ErrorPageProps = {
  title?: string;
  description?: string;
  onRetry?: () => void;
};

export default function ErrorPage({
  title = "Something went wrong",
  description = "An unexpected error occurred while processing your request. Please try again or come back later.",
  onRetry,
}: ErrorPageProps) {
  return (
    <div className="min-h-screen w-full bg-background text-foreground flex items-center justify-center px-6">
      <Card className="relative w-full max-w-3xl overflow-hidden border-none ring-0 bg-background/80 backdrop-blur-sm">
        <CardContent className="flex flex-col items-center text-center px-6 py-16 sm:px-10">
          {/* Icon */}
          <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full border bg-destructive/10">
            <AlertTriangle className="h-10 w-10 text-destructive" />
          </div>

          {/* Content */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {title}
            </h1>

            <p className="mx-auto max-w-xl text-sm text-muted-foreground sm:text-base md:text-lg">
              {description}
            </p>
          </div>

          {/* Actions */}
          <div className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <Button
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => {
                if (onRetry) {
                  onRetry();
                } else {
                  window.location.reload();
                }
              }}
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Try again
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
