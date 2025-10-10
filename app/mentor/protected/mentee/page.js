"use client";
import { useState, useEffect } from "react";
import { EMPLOYEES } from "@/mock/employees";
import { ROLES } from "@/mock/data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// --- Progress Bar Component ---
function Progress({ value = 0, color = "indigo" }) {
  const colors = {
    indigo: "bg-indigo-500",
    green: "bg-green-500",
    yellow: "bg-yellow-400",
  };
  return (
    <div className="w-full bg-gray-200 rounded-full h-4 mt-1">
      <div
        className={`${colors[color]} h-4 rounded-full transition-all`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
}

// --- Simple Textarea Component ---
function Textarea({ value, onChange, placeholder }) {
  return (
    <textarea
      className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={4}
    />
  );
}

export default function MenteePage() {
  const [mentee, setMentee] = useState(null);
  const [role, setRole] = useState(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    let storedMentee = JSON.parse(localStorage.getItem("mentee") || "null");
    if (!storedMentee) {
      const defaultMentee = EMPLOYEES.find((e) => e.mentorId === 201);
      storedMentee = defaultMentee || null;
      if (storedMentee)
        localStorage.setItem("mentee", JSON.stringify(storedMentee));
    }
    setMentee(storedMentee);
    if (storedMentee) {
      const roleInfo = ROLES.find((r) => r.id === storedMentee.targetRole);
      setRole(roleInfo);
    }
    const savedFeedback = localStorage.getItem("mentee_feedback") || "";
    setFeedback(savedFeedback);
  }, []);

  const handleFeedbackSave = () => {
    localStorage.setItem("mentee_feedback", feedback);
    alert("Feedback saved!");
  };

  if (!mentee || !role)
    return <p className="p-6 text-gray-500">Loading mentee...</p>;

  return (
    <main className="min-h-screen bg-gray-50 p-6 space-y-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-teal-700 mb-4">
        Mentee Dashboard: {mentee.name}
      </h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Progress Card */}
        <Card className="bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-lg hover:shadow-2xl transition p-5">
          <CardContent>
            <h2 className="text-lg font-semibold text-green-700 mb-2">
              📈 Current Progress
            </h2>
            <p className="text-sm text-gray-600 mb-1">
              Gaps Closed: <span className="font-medium">{mentee.progress.gapsClosed}%</span>
            </p>
            <Progress value={mentee.progress.gapsClosed} color="green" />
            <p className="text-sm text-gray-600 mt-3">
              Activities Completed: <span className="font-medium">{mentee.progress.activitiesDone}</span>
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Next Milestone: <span className="font-medium">{mentee.progress.nextMilestone}</span>
            </p>
          </CardContent>
        </Card>

        {/* Feedback Card */}
        <Card className="bg-gradient-to-br from-teal-50 to-white rounded-2xl shadow-lg hover:shadow-2xl transition p-5">
          <CardContent>
            <h2 className="text-lg font-semibold text-teal-700 mb-2">
              📝 Mentor Feedback
            </h2>
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Provide feedback or roadmap suggestions..."
            />
            <Button className="mt-3 w-full bg-teal-600 hover:bg-teal-700 text-white" onClick={handleFeedbackSave}>
              Save Feedback
            </Button>
            {feedback && (
              <p className="mt-3 text-gray-800 text-sm">
                <strong>Saved Feedback:</strong> {feedback}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Roadmap Card */}
        <Card className="bg-gradient-to-br from-teal-50 to-white rounded-2xl shadow-lg hover:shadow-2xl transition p-5">
          <CardContent>
            <h2 className="text-lg font-semibold text-teal-700 mb-3">
              🛠 Roadmap
            </h2>

            <div className="mb-3">
              <h3 className="font-medium text-gray-700">📘 Learning Modules</h3>
              <ul className="list-disc pl-5 text-gray-600 text-sm">
                {mentee.learning?.map((l, idx) => (
                  <li key={idx}>{l}</li>
                )) || <li>Not Assigned</li>}
              </ul>
            </div>

            <div className="mb-3">
              <h3 className="font-medium text-gray-700">🛠 On-Job Activities</h3>
              <ul className="list-disc pl-5 text-gray-600 text-sm">
                {mentee.onJob?.map((o, idx) => (
                  <li key={idx}>{o}</li>
                )) || <li>Not Assigned</li>}
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-gray-700">🎯 Milestones</h3>
              <ul className="list-disc pl-5 text-gray-600 text-sm">
                {mentee.milestones?.map((m, idx) => (
                  <li key={idx}>{m}</li>
                )) || <li>Not Assigned</li>}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
