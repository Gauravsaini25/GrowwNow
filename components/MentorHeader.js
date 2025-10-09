// components/MentorHeader.js
"use client";
import { BellIcon, Search, Sun, Moon } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { MENTORS as MENTOR_PROFILES } from "@/mock/data";

export default function MentorHeader({ small = false }) {
  const [darkMode, setDarkMode] = useState(false);

  // load mentor from storage
  const raw = typeof window !== "undefined" ? localStorage.getItem("mentor") : null;
  const stored = raw ? JSON.parse(raw) : null;
  const profile = stored ? (MENTOR_PROFILES.find((m) => m.id === stored.id) || stored) : null;

  return (
    <header className={`bg-white shadow flex justify-between items-center px-6 py-4 rounded-b-2xl sticky top-0 z-10 ${small ? "w-full" : "w-[78vw]"}`}>
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <h2 className="text-lg font-bold text-teal-700">Mentor Console</h2>
          <p className="text-xs text-gray-500">{profile ? `Hello, ${profile.name}` : "Welcome Mentor"}</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search mentee or skill..."
            className="pl-8 pr-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm"
          />
        </div>

        {/* Dark Mode */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-gray-100"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-600" />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <BellIcon className="w-6 h-6 text-gray-500 hover:text-teal-600 cursor-pointer" />
          <span className="absolute top-0 right-0 inline-flex items-center justify-center h-4 w-4 text-xs text-white bg-red-500 rounded-full">1</span>
        </div>

        {/* Profile */}
        <Link href="/mentor/mentee">
          <img
            src={profile?.image || "https://randomuser.me/api/portraits/lego/1.jpg"}
            className="h-10 w-10 rounded-full cursor-pointer border"
            alt={profile?.name || "Mentor"}
          />
        </Link>
      </div>
    </header>
  );
}
