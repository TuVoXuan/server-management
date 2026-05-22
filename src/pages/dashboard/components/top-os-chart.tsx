"use client";

import { Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
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
    color: "#E95420",
  },
  debian: {
    label: OperationSystem.debian,
    color: "#D70A53",
  },
  centOS: {
    label: OperationSystem.centOS,
    color: "#6B4FBB",
  },
  windowsServer: {
    label: OperationSystem.windowsServer,
    color: "#0078D4",
  },
} satisfies ChartConfig;

export function TopOSChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Top OS</CardTitle>
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
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="os" />}
              className="-translate-y-2 flex-wrap gap-2 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
