import { Card, CardContent } from "@/components/ui/card";

export default function AISuggestions({ employee }) {
  return (
    <Card className="rounded-2xl shadow-md bg-white">
      <CardContent className="p-4 space-y-3">
        <h2 className="text-lg font-semibold">AI Suggestions</h2>
        <div>
          <h3 className="font-medium">🚀 Next Roles</h3>
          <ul className="list-disc pl-5 text-sm">
            <li>{employee.targetRole}</li>
            <li>General Manager</li>
          </ul>
        </div>
        <div>
          <h3 className="font-medium">📘 Learning Paths</h3>
          <ul className="list-disc pl-5 text-sm">
            <li>Executive Leadership Program</li>
            <li>Data-driven Strategy Course</li>
          </ul>
        </div>
        <div>
          <h3 className="font-medium">🤝 Mentor Suggestions</h3>
          <ul className="list-disc pl-5 text-sm">
            <li>Priya Mehta (Operations Head)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
