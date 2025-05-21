"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { initializeFirebaseAdmin } from "@/app/firebase/admin-config";
import UnauthenticatedHeader from "@/components/unauthenticated-header";
import { useAuth } from "@/app/context/auth";

export default function Home() {
  const router = useRouter();
  const { currentUser } = useAuth();

  useEffect(() => {
    // If user is authenticated, redirect to dashboard
    // TODO: Replace with actual authenticated home route when available
    if (currentUser) {
      router.push("/dashboard");
    }
  }, [currentUser, router]);

  return (
    <div className="min-h-screen flex flex-col bg-muted">
      <UnauthenticatedHeader />
      <main className="flex-1 flex flex-col items-center justify-center py-12 px-4">
        <div className="max-w-4xl w-full space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Welcome to PlatformName</h1>
            <p className="text-muted-foreground text-lg">
              Manage your subscriptions and expenses in one place
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">For Organizations</h2>
              <p className="text-muted-foreground mb-4">
                Streamline your subscription management and expense tracking across your entire team.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Centralized subscription management
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Team collaboration features
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Advanced analytics and reporting
                </li>
              </ul>
              <a
                href="/signup_v2/organization"
                className="inline-block w-full text-center rounded-md bg-primary text-primary-foreground px-4 py-2 hover:bg-primary/90"
              >
                Get Started
              </a>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">For Members</h2>
              <p className="text-muted-foreground mb-4">
                Join your organization and manage your personal subscriptions efficiently.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Personal subscription tracking
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Easy organization joining
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Customizable dashboard
                </li>
              </ul>
              <a
                href="/signup_v2/member"
                className="inline-block w-full text-center rounded-md bg-primary text-primary-foreground px-4 py-2 hover:bg-primary/90"
              >
                Join Now
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
