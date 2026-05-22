"use client";

import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Platform } from "@/constants/server";
import { getStatisticalPlatform } from "@/mock-data";

const data = getStatisticalPlatform();

const chartData = data.map((item) => ({
  platform: item.key,
  count: item.count,
  fill: `var(--color-${item.key})`,
}));

const chartConfig = {
  nginx: {
    label: Platform.nginx,
    color: "#009639",
  },
  apache: {
    label: Platform.apache,
    color: "#D22128",
  },
  docker: {
    label: Platform.docker,
    color: "#2496ED",
  },
  nodeJS: {
    label: Platform.nodeJS,
    color: "#5FA04E",
  },
} satisfies ChartConfig;

export function TopPlartformChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Plartform</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="platform"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="count" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent nameKey="platform" hideLabel />}
            />
            <Bar dataKey="count" radius={5}>
              <LabelList
                dataKey="count"
                position="insideLeft"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
