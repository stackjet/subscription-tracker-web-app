"use client";

import { useState } from "react";
import { useAuth } from "@/app/context/auth";
import SummaryCards from "./components/SummaryCards";
import BudgetGoalTracker from "./components/BudgetGoalTracker";
import SubscriptionsTable from "./components/SubscriptionsTable";
import IntegrationsGrid from "./components/IntegrationsGrid";
import { Icons } from "@/components/ui/icons";

const services = [
  { name: "AWS", icon: <Icons.aws className="h-6 w-6 text-yellow-500" />, plan: "Business", cost: 99, billing: "Monthly", status: "Active", next: "May 15, 2023" },
  { name: "Azure", icon: <Icons.azure className="h-6 w-6 text-blue-500" />, plan: "Standard", cost: 79, billing: "Monthly", status: "Active", next: "May 22, 2023" },
  { name: "Google Cloud Platform", icon: <Icons.google className="h-6 w-6 text-red-500" />, plan: "Pro", cost: 49, billing: "Monthly", status: "Active", next: "May 28, 2023" },
  { name: "GitHub", icon: <Icons.github className="h-6 w-6 text-black" />, plan: "Team", cost: 20, billing: "Monthly", status: "Active", next: "June 1, 2023" },
];

const integrations = [
  { name: "Slack", desc: "Business communication platform", info: "Track your Slack workspace billing" },
  { name: "Dropbox", desc: "File hosting service", info: "Monitor your Dropbox subscription costs" },
  { name: "Notion", desc: "Project management and note-taking", info: "Track your Notion workspace billing" },
  { name: "Salesforce", desc: "Customer relationship management", info: "Monitor your Salesforce subscription costs" },
  { name: "Adobe Creative Cloud", desc: "Suite of creative applications", info: "Track your Adobe Creative Cloud subscription" },
];

export default function DashboardPage() {
  const { currentUser } = useAuth();
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [budget, setBudget] = useState(300);
  const totalCost = 247;
  const budgetUsed = Math.round((totalCost / budget) * 100);
  const remaining = budget - totalCost;

  return (
    <div className="min-h-screen bg-muted flex flex-col">
      <main className="flex-1 container mx-auto py-8 px-2 md:px-0">
        <h1 className="text-2xl font-bold mb-1">Subscription Dashboard</h1>
        <p className="text-muted-foreground mb-6">Manage your subscriptions and track spending</p>
        <SummaryCards
          totalCost={totalCost}
          activeCount={services.length}
          budget={budget}
          budgetUsed={budgetUsed}
          nextPayment={{ date: "May 15", service: "AWS", amount: 99 }}
        />
        <BudgetGoalTracker
          budget={budget}
          totalCost={totalCost}
          budgetUsed={budgetUsed}
          remaining={remaining}
          showModal={showBudgetModal}
          setShowModal={setShowBudgetModal}
          setBudget={setBudget}
        />
        <SubscriptionsTable services={services} />
        <IntegrationsGrid integrations={integrations} />
      </main>
    </div>
  );
} 