import Sidebar from "@/components/Sidebar";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex bg-gray-50 text-gray-800">
      
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
