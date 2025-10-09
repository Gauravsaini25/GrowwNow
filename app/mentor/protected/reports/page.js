// app/mentor/reports/page.js
"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MENTOR_ACCOUNTS } from "@/mock/mentors";
import { EMPLOYEES } from "@/mock/employees";
import ReportCard from "@/components/ReportCard";
import RadarChart from "@/components/RadarChart";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function MentorReports() {
  const [mentor, setMentor] = useState(null);
  const [mentee, setMentee] = useState(null);
  const [insights, setInsights] = useState(null);

  useEffect(() => {
    const raw = typeof window !== "undefined" ? localStorage.getItem("mentor") : null;
    const stored = raw ? JSON.parse(raw) : null;
    if (!stored) {
      window.location.href = "/mentor/login";
      return;
    }
    setMentor(stored);
    const acct = MENTOR_ACCOUNTS.find((m) => m.id === stored.id);
    const menteeObj = EMPLOYEES.find((e) => e.id === acct?.menteeId) || null;
    setMentee(menteeObj);

    // Generate some mock insight calculations
    if (menteeObj) {
      const improvement = Math.max(0, (menteeObj.progress?.gapsClosed ?? 0));
      setInsights({
        improvement,
        recommendation: improvement < 50 ? "Focus on Leadership & Technical training" : "Continue applied projects"
      });
    }
  }, []);

  if (!mentee) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const barData = Object.entries(mentee.skills).map(([skill, value]) => ({ name: skill, value }));

  return (
    <div className="min-h-screen bg-gray-50 p-6 w-[78vw]">
      <h1 className="text-2xl font-bold mb-4">Reports & Insights</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Progress Report</CardTitle>
            </CardHeader>
            <CardContent>
              <ReportCard progress={mentee.progress || { gapsClosed: 0, activitiesDone: 0, nextMilestone: "N/A" }} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skill Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#0ea5a4" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Skill Radar</CardTitle>
            </CardHeader>
            <CardContent>
              <RadarChart employee={mentee} role={{ title: "Target", skills: mentee.skills }} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p><b>Improvement:</b> {insights?.improvement}% gaps closed</p>
              <p className="mt-2 text-gray-600">{insights?.recommendation}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
