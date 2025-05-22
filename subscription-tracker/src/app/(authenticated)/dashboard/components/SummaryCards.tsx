import { Card, CardContent } from "@/components/ui/card";

export default function SummaryCards({ totalCost, activeCount, budget, budgetUsed, nextPayment }: {
  totalCost: number;
  activeCount: number;
  budget: number;
  budgetUsed: number;
  nextPayment: { date: string; service: string; amount: number };
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardContent className="flex flex-col gap-2 pt-6">
          <span className="text-muted-foreground text-xs">Total Monthly Cost</span>
          <span className="text-2xl font-bold">${totalCost.toFixed(2)}</span>
          <span className="text-green-600 text-xs">↑ 4.3% from last month</span>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-col gap-2 pt-6">
          <span className="text-muted-foreground text-xs">Active Subscriptions</span>
          <span className="text-2xl font-bold">{activeCount}</span>
          <span className="text-xs">All services active</span>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-col gap-2 pt-6">
          <span className="text-muted-foreground text-xs">Budget Status</span>
          <span className="text-2xl font-bold">${totalCost}/{budget}</span>
          <span className="text-xs">{budgetUsed}% of monthly budget used</span>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-col gap-2 pt-6">
          <span className="text-muted-foreground text-xs">Next Payment</span>
          <span className="text-2xl font-bold">{nextPayment.date}</span>
          <span className="text-xs text-red-600">{nextPayment.service} - ${nextPayment.amount.toFixed(2)}</span>
        </CardContent>
      </Card>
    </div>
  );
} 