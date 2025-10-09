// app/mentor/sessions/page.js
"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MENTOR_ACCOUNTS } from "@/mock/mentors";
import { EMPLOYEES } from "@/mock/employees";

export default function SessionsPage() {
  const [mentor, setMentor] = useState(null);
  const [mentee, setMentee] = useState(null);
  const [sessions, setSessions] = useState([]);

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

    // demo sessions (static)
    setSessions([
      { id: 1, date: "2025-10-05", time: "15:00", type: "1:1 Coaching", note: "Review IDP progress" },
      { id: 2, date: "2025-10-12", time: "11:00", type: "Career Planning", note: "Discuss next milestone" }
    ]);
  }, []);

  if (!mentor || !mentee) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6 w-[78vw]">
      <h1 className="text-2xl font-bold">Sessions & Scheduling</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              {sessions.length === 0 && <p className="text-gray-500">No sessions scheduled.</p>}
              <ul className="space-y-3">
                {sessions.map((s) => (
                  <li key={s.id} className="bg-white p-3 rounded-lg shadow-sm flex justify-between items-center">
                    <div>
                      <div className="font-semibold">{s.type}</div>
                      <div className="text-xs text-gray-500">{s.date} • {s.time}</div>
                      <div className="text-sm text-gray-600 mt-1">{s.note}</div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-teal-600 text-white roundedcursor-pointer">Join</button>
                      <button className="px-3 py-1 border rounded cursor-pointer">Edit</button>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Schedule a New Session</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => { e.preventDefault(); alert("Session scheduled (demo)"); }}>
                <div className="grid gap-3">
                  <input required className="p-2 border rounded" type="date" />
                  <input required className="p-2 border rounded" type="time" />
                  <select className="p-2 border rounded">
                    <option>1:1 Coaching</option>
                    <option>Goal Setting</option>
                    <option>Progress Review</option>
                  </select>
                  <textarea className="p-2 border rounded" placeholder="Notes..." />
                  <button className="w-full bg-teal-600 text-white py-2 rounded-lg cursor-pointer">Schedule</button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Mentee</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <img src={mentee.image} className="w-12 h-12 rounded-full" />
                <div>
                  <div className="font-semibold">{mentee.name}</div>
                  <div className="text-xs text-gray-500">{mentee.role}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Session Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 text-sm text-gray-600">
                <li>Intro & Goal Alignment (30m)</li>
                <li>Progress Review & Actions (45m)</li>
                <li>Career Growth Planning (60m)</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
