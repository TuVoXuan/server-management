import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  value: number;
  description?: string;
  rightIcon: React.ReactNode;
  className?: string;
}
export default function ServerInfoCard({
  title,
  value,
  description,
  rightIcon,
  className,
}: Props) {
  return (
    <Card size="sm" className={cn("relative mx-auto w-full", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardAction>{rightIcon}</CardAction>
        <CardContent className="group-data-[size=sm]/card:px-0">
          <p className="font-semibold text-xl">{value}</p>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </CardContent>
      </CardHeader>
    </Card>
  );
}
