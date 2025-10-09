"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MENTORS } from "@/mock/data";
import RadarChart from "@/components/RadarChart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from "recharts";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const employeeId = 2;
  const roleId = 101;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [summaryRes, analysisRes] = await Promise.all([
          fetch("/api/summary", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ employeeId }),
          }),
          fetch("/api/analysis", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ employeeId, roleId }),
          }),
        ]);

        if (!summaryRes.ok || !analysisRes.ok)
          throw new Error("Failed to fetch dashboard data");

        const [summaryData, analysisData] = await Promise.all([
          summaryRes.json(),
          analysisRes.json(),
        ]);

        setSummary(summaryData);
        setAnalysis(analysisData);
      } catch (err) {
        console.error(err);
        setError("⚠️ Could not load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-red-600">
        {error}
      </div>
    );

  const mentor = MENTORS[Math.floor(Math.random() * MENTORS.length)];
  const totalSkills = summary?.totalSkills || 0;
  const gapsCount = summary?.gapsCount || 0;
  const mastered = summary?.skillsMastered || totalSkills - gapsCount;
  const skillsData = analysis?.employee?.skills
    ? Object.entries(analysis.employee.skills).map(([skill, value]) => ({
      skill,
      level: value,
    }))
    : [];

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-8 w-[78vw]">
      <Header title="Dashboard" subtitle="Your personalized growth and skill analytics" />

      {/* === Summary Cards === */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="bg-indigo-50">
          <CardContent>
            <h3 className="text-indigo-700 font-bold text-lg">Total Skills</h3>
            <p className="text-gray-700 text-2xl mt-1">{totalSkills}</p>
          </CardContent>
        </Card>
        <Card className="bg-red-50">
          <CardContent>
            <h3 className="text-red-600 font-bold text-lg">Skill Gaps</h3>
            <p className="text-gray-700 text-2xl mt-1">{gapsCount}</p>
          </CardContent>
        </Card>
        <Card className="bg-green-50">
          <CardContent>
            <h3 className="text-green-700 font-bold text-lg">Skills Mastered</h3>
            <p className="text-gray-700 text-2xl mt-1">{mastered}</p>
          </CardContent>
        </Card>
        <Card className="bg-yellow-50">
          <CardContent>
            <h3 className="text-yellow-700 font-bold text-lg">Activities Done</h3>
            <p className="text-gray-700 text-2xl mt-1">{summary.activitiesDone || 5}</p>
          </CardContent>
        </Card>
      </div>

      {/* === Radar Chart Section === */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Skill Gap Radar</CardTitle>
          </CardHeader>
          <CardContent>
            <RadarChart employee={analysis.employee} role={analysis.role} />
          </CardContent>
        </Card>
      </motion.div>

      {/* === Skill Level Bar Chart === */}
      <Card>
        <CardHeader>
          <CardTitle>Skill Levels Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={skillsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="skill" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="level" fill="#6366f1" name="Employee Skill Level" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* === AI Recommendations === */}
      <Card>
        <CardHeader>
          <CardTitle>Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {(analysis.recos || []).map((rec, idx) => (
            <div
              key={idx}
              className="p-3 bg-indigo-50 rounded-lg flex justify-between items-center hover:bg-indigo-100 transition"
            >
              <span className="text-gray-700">{rec.text || rec}</span>
              {rec.priority && (
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${rec.priority === "High"
                      ? "bg-red-200 text-red-700"
                      : rec.priority === "Medium"
                        ? "bg-yellow-200 text-yellow-700"
                        : "bg-green-200 text-green-700"
                    }`}
                >
                  {rec.priority}
                </span>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* === Mentor Spotlight === */}
      <Card className="hover:shadow-lg transition cursor-pointer">
        <CardContent>
          <h3 className="text-indigo-700 font-semibold text-lg mb-2">Mentor Spotlight</h3>
          <div className="flex items-center gap-4">
            <img
              src={mentor.image || "https://randomuser.me/api/portraits/lego/1.jpg"}
              alt={mentor.name}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <p className="font-semibold">{mentor.name}</p>
              <p className="text-sm text-gray-500">{mentor.role}</p>
              <p className="text-xs text-gray-400">
                Next Availability: {mentor.available}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* === Milestones === */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Milestones</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Completed "Leadership Essentials" course</li>
            <li>Closed 2 skill gaps this week</li>
            <li>Next milestone: "Advanced Strategy Training"</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
