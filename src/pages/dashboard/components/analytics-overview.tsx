import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { filterTotalServerAndNewServer, servers } from "@/mock-data";
import { format, sub } from "date-fns";
import { CalendarIcon, CirclePlus, RotateCcw, Server } from "lucide-react";
import { useMemo, useReducer } from "react";
import CustomRangePicker from "./custom-range-picker";
import ServerInfoCard from "./server-info-card";
import TimeRange from "./time-range";

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

export default function AnalyticsOverview() {
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
    <Card className="xl:col-span-2">
      <CardHeader>
        <CardTitle>Analytics Overview</CardTitle>
        <CardDescription>Track your server metrics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center flex-wrap gap-2 border rounded-xl p-2 w-fit">
          <TimeRange
            value={state.timeRange}
            onValueChange={(value) =>
              dispatch({ type: "UPDATE_TIME_RANGE", timeRange: value })
            }
          />

          <Popover
            open={state.showCustomRange}
            onOpenChange={() => dispatch({ type: "TOGGLE_OPEN_CUSTOM_RANGE" })}
          >
            <PopoverTrigger asChild>
              <Button variant={"outline"} className="cursor-pointer">
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
            className="cursor-pointer text-sky-500 hover:text-sky-500"
            variant={"ghost"}
            onClick={() => dispatch({ type: "CLEAR_FILTER" })}
          >
            <RotateCcw />
            Clear filter
          </Button>
        </div>

        <div className="flex gap-x-3">
          <ServerInfoCard
            title="Total Server"
            description={filterTotalServerDesc}
            rightIcon={
              <div className="h-8 w-8 rounded-md flex items-center justify-center bg-[#262F40]">
                <Server className="text-white size-5" />
              </div>
            }
            value={filterResult.totalServer}
            className="bg-[#0E172A] text-white"
          />
          <ServerInfoCard
            title="New Server"
            description={filterNewServerDesc}
            rightIcon={
              <div className="h-8 w-8 rounded-md flex items-center justify-center bg-purple-600/10">
                <CirclePlus className="text-purple-600 size-5" />
              </div>
            }
            value={filterResult.totalNewServer}
          />
        </div>
      </CardContent>
    </Card>
  );
}
