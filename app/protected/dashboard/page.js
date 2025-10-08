"use client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { MENTORS } from "@/mock/data";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const employeeId = 1;

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/summary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ employeeId }),
        });
        if (!res.ok) throw new Error("Summary API failed");
        const data = await res.json();
        setSummary(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load summary");
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-gray-200"></div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-6 bg-red-100 text-red-700 rounded-lg shadow">
          ⚠️ {error}
        </div>
      </div>
    );

  // Pick a random mentor to spotlight
  const mentorSpotlight = MENTORS[Math.floor(Math.random() * MENTORS.length)];

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6 w-[78vw]">
      <Header title="Dashboard" subtitle="Your personalized learning overview" />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <Card className="bg-indigo-50">
          <CardContent>
            <h3 className="text-indigo-700 font-bold text-lg">Total Skills</h3>
            <p className="text-gray-700 text-2xl mt-1">{summary.totalSkills}</p>
          </CardContent>
        </Card>

        <Card className="bg-red-50">
          <CardContent>
            <h3 className="text-red-600 font-bold text-lg">Skill Gaps</h3>
            <p className="text-gray-700 text-2xl mt-1">{summary.gapsCount}</p>
          </CardContent>
        </Card>

        <Card className="bg-green-50">
          <CardContent>
            <h3 className="text-green-700 font-bold text-lg">Skills Mastered</h3>
            <p className="text-gray-700 text-2xl mt-1">{summary.skillsMastered}</p>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50">
          <CardContent>
            <h3 className="text-yellow-700 font-bold text-lg">Activities Done</h3>
            <p className="text-gray-700 text-2xl mt-1">{summary.activitiesDone || 5}</p>
          </CardContent>
        </Card>
      </div>

      {/* Top 3 AI Recommendations */}
      <Card>
        <CardContent>
          <h3 className="text-indigo-700 font-semibold text-lg mb-2">Top AI Recommendations</h3>
          <ul className="list-disc pl-6 text-gray-700">
            {summary.recos?.map((r, idx) => (
              <li key={idx} className="hover:text-indigo-600 cursor-pointer">
                {r.text || r}
              </li>
            )) || <li>No recommendations yet</li>}
          </ul>
        </CardContent>
      </Card>

      {/* Recent Activity / Milestones */}
      <Card>
        <CardContent>
          <h3 className="text-indigo-700 font-semibold text-lg mb-2">Recent Milestones</h3>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Completed "Leadership Essentials" course</li>
            <li>Closed 2 skill gaps this week</li>
            <li>Next milestone: "Advanced Strategy Training"</li>
          </ul>
        </CardContent>
      </Card>

      {/* Mentor Spotlight */}
      <Card className="hover:shadow-lg transition cursor-pointer">
        <CardContent>
          <h3 className="text-indigo-700 font-semibold text-lg mb-2">Mentor Spotlight</h3>
          <div className="flex items-center gap-4">
            <img
              src={mentorSpotlight.image || "https://randomuser.me/api/portraits/lego/1.jpg"}
              alt={mentorSpotlight.name}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <p className="font-semibold">{mentorSpotlight.name}</p>
              <p className="text-sm text-gray-500">{mentorSpotlight.role}</p>
              <p className="text-xs text-gray-400">Next Availability: {mentorSpotlight.available}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
