// app/mentor/dashboard/page.js
"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RadarChart from "@/components/RadarChart";
import ReportCard from "@/components/ReportCard";
import MentorModal from "@/components/MentorModal";
import { MENTOR_ACCOUNTS } from "@/mock/mentors";
import { EMPLOYEES } from "@/mock/employees";
import { MENTORS as MENTOR_PROFILES } from "@/mock/data";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

export default function MentorDashboard() {
  const [mentor, setMentor] = useState(null);
  const [mentee, setMentee] = useState(null);
  const [modalMentor, setModalMentor] = useState(null);

  useEffect(() => {
    // load mentor session
    const raw = typeof window !== "undefined" ? localStorage.getItem("mentor") : null;
    const stored = raw ? JSON.parse(raw) : null;
    if (!stored) {
      window.location.href = "/mentor/login";
      return;
    }
    setMentor(stored);

    // find mentee by mentor.menteeId
    const acct = MENTOR_ACCOUNTS.find((m) => m.id === stored.id);
    const menteeId = acct?.menteeId || stored.menteeId;
    const menteeObj = EMPLOYEES.find((e) => e.id === menteeId) || null;
    setMentee(menteeObj);
  }, []);

  if (!mentor || mentee === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-teal-500"></div>
      </div>
    );
  }

  // summary metrics for the single mentee
  const totalSkills = Object.keys(mentee.skills).length;
  const gapsCount = Object.values(mentee.skills).filter((v) => v < 70).length;
  const mastered = totalSkills - gapsCount;

  const skillsData = Object.entries(mentee.skills).map(([skill, value]) => ({ skill, level: value }));

  const profile = MENTOR_PROFILES.find((m) => m.id === mentor.id) || {
    name: mentor.name,
    role: "Mentor",
    image: mentor.image,
    bio: mentor.specialization,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-8 w-[78vw]">
      {/* Page header is handled by MentorHeader in layout */}

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="bg-teal-50">
          <CardContent>
            <h3 className="text-teal-700 font-bold text-lg">Mentee</h3>
            <p className="text-gray-700 text-2xl mt-1">{mentee.name}</p>
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
            <p className="text-gray-700 text-2xl mt-1">{mentee.progress?.activitiesDone ?? 0}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Skill Gap Radar</CardTitle>
            </CardHeader>
            <CardContent>
              <RadarChart employee={mentee} role={{ title: "Target Role", skills: mentee.skills }} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skill Levels</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={skillsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="skill" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="level" name="Skill Level" fill="#059669" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions & Programs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <button className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 cursor-pointer">Assign IDP</button>
              <button className="w-full border border-teal-200 py-2 rounded-lg hover:bg-teal-50 cursor-pointer">Request Assessment</button>
              <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 cursor-pointer">Schedule 1:1</button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <img src={profile.image || mentor.image} className="w-16 h-16 rounded-full" />
                <div>
                  <h3 className="font-semibold text-teal-700">{profile.name}</h3>
                  <p className="text-sm text-gray-600">{profile.role || mentor.specialization}</p>
                  <p className="text-xs text-gray-500 mt-1">{profile.bio || mentor.specialization}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Assigned Mentee</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <img src={mentee.image} className="w-12 h-12 rounded-full" />
                <div>
                  <div className="font-semibold text-gray-700">{mentee.name}</div>
                  <div className="text-xs text-gray-500">{mentee.role}</div>
                </div>
                <div className="ml-auto">
                  <button onClick={() => window.location.href = "/mentor/protected/mentee"} className="px-3 py-1 bg-teal-600 text-white rounded cursor-pointer">Open</button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea className="w-full p-2 border rounded" placeholder="Private notes about the mentee..."></textarea>
              <button className="mt-2 w-full bg-teal-600 text-white py-2 rounded-lg cursor-pointer">Save Note</button>
            </CardContent>
          </Card>
        </div>
      </div>

      {modalMentor && <MentorModal mentor={modalMentor} onClose={() => setModalMentor(null)} />}
    </div>
  );
}
