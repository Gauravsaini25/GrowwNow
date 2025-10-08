import { Card, CardContent } from "@/components/ui/card";

export default function AIRecCard({ recos }) {
  return (
    <Card className="rounded-2xl shadow-lg bg-gradient-to-br from-purple-50 to-white hover:shadow-xl transition">
      <CardContent className="p-5 space-y-4">
        <h2 className="text-xl font-bold text-indigo-700">🤖 AI Recommendations</h2>
        <div className="flex flex-wrap gap-2">
          {recos.map((r, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full shadow-sm"
            >
              {r}
            </span>
          ))}
        </div>
        <button className="mt-3 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
          Start Recommended Learning
        </button>
      </CardContent>
    </Card>
  );
}
