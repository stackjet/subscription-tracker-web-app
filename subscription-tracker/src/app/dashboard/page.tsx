'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { ExpenseForm } from "@/components/forms/expense-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleIntegration = async (provider: string) => {
    setIsLoading(provider);
    try {
      // Here you would implement the actual integration logic
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`Integrating with ${provider}...`);
    } catch (error) {
      console.error(`Error integrating with ${provider}:`, error);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Expense Tracking Dashboard</h1>
      
      <Tabs defaultValue="integrations" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="integrations">Cloud Integrations</TabsTrigger>
          <TabsTrigger value="manual">Manual Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="integrations" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Google Cloud Platform', icon: Icons.google },
              { name: 'AWS', icon: Icons.aws },
              { name: 'Azure', icon: Icons.azure },
              { name: 'GitHub', icon: Icons.github },
            ].map((provider) => (
              <Card key={provider.name} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <provider.icon className="h-6 w-6" />
                    <CardTitle className="text-lg">{provider.name}</CardTitle>
                  </div>
                  <CardDescription>Connect your {provider.name} account</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full"
                    onClick={() => handleIntegration(provider.name)}
                    disabled={isLoading === provider.name}
                  >
                    {isLoading === provider.name ? (
                      <>
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      'Connect'
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="manual" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Manual Expense Entry</CardTitle>
              <CardDescription>Add your expenses manually</CardDescription>
            </CardHeader>
            <CardContent>
              <ExpenseForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 