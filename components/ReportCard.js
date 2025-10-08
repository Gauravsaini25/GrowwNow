import { Card, CardContent } from "@/components/ui/card";

export default function ReportCard({ progress }) {
  return (
    <Card className="rounded-2xl shadow-lg bg-gradient-to-br from-green-50 to-white hover:shadow-xl transition">
      <CardContent className="p-5 space-y-5">
        <h2 className="text-xl font-bold text-indigo-700">📈 Progress Report</h2>

        <div className="space-y-3">
          <p><b>Gaps Closed:</b> {progress.gapsClosed}%</p>
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${progress.gapsClosed}%` }}
            ></div>
          </div>

          <p><b>Activities Completed:</b> {progress.activitiesDone}</p>
          <p><b>Next Milestone:</b> {progress.nextMilestone}</p>
        </div>

        <div className="mt-4 space-y-2">
          <h3 className="font-medium text-gray-700">🔎 Insights</h3>
          <ul className="list-disc pl-6 text-sm text-gray-600">
            <li>You’ve closed {progress.gapsClosed}% of your skill gaps.</li>
            <li>Completed <b>{progress.activitiesDone}</b> activities — stay consistent!</li>
            <li>Next focus: <b>{progress.nextMilestone}</b></li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
