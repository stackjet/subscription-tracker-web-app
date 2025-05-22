import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BudgetGoalTracker({ budget, totalCost, budgetUsed, remaining, showModal, setShowModal, setBudget }: {
  budget: number;
  totalCost: number;
  budgetUsed: number;
  remaining: number;
  showModal: boolean;
  setShowModal: (v: boolean) => void;
  setBudget: (v: number) => void;
}) {
  return (
    <>
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-lg">Budget Goal Tracker</CardTitle>
            <CardDescription>Track your spending against your monthly budget goal</CardDescription>
          </div>
          <Button variant="link" className="text-primary p-0 h-auto" onClick={() => setShowModal(true)}>
            Edit Budget
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-2 flex justify-between text-xs">
            <span>Monthly Budget: ${budget.toFixed(2)}</span>
            <span>Current Spending: ${totalCost.toFixed(2)}</span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-primary" style={{ width: `${budgetUsed}%` }} />
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-green-600">$0</span>
            <span className="text-muted-foreground">${remaining} remaining this month</span>
            <span className="text-primary">${budget}</span>
          </div>
        </CardContent>
      </Card>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm">
            <h2 className="text-lg font-bold mb-4">Edit Monthly Budget</h2>
            <form onSubmit={e => { e.preventDefault(); setShowModal(false); }}>
              <Label htmlFor="budget">Monthly Budget</Label>
              <Input id="budget" type="number" min={0} value={budget} onChange={e => setBudget(Number(e.target.value))} className="mb-4 mt-1" />
              <div className="flex justify-end gap-2">
                <Button type="button" variant="ghost" onClick={() => setShowModal(false)}>Cancel</Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
} 