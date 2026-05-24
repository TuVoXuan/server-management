import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { serverStatus } from "@/constants/server";
import { getTotalServerByStatus } from "@/mock-data";
import { CircleCheck, TriangleAlert } from "lucide-react";

export default function ServerStatus() {
  const totalOnlineServer = getTotalServerByStatus(serverStatus.online);
  const totalOfflineServer = getTotalServerByStatus(serverStatus.offline);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Server Status</CardTitle>
        <CardDescription>Real-time server availibility</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Card className="bg-green-600/10 border-none ring-0">
          <CardContent className="flex items-center gap-x-2 ">
            <div className="shrink-0 h-8 w-8 rounded-md flex items-center justify-center">
              <CircleCheck className="text-green-600 size-5" />
            </div>
            <div className="flex-1">
              <p className="text-green-600 font-medium">Online</p>
              <p className="text-muted-foreground">Servers are running</p>
            </div>
            <span className="text-2xl font-semibold text-green-600">
              {totalOnlineServer}
            </span>
          </CardContent>
        </Card>
        <Card className="bg-[#F43F5E]/10 border-none ring-0">
          <CardContent className="flex items-center gap-x-2 ">
            <div className="shrink-0 h-8 w-8 rounded-md flex items-center justify-center">
              <TriangleAlert className="text-[#F43F5E] size-5" />
            </div>
            <div className="flex-1">
              <p className="text-[#F43F5E] font-medium">Offline</p>
              <p className="text-muted-foreground">Servers are down</p>
            </div>
            <span className="text-2xl font-semibold text-[#F43F5E]">
              {totalOfflineServer}
            </span>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
