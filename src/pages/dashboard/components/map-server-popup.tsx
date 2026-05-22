import { Button } from "@/components/ui/button";
import type { IServer } from "@/types";

export function LocationPopupContent({
  server,
  canViewOthers,
}: {
  server: IServer;
  canViewOthers?: boolean;
}) {
  return (
    <div className="space-y-2">
      <p className="font-semibold text-base">{server.name}</p>

      <div className="mt-2 space-y-1 text-sm">
        <div className="flex justify-between gap-3">
          <span className="text-muted-foreground">IP:</span>
          <span>{server.IP_address}</span>
        </div>

        <div className="flex justify-between gap-3">
          <span className="text-muted-foreground">Country:</span>
          <span>{server.location?.name}</span>
        </div>
      </div>

      {canViewOthers && (
        <Button size={"sm"} className="w-full">
          View others
        </Button>
      )}
    </div>
  );
}
