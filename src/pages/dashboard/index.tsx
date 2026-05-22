import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ServerStatus } from "@/constants/server";
import {
  filterTotalServerAndNewServer,
  getTotalServerByStatus,
  servers,
} from "@/mock-data";
import { format, sub } from "date-fns";
import {
  CalendarIcon,
  CircleAlert,
  CircleCheck,
  CirclePlus,
  Server,
} from "lucide-react";
import { useMemo, useReducer } from "react";
import CustomRangePicker from "./components/custom-range-picker";
import { GlobeMap } from "./components/globe-map";
import ServerInfoCard from "./components/server-info-card";
import TimeRange from "./components/time-range";
import { TopOSChart } from "./components/top-os-chart";
import { TopPlartformChart } from "./components/top-platform-chart";

type ActionType =
  | "UPDATE_TIME_RANGE"
  | "UPDATE_CUSTOM_RANGE"
  | "TOGGLE_OPEN_CUSTOM_RANGE"
  | "CLEAR_FILTER"
  | "DEFAULT";

interface Action {
  type: ActionType;
  showCustomRange?: boolean;
  timeRange?: string;
  customRange?: { from: Date; to: Date };
}

interface State {
  actionType: ActionType;
  showCustomRange: boolean;
  timeRange?: string;
  customRange?: { from: Date; to: Date };
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "CLEAR_FILTER":
      return {
        ...state,
        actionType: action.type,
        timeRange: undefined,
        customRange: undefined,
      };
    case "TOGGLE_OPEN_CUSTOM_RANGE":
      return {
        ...state,
        actionType: action.type,
        showCustomRange: !state.showCustomRange,
      };
    case "UPDATE_CUSTOM_RANGE":
      return {
        ...state,
        actionType: action.type,
        timeRange: undefined,
        customRange: action.customRange,
        showCustomRange: false,
      };
    case "UPDATE_TIME_RANGE":
      return {
        ...state,
        actionType: action.type,
        timeRange: action.timeRange,
        customRange: undefined,
        showCustomRange: false,
      };
    default:
      return state;
  }
}

export default function DashboardPage() {
  const [state, dispatch] = useReducer(reducer, {
    actionType: "DEFAULT",
    showCustomRange: false,
  });

  const filterResult = useMemo(() => {
    if (state.timeRange) {
      const converted = convertTimeRangeToDateRange(state.timeRange);
      if (converted) {
        return filterTotalServerAndNewServer(converted.from, converted.to);
      }
    } else if (state.customRange) {
      return filterTotalServerAndNewServer(
        state.customRange.from,
        state.customRange.to,
      );
    }

    return { totalNewServer: 0, totalServer: servers.length };
  }, [state.timeRange, state.customRange]);

  const filterNewServerDesc = useMemo(() => {
    if (state.timeRange) {
      switch (state.timeRange) {
        case "24h":
          return "from the last 24 hours";
        case "week":
          return "from the last 7 days";
        case "month":
          return "from the last 30 days";
        default:
          return "";
      }
    } else if (state.customRange) {
      return `from ${format(state.customRange.from, "dd/MM/yyyy")} to ${format(state.customRange.to, "dd/MM/yyyy")}`;
    }
    return "apply filter to view result";
  }, [state.timeRange, state.customRange]);

  const filterTotalServerDesc = useMemo(() => {
    if (state.timeRange) {
      return "up to now";
    } else if (state.customRange) {
      return `up to ${format(state.customRange.to, "dd/MM/yyyy")}`;
    }
    return "all time";
  }, [state.timeRange, state.customRange]);

  const totalOnlineServer = getTotalServerByStatus(ServerStatus.online);
  const totalOfflineServer = getTotalServerByStatus(ServerStatus.offline);

  function convertTimeRangeToDateRange(timeRange: string) {
    const to = new Date();
    let from = null;
    if (timeRange == "24h") {
      from = sub(to, { days: 1 });
    } else if (timeRange == "week") {
      from = sub(to, { weeks: 1 });
    } else if (timeRange == "month") {
      from = sub(to, { months: 1 });
    }

    if (!from) return undefined;
    return { from, to };
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-3 xl:gap-4 xl:grid-cols-3">
        <Card
          size="sm"
          className="ring-sky-300 -mx-2 px-2 data-[size=sm]:py-2 xl:mx-0 xl:px-4 xl:data-[size=sm]:py-5 xl:col-span-2 xl:data-[size=sm]:gap-5"
        >
          <div className="flex items-center flex-wrap gap-2">
            <TimeRange
              value={state.timeRange}
              onValueChange={(value) =>
                dispatch({ type: "UPDATE_TIME_RANGE", timeRange: value })
              }
            />

            <Popover
              open={state.showCustomRange}
              onOpenChange={() =>
                dispatch({ type: "TOGGLE_OPEN_CUSTOM_RANGE" })
              }
            >
              <PopoverTrigger asChild>
                <Button variant={"outline"}>
                  <CalendarIcon />
                  Custom range picker
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-fit">
                <CustomRangePicker
                  value={state.customRange}
                  onApplyFilter={(value) =>
                    dispatch({
                      type: "UPDATE_CUSTOM_RANGE",
                      customRange: value,
                    })
                  }
                />
              </PopoverContent>
            </Popover>

            <Button
              variant={"outline"}
              onClick={() => dispatch({ type: "CLEAR_FILTER" })}
            >
              Clear filter
            </Button>
          </div>

          <div className="flex gap-x-3">
            <ServerInfoCard
              title="Total Server"
              description={filterTotalServerDesc}
              rightIcon={
                <div className="h-8 w-8 rounded-md flex items-center justify-center bg-sky-600/10">
                  <Server className="text-sky-600 size-5" />
                </div>
              }
              value={filterResult.totalServer}
            />
            <ServerInfoCard
              title="New Server"
              description={filterNewServerDesc}
              rightIcon={
                <div className="h-8 w-8 rounded-md flex items-center justify-center bg-sky-600/10">
                  <CirclePlus className="text-sky-600 size-5" />
                </div>
              }
              value={filterResult.totalNewServer}
            />
          </div>
        </Card>

        <div className="grid gap-3 h-fit">
          <ServerInfoCard
            title="Online"
            description="total servers are online"
            rightIcon={
              <div className="h-8 w-8 rounded-md flex items-center justify-center bg-green-600/10">
                <CircleCheck className="text-green-600 size-5" />
              </div>
            }
            value={totalOnlineServer}
          />
          <ServerInfoCard
            title="Offline"
            description="total servers are offline"
            rightIcon={
              <div className="h-8 w-8 rounded-md flex items-center justify-center bg-destructive/10">
                <CircleAlert className="text-destructive size-5" />
              </div>
            }
            value={totalOfflineServer}
          />
        </div>
      </div>

      <Card className="pb-0 gap-0">
        <CardHeader className="border-b">
          <CardTitle>Global Server Distribution</CardTitle>
        </CardHeader>
        <GlobeMap />
      </Card>

      <div className="grid gap-3 xl:grid-cols-3">
        <TopOSChart />
        <TopPlartformChart />
      </div>
    </div>
  );
}
