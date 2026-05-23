import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { getStatisticalArchitecture } from "@/mock-data";

const data = getStatisticalArchitecture();

const config = [
  {
    key: "x86",
    label: "32-bit",
    textColor: "text-indigo-600",
    bgColor: "bg-indigo-50",
    progressBg: "bg-indigo-400",
  },
  {
    key: "x64",
    label: "64-bit",
    textColor: "text-amber-600",
    bgColor: "bg-amber-50",
    progressBg: "bg-amber-400",
  },
];

const mergeDataWithConfig = data.map((item) => {
  const color = config.find((i) => i.key == item.key);
  return { ...item, ...color };
});

export default function TopArchChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Architectures</CardTitle>
        <CardDescription>Most used architectures</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        {mergeDataWithConfig.map((item) => (
          <Card key={item.key} size="sm">
            <CardHeader>
              <CardTitle>
                <Badge className={cn(item.bgColor, item.textColor)}>
                  {item.label}
                </Badge>
              </CardTitle>
              <CardAction>
                <span className="text-muted-foreground font-medium text-xs">
                  {Math.round((item.count / item.totalServer) * 100)}%
                </span>
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <span className="text-muted-foreground font-semibold">
                  {item.key}
                </span>
                <span className="font-semibold text-lg">{item.count}</span>
              </div>
              <Progress
                className="h-2"
                indicatorClassName={cn("rounded-full", item.progressBg)}
                value={Math.round((item.count / item.totalServer) * 100)}
              />
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
