import { cn } from "@/lib/utils";

type PopupPosition = "top" | "bottom" | "left" | "right";

interface LocationPopupProps {
  location: any;
  position?: PopupPosition;
}

const positionClasses: Record<PopupPosition, string> = {
  top: `
    bottom-full left-1/2 -translate-x-1/2 mb-3
    before:absolute before:top-full before:left-1/2 before:-translate-x-1/2
    before:border-8 before:border-transparent before:border-t-muted
  `,
  bottom: `
    top-full left-1/2 -translate-x-1/2 mt-3
    before:absolute before:bottom-full before:left-1/2 before:-translate-x-1/2
    before:border-8 before:border-transparent before:border-b-muted
  `,
  left: `
    right-full top-1/2 -translate-y-1/2 mr-3
    before:absolute before:left-full before:top-1/2 before:-translate-y-1/2
    before:border-8 before:border-transparent before:border-l-muted
  `,
  right: `
    left-full top-1/2 -translate-y-1/2 ml-3
    before:absolute before:right-full before:top-1/2 before:-translate-y-1/2
    before:border-8 before:border-transparent before:border-r-muted
  `,
};

export function LocationPopup({
  location,
  position = "right",
}: LocationPopupProps) {
  return (
    <div
      className={cn(
        `
          absolute z-50 hidden w-56 rounded-md border bg-muted p-3 shadow-md
          group-hover:block
        `,
        positionClasses[position],
      )}
    >
      <LocationPopupContent location={location} />
    </div>
  );
}

export function LocationPopupContent({ location }: { location: any }) {
  return (
    <>
      <p className="font-semibold text-base">{location.serverName}</p>

      <div className="mt-2 space-y-1 text-sm">
        <div className="flex justify-between gap-3">
          <span className="text-muted-foreground">IP:</span>
          <span>{location.ip}</span>
        </div>

        <div className="flex justify-between gap-3">
          <span className="text-muted-foreground">Country:</span>
          <span>{location.country}</span>
        </div>
      </div>
    </>
  );
}
