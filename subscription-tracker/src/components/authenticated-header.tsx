"use client";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { useRouter } from "next/navigation";

export default function AuthenticatedHeader({ displayName, onIntegrate }: { displayName: string; onIntegrate: () => void }) {
  const router = useRouter();
  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/signin");
  };
  return (
    <header className="w-full bg-primary text-primary-foreground py-3 px-6 flex items-center justify-between shadow">
      <div className="flex items-center gap-2">
        <span className="font-bold text-lg flex items-center gap-2">
          <span className="bg-white rounded p-1 mr-2"><Icons.google className="h-6 w-6 text-primary" /></span>
          SubTrack
        </span>
      </div>
      <div className="flex items-center gap-4">
        <Button className="bg-white text-primary hover:bg-gray-100" size="sm" onClick={onIntegrate}>+ Integrate Account</Button>
        <div className="flex items-center gap-2 bg-white rounded-full px-3 py-1">
          <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">JD</span>
          <span className="text-primary font-medium">{displayName}</span>
          <Button variant="link" className="text-primary ml-2" onClick={handleLogout}>Log out</Button>
        </div>
      </div>
    </header>
  );
} 