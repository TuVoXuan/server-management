"use client";

import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getStatisticalPlatform } from "@/mock-data";
import { Progress } from "@/components/ui/progress";

const data = getStatisticalPlatform();

const configColor = [
  {
    name: "Nginx",
    color: "bg-emerald-500",
  },
  {
    name: "Apache",
    color: "bg-rose-500",
  },
  {
    name: "NodeJS",
    color: "bg-blue-500",
  },
  {
    name: "Docker",
    color: "bg-violet-500",
  },
];

const mergeDataWithColor = data.map((item) => {
  const color = configColor.find((i) => i.name == item.name);
  return { ...item, color: color?.color };
});

const total = data.reduce((acc, item) => acc + item.count, 0);

export function TopPlartformChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Platforms</CardTitle>
        <CardDescription>Most used server platforms</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {mergeDataWithColor.map((item) => {
          const percentage = Math.round((item.count / total) * 100);

          return (
            <div key={item.name} className="space-y-2">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn("h-2.5 w-2.5 rounded-full", item.color)} />

                  <span className="text-sm font-medium">{item.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">{item.count}</span>

                  <span className="text-xs text-muted-foreground">
                    {percentage}%
                  </span>
                </div>
              </div>

              {/* Progress */}
              <Progress
                value={percentage}
                className={"h-2"}
                indicatorClassName={cn("rounded-full", item.color)}
              />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
