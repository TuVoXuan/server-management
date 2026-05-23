import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface Props {
  value?: string;
  onValueChange: (value: string) => void;
}

export default function TimeRange({ onValueChange, value = "" }: Props) {
  return (
    <ToggleGroup
      size="sm"
      spacing={0}
      type="single"
      className="border p-1 data-[size=sm]:rounded-lg"
      value={value}
      onValueChange={onValueChange}
    >
      <ToggleGroupItem size={"sm"} value="24h">
        24h
      </ToggleGroupItem>
      <ToggleGroupItem value="week">Week</ToggleGroupItem>
      <ToggleGroupItem size={"sm"} value="month">
        Month
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
