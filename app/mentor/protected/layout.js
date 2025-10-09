// app/mentor/layout.js
"use client";
import MentorSidebar from "@/components/MentorSidebar";
import MentorHeader from "@/components/MentorHeader";

export default function MentorLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <MentorSidebar />
      <div className="flex-1 bg-gray-50 min-h-screen">
        <div className="p-6">
          <MentorHeader />
        </div>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
