import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  CalendarIcon,
  CircleAlert,
  CircleCheck,
  CirclePlus,
  Server,
} from "lucide-react";
import { useState } from "react";
import CustomRangePicker from "./components/custom-range-picker";
import ServerInfoCard from "./components/server-info-card";
import TimeRange from "./components/time-range";

export default function DashboardPage() {
  const [timeRangeValue, setTimeRangeValue] = useState<string>();
  const [showCustomRange, setShowCustomRange] = useState<boolean>(false);

  return (
    <div className="grid grid-cols-1 gap-3 xl:gap-4 xl:grid-cols-3">
      <Card
        size="sm"
        className="ring-sky-300 -mx-2 px-2 h-fit data-[size=sm]:py-2 xl:mx-0 xl:px-4 xl:data-[size=sm]:py-4 xl:col-span-2"
      >
        <div className="flex items-center flex-wrap gap-2">
          <TimeRange value={timeRangeValue} onValueChange={setTimeRangeValue} />
          <Button
            variant={"secondary"}
            onClick={() => setShowCustomRange(!showCustomRange)}
          >
            <CalendarIcon />
            Custom range picker
          </Button>

          <Button
            variant={"outline"}
            onClick={() => setShowCustomRange(!showCustomRange)}
          >
            Clear filter
          </Button>
        </div>

        {showCustomRange && <CustomRangePicker />}

        <div className="flex items-center gap-x-3">
          <ServerInfoCard
            title="Total Server"
            description="from 19/10/2001 to 20/12/2002"
            rightIcon={
              <div className="h-8 w-8 rounded-md flex items-center justify-center bg-sky-600/10">
                <Server className="text-sky-600 size-5" />
              </div>
            }
            value={1200}
          />
          <ServerInfoCard
            title="New Server"
            description="from 19/10/2001 to 20/12/2002"
            rightIcon={
              <div className="h-8 w-8 rounded-md flex items-center justify-center bg-sky-600/10">
                <CirclePlus className="text-sky-600 size-5" />
              </div>
            }
            value={1200}
          />
        </div>
      </Card>

      <div className="grid gap-3 h-fit xl:gap-4">
        <ServerInfoCard
          title="Online"
          description="total servers are online"
          rightIcon={
            <div className="h-8 w-8 rounded-md flex items-center justify-center bg-green-600/10">
              <CircleCheck className="text-green-600 size-5" />
            </div>
          }
          value={1200}
        />
        <ServerInfoCard
          title="Offline"
          description="total servers are offline"
          rightIcon={
            <div className="h-8 w-8 rounded-md flex items-center justify-center bg-destructive/10">
              <CircleAlert className="text-destructive size-5" />
            </div>
          }
          value={1200}
        />
      </div>
    </div>
  );
}
