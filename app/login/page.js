"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";  // ✅ Correct import

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "riya@company.com" && password === "123456") {
      const mockEmployee = {
    id: 1,
    name: "Riya Sharma",
    email: "riya@company.com",
    password: "123456",
    phone: "+91 9123456780",
    role: "Team Lead",
    experienceYears: 5,
    skills: { Leadership: 65, Strategy: 70, Communication: 85, Technical: 60 },
    adcScores: { communication: 8.0, leadership: 7.0, decisionMaking: 7.5 },
    targetRole: 102,
    mentorId: 202,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    progress: {
      gapsClosed: 50,
      activitiesDone: 7,
      nextMilestone: "Advanced Strategy Training",
    },
  };
      localStorage.setItem("employee", JSON.stringify(mockEmployee));
      router.push("/protected/dashboard");
    } else {
      setError("Invalid credentials. Try riya@company.com / 123456");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        <div className="flex justify-center mb-4">
          <Lock className="w-10 h-10 text-indigo-600" />  {/* ✅ Updated */}
        </div>
        <h1 className="text-2xl font-bold mb-2 text-gray-800">Welcome Back</h1>
        <p className="text-gray-500 mb-6">Sign in to continue your growth journey</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="text-left">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="riya@company.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="text-left">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="123456"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-600">
          Not registered?{" "}
          <a href="/" className="text-indigo-600 font-medium hover:underline">
            Go to Home
          </a>
        </p>
      </div>
    </main>
  );
}
