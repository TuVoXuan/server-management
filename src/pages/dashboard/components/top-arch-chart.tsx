import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getStatisticalArchitecture } from "@/mock-data";

const data = getStatisticalArchitecture();

export default function TopArchChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Architectures</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        {data.map((item) => (
          <Card key={item.key} size="sm">
            <CardHeader>{item.key}</CardHeader>
            <CardContent>
              <span className="font-semibold text-lg">{item.count}</span>
              <Progress
                value={Math.round((item.count / item.totalServer) * 100)}
              />
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
