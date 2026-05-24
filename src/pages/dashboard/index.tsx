import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import AnalyticsOverview from "./components/analytics-overview";
import { GlobeMap } from "./components/globe-map";
import RecentActivities from "./components/recent-activities";
import ServerStatus from "./components/server-status";
import TopArchChart from "./components/top-arch-chart";
import { TopOSChart } from "./components/top-os-chart";
import { TopPlartformChart } from "./components/top-platform-chart";

export default function DashboardPage() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-3 xl:gap-4 xl:grid-cols-3">
        <AnalyticsOverview />
        <ServerStatus />
      </div>

      <Card className="pb-0 gap-0">
        <CardHeader className="border-b">
          <CardTitle>Global Server Distribution</CardTitle>
        </CardHeader>
        <GlobeMap />
      </Card>

      <div className="grid gap-3 xl:grid-cols-3">
        <TopOSChart />

        <div className="space-y-3">
          <TopArchChart />
          <TopPlartformChart />
        </div>

        <RecentActivities />
      </div>
    </div>
  );
}
