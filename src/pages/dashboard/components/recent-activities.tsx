import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TimelineItem } from "@/components/ui/timeline";
import { generateRandomServerEvent } from "@/lib/utils";
import { servers } from "@/mock-data";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";

const initalEvents = [
  {
    title: "server-12 was restarted",
    created_at: 1779501023123,
    dotColor: "#F59E0B",
    activity_type: "SERVER_RESTARTED",
    server_id: 12,
  },
  {
    title: "server-03 was updated",
    created_at: 1779501082451,
    dotColor: "#3B82F6",
    activity_type: "SERVER_UPDATED",
    server_id: 3,
  },
  {
    title: "server-27 was stopped",
    created_at: 1779501083527,
    dotColor: "#EF4444",
    activity_type: "SERVER_STOPPED",
    server_id: 27,
  },
  {
    title: "server-08 was started",
    created_at: 1779501084872,
    dotColor: "#8B5CF6",
    activity_type: "SERVER_STARTED",
    server_id: 8,
  },
];

export default function RecentActivities() {
  const [events, setEvents] = useState(initalEvents);

  useEffect(() => {
    const interval = setInterval(() => {
      const event = generateRandomServerEvent(servers);

      setEvents((prev) => {
        const slice = prev.slice(0, 3);
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
      <CardContent className="max-h-30 overflow-hidden">
        <AnimatePresence>
          {events.map((event) => (
            <motion.div
              key={event.created_at}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
            >
              <TimelineItem
                title={event.title}
                description={format(event.created_at, "dd/MM/yyyy HH:mm:ss")}
                dotColor={event.dotColor}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
