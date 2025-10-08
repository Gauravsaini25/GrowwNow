"use client";

export function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`px-5 py-2.5 rounded-xl font-semibold shadow-md
        bg-gradient-to-r from-indigo-500 to-purple-500 text-white
        hover:scale-105 hover:shadow-xl active:scale-95 transition-transform
        disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}
