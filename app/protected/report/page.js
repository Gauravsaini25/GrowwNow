"use client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import ReportCard from "@/components/ReportCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EMPLOYEES } from "@/mock/employees";
import { MENTOR_ACCOUNTS } from "@/mock/mentors";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

export default function ReportsPage() {
  const [progress, setProgress] = useState(null);
  const [mentee, setMentee] = useState(null);

  useEffect(() => {
    // Simulated employee progress data
    // const raw = typeof window !== "undefined" ? localStorage.getItem("mentor") : null;
    // const stored = raw ? JSON.parse(raw) : null;
    // if (!stored) {
    //   window.location.href = "/mentor/login";
    //   return;
    // }
    // setMentor(stored);
    // const acct = MENTOR_ACCOUNTS.find((m) => m.id === stored.id);
    // const menteeObj = EMPLOYEES.find((e) => e.id === acct?.menteeId) || null;
    // setMentee(menteeObj);
    const mockProgress = {
      gapsClosed: 40,
      completedCourses: 5,
      activitiesDone: 5,
      nextMilestone: "Leadership Training Completion",
      skills: [
        { name: "Leadership", progress: 40 },
        { name: "Strategy", progress: 50 },
        { name: "Communication", progress: 60 },
        { name: "Technical", progress: 70 },
      ],
      progress: [
        { name: "Leadership", progress: 40 },
        { name: "Strategy", progress: 50 },
        { name: "Communication", progress: 60 },
        { name: "Technical", progress: 70 },
      ],
      activityTimeline: [
        { month: "Jan", hours: 10 },
        { month: "Feb", hours: 15 },
        { month: "Mar", hours: 20 },
        { month: "Apr", hours: 18 },
        { month: "May", hours: 25 },
      ],
    };
    setProgress(mockProgress);
  }, []);

  if (!progress) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        Loading report...
      </div>
    );
  }

  return (
    <div className="flex w-[78vw]">
      <div className="flex min-h-screen bg-gray-50 w-[82vw]">
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="p-6 grid gap-6">
            {/* Overall Summary */}
            <ReportCard progress={progress} />

            {/* Skill Improvement Breakdown */}
            <Card className="shadow-md rounded-2xl">
              <CardHeader>
                <CardTitle>Skill Improvement Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={progress.skills}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="progress"
                      fill="#4F46E5"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Learning Hours Timeline */}
            <Card className="shadow-md rounded-2xl">
              <CardHeader>
                <CardTitle>Learning Hours Over Time</CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progress.activityTimeline}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="hours"
                      stroke="#16A34A"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Skill Distribution Radar */}
            {/* Skill Distribution Radar */}
            <Card className="shadow-md rounded-2xl">
              <CardHeader>
                <CardTitle>Skill Distribution Overview</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart
                    data={progress.skills}
                    cx="50%"
                    cy="50%"
                    outerRadius="70%"
                  >
                    <PolarGrid stroke="#E5E7EB" />
                    <PolarAngleAxis
                      dataKey="name"
                      tick={{ fill: "#374151", fontSize: 12, fontWeight: 500 }}
                    />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#9CA3AF" }} />

                    {/* Tooltip enables hover values */}
                    <Tooltip
                      formatter={(value) => [`${value}%`, "Skill Level"]}
                      contentStyle={{
                        backgroundColor: "#fff",
                        borderRadius: "10px",
                        border: "1px solid #E5E7EB",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                      }}
                    />

                    <defs>
                      <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.9} />
                        <stop offset="100%" stopColor="#818CF8" stopOpacity={0.3} />
                      </linearGradient>
                    </defs>

                    <Radar
                      name="Skill Level"
                      dataKey="progress"
                      stroke="#4F46E5"
                      fill="url(#radarGradient)"
                      fillOpacity={0.6}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>


            {/* Insights Summary */}
            <Card className="shadow-md rounded-2xl">
              <CardHeader>
                <CardTitle>Performance Insights</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-gray-700">
                <p>📈 You’ve shown steady progress across all skills, with a strong upward trend in learning hours since February.</p>
                <p>💪 “Problem Solving” and “Communication” are your strongest domains, indicating balanced analytical and interpersonal growth.</p>
                <p>🎯 Focus area: Continue improving “Leadership” and “Technical” skills to achieve full proficiency alignment.</p>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}
