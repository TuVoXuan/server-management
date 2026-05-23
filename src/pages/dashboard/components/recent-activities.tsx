import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Timeline, TimelineItem } from "@/components/ui/timeline";
import { generateRandomServerEvent } from "@/lib/utils";
import { servers } from "@/mock-data";
import { format } from "date-fns";
import { useEffect, useState } from "react";

const initalEvents = [
  {
    title: "server-12 was restarted",
    created_at: 1779501023123,
    dotColor: "#F59E0B",
    activity_type: "SERVER_RESTARTED",
    server_id: 12,
  },
];

export default function RecentActivities() {
  const [events, setEvents] = useState(initalEvents);

  useEffect(() => {
    const interval = setInterval(() => {
      const event = generateRandomServerEvent(servers);

      setEvents((prev) => {
        const slice = prev.slice(0, 2);
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
      <CardContent>
        <Timeline>
          {events.map((event) => (
            <TimelineItem
              key={event.created_at}
              title={event.title}
              description={format(event.created_at, "dd/MM/yyyy HH:mm:ss")}
              dotColor={event.dotColor}
            />
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
}
