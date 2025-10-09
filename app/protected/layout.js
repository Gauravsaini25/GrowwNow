// app/(protected)/layout.js
"use client";
import Sidebar from "@/components/Sidebar";
export default function ProtectedLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar fixed left */}
      <Sidebar />

      {/* Page content */}
      <main className="flex-1 bg-gray-50 p-6">{children}</main>
    </div>
  );
}
