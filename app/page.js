"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, Cpu } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <h1 className="text-4xl font-bold mb-4">Empower Your Growth Journey 🚀</h1>
        <p className="text-lg mb-8">
          Upskill, track your career progress, and get personalized mentorship powered by AI.
        </p>
        <Link href="/dashboard">
          <Button className="bg-white text-indigo-700 hover:bg-gray-200">
            Go to Dashboard
          </Button>
        </Link>
      </section>

      {/* How It Works */}
      <section className="py-16 px-8 grid md:grid-cols-3 gap-8 text-center">
        <div>
          <TrendingUp className="mx-auto w-10 h-10 text-indigo-600" />
          <h3 className="text-xl font-semibold mt-3">Analyze Your Skills</h3>
          <p className="text-gray-500 mt-2">
            Our system evaluates your role readiness using AI-based competency mapping.
          </p>
        </div>
        <div>
          <Users className="mx-auto w-10 h-10 text-indigo-600" />
          <h3 className="text-xl font-semibold mt-3">Get Matched with Mentors</h3>
          <p className="text-gray-500 mt-2">
            Pair with mentors aligned to your career goals and growth areas.
          </p>
        </div>
        <div>
          <Cpu className="mx-auto w-10 h-10 text-indigo-600" />
          <h3 className="text-xl font-semibold mt-3">Receive AI Insights</h3>
          <p className="text-gray-500 mt-2">
            Get actionable recommendations to close your skill gaps efficiently.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 text-center bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Already a member?</h2>
        <Link href="/login">
          <Button>Sign In</Button>
        </Link>
      </section>

      <footer className="text-center py-6 text-sm text-gray-500 border-t">
        &copy; 2025 Talent Growth Platform
      </footer>
    </main>
  );
}
