import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ActivityTypes } from "@/constants/server";
import { cn, generateRandomServerEvent } from "@/lib/utils";
import { servers } from "@/mock-data";
import type { IServerActivity } from "@/types";
import { formatDistanceToNowStrict } from "date-fns";
import { Pause, Play, Plus, RotateCcw, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const initalEvents: IServerActivity[] = [
  {
    serverName: "server-18",
    description: "Restart triggered for maintenance",
    createdAt: 1779502458123,
    activityType: "SERVER_RESTARTED",
    serverId: 18,
  },
  {
    serverName: "server-05",
    description: "Security patches applied",
    createdAt: 1779502460342,
    activityType: "SERVER_UPDATED",
    serverId: 5,
  },
  {
    serverName: "server-27",
    description: "Server is back online",
    createdAt: 1779502461488,
    activityType: "SERVER_STARTED",
    serverId: 27,
  },
];

function ActivityIconBluePrint({
  icon,
  className,
}: {
  icon: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "size-10 border rounded-lg shrink-0 flex items-center justify-center",
        className,
      )}
    >
      {icon}
    </div>
  );
}

interface IActivityItemProps {
  activity: IServerActivity;
}

function ActivitityItem({ activity }: IActivityItemProps) {
  function generateIcon(activityType: string) {
    switch (activityType) {
      case ActivityTypes.SERVER_CREATED:
        return (
          <ActivityIconBluePrint
            icon={<Plus className="text-green-600" />}
            className="bg-green-50 border-green-200"
          />
        );
      case ActivityTypes.SERVER_RESTARTED:
      case ActivityTypes.SERVER_UPDATED:
        return (
          <ActivityIconBluePrint
            icon={<RotateCcw className="text-sky-600" />}
            className="bg-sky-50 border-sky-200"
          />
        );
      case ActivityTypes.SERVER_STARTED:
        return (
          <ActivityIconBluePrint
            icon={<Play className="text-emerald-600" />}
            className="bg-emerald-50 border-emerald-200"
          />
        );
      case ActivityTypes.SERVER_STOPPED:
        return (
          <ActivityIconBluePrint
            icon={<Pause className="text-gray-600" />}
            className="bg-gray-50 border-gray-200"
          />
        );
      case ActivityTypes.SERVER_DELETED:
        return (
          <ActivityIconBluePrint
            icon={<X className="text-red-600" />}
            className="bg-red-50 border-red-200"
          />
        );
      default:
        return null;
    }
  }

  function generateBadge(activityType: string) {
    switch (activityType) {
      case ActivityTypes.SERVER_CREATED:
        return (
          <Badge className="bg-green-50 text-green-600 text-[10px] py-0">
            Created
          </Badge>
        );
      case ActivityTypes.SERVER_RESTARTED:
        return (
          <Badge className="bg-sky-50 text-sky-600 text-[10px] py-0">
            Restarted
          </Badge>
        );
      case ActivityTypes.SERVER_UPDATED:
        return (
          <Badge className="bg-sky-50 text-sky-600 text-[10px] py-0">
            Updated
          </Badge>
        );
      case ActivityTypes.SERVER_STARTED:
        return (
          <Badge className="bg-emerald-50 text-emerald-600 text-[10px] py-0">
            Started
          </Badge>
        );
      case ActivityTypes.SERVER_STOPPED:
        return (
          <Badge className="bg-gray-50 text-gray-600 text-[10px] py-0">
            Stopped
          </Badge>
        );
      case ActivityTypes.SERVER_DELETED:
        return (
          <Badge className="bg-red-50 text-red-600 text-[10px] py-0">
            Stopped
          </Badge>
        );
      default:
        return null;
    }
  }

  return (
    <div className="relative border rounded-md p-3 flex gap-x-3">
      {generateIcon(activity.activityType)}
      <div className="flex-1">
        <div className="flex items-center gap-x-2">
          <span className="font-medium text-base">{activity.serverName}</span>
          {generateBadge(activity.activityType)}
        </div>
        <p className="text-sm text-muted-foreground truncate">
          {activity.description}
        </p>
      </div>
      <span className="absolute right-3 top-3 text-xs text-muted-foreground">
        {formatDistanceToNowStrict(activity.createdAt)}
      </span>
    </div>
  );
}

export default function RecentActivities() {
  const [activities, setActivities] = useState(initalEvents);

  useEffect(() => {
    const interval = setInterval(() => {
      const event = generateRandomServerEvent(servers);

      setActivities((prev) => {
        const slice = prev.slice(0, 5);
        return [event, ...slice];
      });
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Recent Activities</CardTitle>
        <CardAction>
          <Button size={"xs"} variant={"ghost"}>
            View more
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-3 max-h-99.5 overflow-hidden">
        <AnimatePresence>
          {activities.map((activity) => (
            <motion.div
              key={activity.createdAt}
              initial={{ opacity: 0, height: 0, scale: 0.95 }}
              animate={{ opacity: 1, height: "auto", scale: 1 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{
                type: "spring",
                bounce: 0.2,
              }}
            >
              <ActivitityItem activity={activity} />
            </motion.div>
          ))}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
