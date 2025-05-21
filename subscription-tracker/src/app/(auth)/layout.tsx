import UnauthenticatedHeader from "@/components/unauthenticated-header";

export default function AuthLayout({ children }: {
    readonly children: React.ReactNode;
  }) {
    return (
      <div className="min-h-screen flex flex-col bg-muted">
        <UnauthenticatedHeader />
        <div className="flex-1 flex items-center justify-center">
          {children}
        </div>
      </div>
    );
  }