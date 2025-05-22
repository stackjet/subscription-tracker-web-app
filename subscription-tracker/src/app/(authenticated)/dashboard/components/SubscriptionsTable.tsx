import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function SubscriptionsTable({ services }: { services: Array<{ name: string; icon: React.ReactNode; plan: string; cost: number; billing: string; status: string; next: string }> }) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-lg">Current Subscriptions</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto p-0">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-muted text-muted-foreground">
              <th className="py-2 px-4 text-left font-medium">Service</th>
              <th className="py-2 px-4 text-left font-medium">Plan</th>
              <th className="py-2 px-4 text-left font-medium">Cost</th>
              <th className="py-2 px-4 text-left font-medium">Billing Cycle</th>
              <th className="py-2 px-4 text-left font-medium">Status</th>
              <th className="py-2 px-4 text-left font-medium">Next Payment</th>
              <th className="py-2 px-4 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.name} className="border-b last:border-0">
                <td className="py-2 px-4 flex items-center gap-2 font-medium">{s.icon}{s.name}</td>
                <td className="py-2 px-4">{s.plan}</td>
                <td className="py-2 px-4">${s.cost.toFixed(2)}</td>
                <td className="py-2 px-4">{s.billing}</td>
                <td className="py-2 px-4">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">{s.status}</span>
                </td>
                <td className="py-2 px-4">{s.next}</td>
                <td className="py-2 px-4 flex gap-2">
                  <Button variant="link" className="p-0 h-auto text-primary">Manage</Button>
                  <Button variant="link" className="p-0 h-auto text-red-500">Unsubscribe</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
} 