"use client";
import {
  ResponsiveContainer,
  Radar,
  RadarChart as RChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  Legend,
} from "recharts";

export default function RadarChart({ employee, role }) {
  if (!employee?.skills || !role?.skills) return null;
  // console.log(employee,skills)

  // Compare each skill between employee and target role
  const data = Object.keys({ ...employee.skills, ...role.skills }).map((skill) => ({
    skill,
    employee: employee.skills[skill] || 0,
    target: role.skills[skill] || 0,
  }));

  console.log(data)

  return (
    <div className="w-full h-[420px] bg-white rounded-2xl shadow-sm p-4 flex flex-col justify-center items-center">
      <h3 className="text-lg font-semibold text-indigo-700 mb-3">
        Skill Gap Visualization ({role.title || "Target Role"})
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <RChart data={data} cx="50%" cy="50%" outerRadius="75%">
          <PolarGrid stroke="#E5E7EB" />
          <PolarAngleAxis dataKey="skill" tick={{ fill: "#4B5563", fontSize: 13 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#9CA3AF" }} />
          <Tooltip />
          <Legend />

          <defs>
            <linearGradient id="empGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#818CF8" stopOpacity={0.3} />
            </linearGradient>
            <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#6EE7B7" stopOpacity={0.3} />
            </linearGradient>
          </defs>

          {/* Employee Skill Level */}
          <Radar
            name="Employee"
            dataKey="employee"
            stroke="#4F46E5"
            fill="url(#empGradient)"
            fillOpacity={0.6}
          />

          {/* Target Role Requirements */}
          <Radar
            name="Target Role"
            dataKey="target"
            stroke="#10B981"
            fill="url(#targetGradient)"
            fillOpacity={0.4}
          />
        </RChart>
      </ResponsiveContainer>
    </div>
  );
}
