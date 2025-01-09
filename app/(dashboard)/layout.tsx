'use client';

import ProtectedRoute from "@/lib/context/protectedRoute";
import Sidenav from "@/components/ui/sideNav";
import Navbar from "@/components/ui/navbar";
import { useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidenavOpen, setIsSidenavOpen] = useState(false);

  return (
    <ProtectedRoute>
      <div className="flex h-screen">
        {/* Sidenav */}
        <Sidenav isOpen={isSidenavOpen} onOpenChange={setIsSidenavOpen} />

        {/* Main Content - Add left padding on larger screens to account for fixed sidenav */}
        <div className="flex-1 flex flex-col min-h-screen lg:pl-64">
          <Navbar onMenuClick={() => setIsSidenavOpen(true)} />
          <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}