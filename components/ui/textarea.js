// components/ui/textarea.js
"use client";
export function Textarea(props) {
  return (
    <textarea
      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
      {...props}
    />
  );
}
