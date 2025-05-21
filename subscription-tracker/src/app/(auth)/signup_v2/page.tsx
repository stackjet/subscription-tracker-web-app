import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import React from "react";
import Link from "next/link";

export default function SignupV2Page() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-2">Join Our Platform</h1>
      <p className="text-muted-foreground text-center mb-8 max-w-xl">
        Choose how you'd like to sign up and start your journey with us today.
      </p>
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl">
        {/* Organization Card */}
        <Card className="flex-1 bg-white border shadow-sm">
          <CardHeader className="flex flex-row items-center gap-4 bg-muted/50 rounded-t-lg p-6 pb-0">
            <div className="bg-muted rounded-full p-3">
              {/* Building/Organization Icon */}
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="12" fill="#F3F4F6"/><path d="M7 21V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v14" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 21h10" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 11h4" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 15h4" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div>
              <CardTitle className="text-xl font-bold">Organization</CardTitle>
              <CardDescription className="text-base mt-1">
                Perfect for businesses, nonprofits, and teams looking to collaborate and manage resources.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-0 px-6 pb-6">
            <div className="mt-4 mb-2 font-semibold">What you'll get:</div>
            <ul className="mb-6 space-y-2 text-sm">
              <li className="flex items-center gap-2"><span className="text-primary">✓</span> Create and manage multiple projects</li>
              <li className="flex items-center gap-2"><span className="text-primary">✓</span> Add team members and assign roles</li>
              <li className="flex items-center gap-2"><span className="text-primary">✓</span> Access advanced analytics and reporting</li>
              <li className="flex items-center gap-2"><span className="text-primary">✓</span> Priority customer support</li>
            </ul>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/signup_v2/organization">Sign up as Organization</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Member Card */}
        <Card className="flex-1 bg-primary/5 border shadow-sm">
          <CardHeader className="flex flex-row items-center gap-4 bg-primary/10 rounded-t-lg p-6 pb-0">
            <div className="bg-primary/10 rounded-full p-3">
              {/* User/Member Icon */}
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="12" fill="#EEF2FF"/><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M20 21v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div>
              <CardTitle className="text-xl font-bold">Member</CardTitle>
              <CardDescription className="text-base mt-1">
                Ideal for individuals who want to join existing organizations or use the platform independently.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-0 px-6 pb-6">
            <div className="mt-4 mb-2 font-semibold">What you'll get:</div>
            <ul className="mb-6 space-y-2 text-sm">
              <li className="flex items-center gap-2"><span className="text-primary">✓</span> Join multiple organizations</li>
              <li className="flex items-center gap-2"><span className="text-primary">✓</span> Personalized dashboard</li>
              <li className="flex items-center gap-2"><span className="text-primary">✓</span> Connect with other members</li>
              <li className="flex items-center gap-2"><span className="text-primary">✓</span> Access to all basic features</li>
            </ul>
            <Button className="w-full" asChild>
              <Link href="/signup_v2/member">Sign up as Member</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 