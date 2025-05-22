"use client";
import AuthenticatedHeader from "@/components/authenticated-header";
import { useAuth } from "@/app/context/auth";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuth();
  return (
    <div className="min-h-screen flex flex-col bg-muted">
      <AuthenticatedHeader
        displayName={currentUser?.displayName || "John Doe"}
        onIntegrate={() => {}}
      />
      <main className="flex-1 container mx-auto py-8 px-2 md:px-0">
        {children}
      </main>
    </div>
  );
} 