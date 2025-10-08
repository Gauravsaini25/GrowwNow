"use client";
import {
  Radar,
  RadarChart as ReRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

export default function RadarChart({ employee, role }) {
  const roleSkills = {
    Manager: { Leadership: 80, Strategy: 75, Communication: 85, Technical: 65 },
    Engineer: { Leadership: 60, Strategy: 60, Communication: 75, Technical: 85 },
  };

  const target = roleSkills[role] || {};
  const data = Object.keys(employee.skills).map((skill) => ({
    skill,
    Current: employee.skills[skill],
    Required: target[skill] || 0,
  }));

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-indigo-700">📊 Skill Comparison</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ReRadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="skill" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Radar
              name="Current"
              dataKey="Current"
              stroke="#6366F1"
              fill="#6366F1"
              fillOpacity={0.4}
            />
            <Radar
              name="Required"
              dataKey="Required"
              stroke="#F59E0B"
              fill="#F59E0B"
              fillOpacity={0.3}
            />
          </ReRadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
