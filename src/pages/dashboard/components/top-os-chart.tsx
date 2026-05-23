/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { OperationSystem } from "@/constants/server";
import { getStatisticalOS } from "@/mock-data";

const data = getStatisticalOS();

const chartData = data.map((item) => ({
  os: item.key,
  count: item.count,
  fill: `var(--color-${item.key})`,
}));

const chartConfig = {
  ubuntu: {
    label: OperationSystem.ubuntu,
    color: "#FB923C",
  },
  debian: {
    label: OperationSystem.debian,
    color: "#F43F5E",
  },
  centOS: {
    label: OperationSystem.centOS,
    color: "#A78BFA",
  },
  windowsServer: {
    label: OperationSystem.windowsServer,
    color: "#60A5FA",
  },
} satisfies ChartConfig;

export function TopOSChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Top OS</CardTitle>
        <CardDescription>Most used operation systems</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-62.5"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="os"
              innerRadius={50}
              outerRadius={105}
              paddingAngle={3}
              cornerRadius={10}
            />
          </PieChart>
        </ChartContainer>
        <div className="space-y-4">
          {chartData.map((item) => (
            <div key={item.os} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{
                    backgroundColor: (chartConfig as any)?.[item.os].color,
                  }}
                />

                <span className="text-sm font-medium">
                  {(chartConfig as any)?.[item.os].label}
                </span>
              </div>

              <span className="text-sm text-muted-foreground">
                {item.count} server(s)
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
