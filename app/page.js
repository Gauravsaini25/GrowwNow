"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, Cpu, UserCheck } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4">
        <h1 className="text-4xl font-bold mb-4">Empower Your Growth Journey 🚀</h1>
        <p className="text-lg mb-10 max-w-2xl mx-auto">
          Upskill, track your career progress, and get personalized mentorship powered by AI.
        </p>

        <div className="flex justify-center gap-6 flex-wrap">
          <Link href="/login">
            <Button className="bg-white text-indigo-700 hover:bg-gray-200 font-semibold px-6 py-3 rounded-lg">
              Login as Mentee
            </Button>
          </Link>

          <Link href="/mentor/login">
            <Button className="bg-indigo-900 text-white hover:bg-indigo-800 font-semibold px-6 py-3 rounded-lg">
              Login as Mentor
            </Button>
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-8 grid md:grid-cols-3 gap-8 text-center">
        <div className="p-4">
          <TrendingUp className="mx-auto w-10 h-10 text-indigo-600" />
          <h3 className="text-xl font-semibold mt-3">Analyze Your Skills</h3>
          <p className="text-gray-500 mt-2">
            Our system evaluates your role readiness using AI-based competency mapping.
          </p>
        </div>
        <div className="p-4">
          <Users className="mx-auto w-10 h-10 text-indigo-600" />
          <h3 className="text-xl font-semibold mt-3">Get Matched with Mentors</h3>
          <p className="text-gray-500 mt-2">
            Pair with mentors aligned to your career goals and growth areas.
          </p>
        </div>
        <div className="p-4">
          <Cpu className="mx-auto w-10 h-10 text-indigo-600" />
          <h3 className="text-xl font-semibold mt-3">Receive AI Insights</h3>
          <p className="text-gray-500 mt-2">
            Get actionable recommendations to close your skill gaps efficiently.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 text-center bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Join the Growth Revolution 🌱</h2>
        <p className="text-gray-600 mb-6">
          Whether you're a mentor guiding others or a mentee growing your potential — start today.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/login">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2">
              Mentee Login
            </Button>
          </Link>
          <Link href="/mentor/login">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2">
              Mentor Login
            </Button>
          </Link>
        </div>
      </section>

      <footer className="text-center py-6 text-sm text-gray-500 border-t mt-8">
        &copy; 2025 Talent Growth Platform
      </footer>
    </main>
  );
}
