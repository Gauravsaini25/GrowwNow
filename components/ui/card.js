"use client";

export function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-card-bg border border-gray-200 rounded-xl shadow
        hover:shadow-lg transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return <div className={`p-5 ${className}`}>{children}</div>;
}

export function CardHeader({ children, className = "" }) {
  return (
    <div className={`px-5 pt-5 pb-2 border-b border-gray-200 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = "" }) {
  return (
    <h2 className={`text-lg font-semibold text-gray-800 ${className}`}>
      {children}
    </h2>
  );
}
