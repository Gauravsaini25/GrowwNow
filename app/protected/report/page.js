"use client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import ReportCard from "@/components/ReportCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

export default function ReportsPage() {
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    // Simulated employee progress data
    const storedEmployee = JSON.parse(localStorage.getItem("employee") || "{}");
    const mockProgress = {
      gapsClosed: 40,
      activitiesDone: 5,
      nextMilestone: "Leadership Training Completion",
      skills: [
        { name: "Communication", progress: 80 },
        { name: "Teamwork", progress: 65 },
        { name: "Leadership", progress: 50 },
        { name: "Problem Solving", progress: 70 },
      ],
      activityTimeline: [
        { month: "Jan", hours: 10 },
        { month: "Feb", hours: 15 },
        { month: "Mar", hours: 20 },
        { month: "Apr", hours: 18 },
      ],
      recommendations: [
        "Enroll in Advanced Leadership Module",
        "Complete 2 more collaborative projects",
        "Focus on public speaking practice",
      ],
      milestones: [
        { title: "Complete Leadership Module", due: "15th Oct 2025" },
        { title: "Presentation Assessment", due: "28th Oct 2025" },
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
            {/* High level summary */}
            <ReportCard progress={progress} />

            {/* Skill Breakdown */}
            <Card className="shadow-md rounded-2xl">
              <CardHeader>
                <CardTitle>Skill Improvement Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={progress?.skills || []}>
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
                <CardTitle>Learning Hours (Monthly)</CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progress?.activityTimeline || []}>
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

            {/* AI Recommendations */}
            <Card className="shadow-md rounded-2xl">
              <CardHeader>
                <CardTitle>AI Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {(progress?.recommendations || []).map((rec, idx) => (
                    <li key={idx}>{rec}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Upcoming Milestones */}
            <Card className="shadow-md rounded-2xl">
              <CardHeader>
                <CardTitle>Upcoming Milestones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(progress?.milestones || []).map((m, idx) => (
                    <div key={idx} className="flex justify-between border-b pb-2">
                      <span className="font-medium">{m.title}</span>
                      <span className="text-gray-500">{m.due}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}
