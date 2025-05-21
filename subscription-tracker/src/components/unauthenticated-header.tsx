import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function UnauthenticatedHeader() {
  return (
    <header className="w-full border-b bg-white">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link href="/" className="text-xl font-bold text-primary">
          PlatformName
        </Link>
        <nav className="hidden md:flex gap-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">Home</Link>
          <Link href="#" className="hover:text-primary">Features</Link>
          <Link href="#" className="hover:text-primary">Pricing</Link>
          <Link href="#" className="hover:text-primary">Contact</Link>
        </nav>
        <Button asChild className="ml-4 px-6 py-2" variant="default">
          <Link href="/signin">Log In</Link>
        </Button>
      </div>
    </header>
  );
} 