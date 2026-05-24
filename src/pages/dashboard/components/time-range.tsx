import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface Props {
  value?: string;
  onValueChange: (value: string) => void;
}

export default function TimeRange({ onValueChange, value = "" }: Props) {
  return (
    <ToggleGroup
      spacing={1}
      type="single"
      value={value}
      onValueChange={onValueChange}
      className="bg-muted"
    >
      <ToggleGroupItem value="24h">24h</ToggleGroupItem>
      <ToggleGroupItem value="week">Week</ToggleGroupItem>
      <ToggleGroupItem value="month">Month</ToggleGroupItem>
    </ToggleGroup>
  );
}
