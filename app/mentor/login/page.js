// app/mentor/login/page.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { MENTOR_ACCOUNTS } from "@/mock/mentors";

export default function MentorLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    const account = MENTOR_ACCOUNTS.find(
      (m) => m.email.toLowerCase() === email.toLowerCase() && m.password === password
    );

    if (account) {
      const mentor = {
        id: account.id,
        name: account.name,
        email: account.email,
        menteeId: account.menteeId,
        specialization: account.specialization,
        image: account.image
      };
      localStorage.setItem("mentor", JSON.stringify(mentor));
      router.push("/mentor/protected/dashboard");
    } else {
      setError("Invalid credentials. Try anil@mentor.com / mentor123");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-teal-600 to-cyan-600 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        <div className="flex justify-center mb-4">
          <Lock className="w-10 h-10 text-teal-600" />
        </div>
        <h1 className="text-2xl font-bold mb-2 text-gray-800">Mentor Sign In</h1>
        <p className="text-gray-500 mb-6">Access your mentor dashboard and mentee analytics</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="text-left">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="anil@mentor.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div className="text-left">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="mentor123"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition cursor-pointer"
          >
            Sign In as Mentor
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-600">
          Back to{" "}
          <a href="/" className="text-teal-600 font-medium hover:underline">
            Home
          </a>
        </p>
      </div>
    </main>
  );
}
