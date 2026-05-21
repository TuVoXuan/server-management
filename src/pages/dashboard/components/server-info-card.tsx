import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  title: string;
  value: number;
  description?: string;
  rightIcon: React.ReactNode;
}
export default function ServerInfoCard({
  title,
  value,
  description,
  rightIcon,
}: Props) {
  return (
    <Card size="sm" className="mx-auto w-full max-w-sm">
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
