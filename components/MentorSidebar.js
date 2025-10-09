// components/MentorSidebar.js
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, UsersIcon, CalendarIcon, LogOutIcon, BarChart3Icon } from "lucide-react";

export default function MentorSidebar() {
  const pathname = usePathname();

  const LINKS = [
    { href: "/mentor/protected/dashboard", label: "Dashboard", icon: HomeIcon },
    { href: "/mentor/protected/mentee", label: "Mentee", icon: UsersIcon },
    { href: "/mentor/protected/sessions", label: "Sessions", icon: CalendarIcon },
    { href: "/mentor/protected/reports", label: "Reports", icon: BarChart3Icon }
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-indigo-700 to-indigo-800 text-white flex flex-col p-4 max-h-[100vh] sticky top-0 shadow-lg">
      <h2 className="text-3xl font-bold mb-8 text-center tracking-wide">GrowwNow — Mentor</h2>

      <nav className="flex-1 flex flex-col space-y-2">
        {LINKS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 
                ${isActive ? "bg-indigo-500 shadow-md scale-105" : "hover:bg-indigo-600 hover:scale-105"}`}
            >
              <Icon className="w-5 h-5 text-white" />
              <span className="font-medium text-white">{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-indigo-500 my-4"></div>

      <button
        onClick={() => {
          localStorage.removeItem("mentor");
          window.location.href = "/mentor/login";
        }}
        className="flex items-center space-x-3 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 hover:scale-105 transition transform shadow-md"
      >
        <LogOutIcon className="w-5 h-5" />
        <span className="font-medium">Logout</span>
      </button>
    </aside>
  );
}
