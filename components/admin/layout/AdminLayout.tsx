"use client";

import { useState } from "react";

import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import MobileSidebar from "../sidebar/MobileSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Sidebar */}
      <MobileSidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="lg:ml-72">
        <Navbar setSidebarOpen={setSidebarOpen} />

        <main className="p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}