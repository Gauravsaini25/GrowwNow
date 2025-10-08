import { Card, CardContent } from "@/components/ui/card";

export default function SkillGapCard({ employee, role, gaps }) {
  return (
    <Card className="rounded-2xl shadow-lg bg-gradient-to-br from-indigo-50 to-white hover:shadow-xl transition">
      <CardContent className="p-5 space-y-5">
        <h2 className="text-xl font-bold text-indigo-700">📉 Skill Gap Analysis</h2>
        <p className="text-sm text-gray-700">
          Comparing <b>{employee.name}</b> with role <b>{role.name}</b>
        </p>

        {gaps.length > 0 ? (
          <div className="space-y-4">
            {gaps.map((g, i) => {
              const percent = Math.min((g.employee / g.required) * 100, 100);
              const priority = g.gap > 20 ? "High Priority" : g.gap > 10 ? "Medium" : "Low";

              return (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{g.skill}</span>
                    <span>{g.employee}/{g.required}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-500 h-2 rounded-full transition-all"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500">Priority: <b>{priority}</b></p>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-green-600 font-medium">✅ No skill gaps!</p>
        )}
      </CardContent>
    </Card>
  );
}
