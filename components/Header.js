"use client";
import { BellIcon, Search, Sun, Moon } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <header className="bg-white shadow flex justify-between items-center px-6 py-4 rounded-b-2xl sticky top-0 z-10 w-[78vw]">
      <h1 className="text-2xl font-bold text-indigo-700"><Link href='/protected/dashboard'>Reach your Potential</Link></h1>


      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-8 pr-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
          />
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-600" />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <BellIcon className="w-6 h-6 text-gray-500 hover:text-indigo-600 cursor-pointer" />
          <span className="absolute top-0 right-0 inline-flex items-center justify-center h-4 w-4 text-xs text-white bg-red-500 rounded-full">
            3
          </span>
        </div>

        {/* Profile */}
        <Link href='/protected/profile'><img src="https://randomuser.me/api/portraits/women/44.jpg"  className="h-10 w-10 rounded-full  cursor-pointer" alt="" /></Link>
        
      </div>
    </header>
  );
}
