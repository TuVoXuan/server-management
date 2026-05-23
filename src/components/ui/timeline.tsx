interface TimelineItemProps {
  title: string;
  description?: string;
  dotColor?: string;
}

export function TimelineItem({
  title,
  description,
  dotColor,
}: TimelineItemProps) {
  return (
    <div className="group relative pl-5 min-h-10 pb-4 last:pb-0">
      <p className="font-semibold">{title}</p>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      <div
        style={{ backgroundColor: dotColor }}
        className={"absolute z-2 size-3 bg-sky-500 rounded-full left-0 top-1"}
      ></div>
      <div className="absolute z-1 left-1.5 group-first:top-2 top-0 -translate-x-1/2 w-0.5 bg-muted-foreground h-full"></div>
    </div>
  );
}

export function Timeline({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
