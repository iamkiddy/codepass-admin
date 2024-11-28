import ProtectedRoute from "@/lib/context/protectedRoute";
import Sidenav from "@/components/ui/sideNav";
import Navbar from "@/components/ui/navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="flex h-screen">
        <div className="w-64 shrink-0">
          <Sidenav />
        </div>
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 overflow-y-auto p-8">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}