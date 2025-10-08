"use client";
import { useEffect, useState } from "react";
import SkillGapCard from "@/components/SkillGapCard";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RadarChart from "@/components/RadarChart";

export default function AnalysisPage() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const employeeId = 1; // Hardcoded
  const roleId = 101;

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const res = await fetch("/api/analysis", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ employeeId, roleId }),
        });

        if (!res.ok) throw new Error(`Analysis API failed with status ${res.status}`);

        const data = await res.json();
        setAnalysis(data);
      } catch (err) {
        console.error("❌ Analysis API error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, []);

  if (loading)
    return (
      <div className="p-6 text-gray-500 flex justify-center items-center min-h-[60vh]">
        ⏳ Loading analysis...
      </div>
    );
  if (error)
    return <div className="p-6 text-red-500">⚠️ {error}</div>;
  if (!analysis)
    return <div className="p-6 text-red-500">⚠️ No analysis data found</div>;

  // Calculate summary metrics
  const totalSkills = Object.keys(analysis.employee.skills || {}).length;
  const gapsCount = analysis.gaps?.length || 0;
  const skillsMastered = totalSkills - gapsCount;

  return (
    <div className="p-6 space-y-6">
      <Header title="Skill Gap Analysis" subtitle="Visualize your skill gaps and AI recommendations" />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
            <p className="text-gray-700 text-2xl mt-1">{skillsMastered}</p>
          </CardContent>
        </Card>
      </div>

      {/* Skill Gap Analysis */}
      <SkillGapCard
        employee={analysis.employee}
        role={analysis.role}
        gaps={analysis.gaps}
      />

      {/* Radar Chart for Skill Comparison */}
      <RadarChart employee={analysis.employee} role={analysis.role.name} />

      {/* AI Recommendations with priority badges */}
      <Card>
        <CardHeader>
          <CardTitle>AI Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {(analysis.recos || []).map((rec, idx) => (
            <div
              key={idx}
              className="p-3 bg-indigo-50 rounded-lg flex justify-between items-center hover:bg-indigo-100 transition cursor-pointer"
            >
              <span className="text-gray-700">{rec.text || rec}</span>
              {rec.priority && (
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    rec.priority === "High"
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

      {/* Optional: Detailed Gap List */}
      {analysis.gaps?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Detailed Skill Gaps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {analysis.gaps.map((g, idx) => (
              <div
                key={idx}
                className="flex justify-between p-2 border rounded-lg hover:bg-red-50 transition"
              >
                <span>{g.skill}</span>
                <span className="font-semibold text-red-600">
                  {g.employee} → {g.required}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
