"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  ClipboardIcon,
  UsersIcon,
  BarChart3Icon,
  LogOutIcon,
} from "lucide-react";

const LINKS = [
  { href: "/protected/dashboard", label: "Dashboard", icon: HomeIcon },
  { href: "/protected/report", label: "Reports", icon: BarChart3Icon },
  { href: "/protected/mentor", label: "Mentors", icon: UsersIcon },
  { href: "/protected/analysis", label: "Skill Analysis", icon: ClipboardIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gradient-to-b from-indigo-700 to-indigo-800 text-white flex flex-col p-4 max-h-[729px] shadow-lg sticky top-0">
      {/* Brand */}
      <h2 className="text-3xl font-bold mb-8 text-center tracking-wide">GrowwNow</h2>

      {/* Navigation */}
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

      {/* Separator */}
      <div className="border-t border-indigo-500 my-4"></div>

      {/* Logout */}
      <button
        onClick={() => {
          localStorage.removeItem("employee");
          window.location.href = "/login";
        }}
        className="flex items-center space-x-3 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 hover:scale-105 transition transform shadow-md"
      >
        <LogOutIcon className="w-5 h-5" />
        <span className="font-medium">Logout</span>
      </button>
    </aside>
  );
}
