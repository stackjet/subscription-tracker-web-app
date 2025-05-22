import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function IntegrationsGrid({ integrations }: { integrations: Array<{ name: string; desc: string; info: string }> }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Available Services to Integrate</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {integrations.map((i) => (
          <Card key={i.name} className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-base">{i.name}</CardTitle>
              <CardDescription>{i.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-2 text-sm text-muted-foreground">{i.info}</div>
              <Button className="w-full">Connect Account</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 