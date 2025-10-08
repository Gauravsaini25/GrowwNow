"use client";

export function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`w-full px-4 py-2 rounded-lg border border-gray-300
        focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent
        transition-all text-sm bg-transparent placeholder:text-slate-400 ${className}`}
    />
  );
}
