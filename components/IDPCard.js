import { Card, CardContent } from "@/components/ui/card";

export default function IDPCard({ idp }) {
  return (
    <Card className="rounded-2xl shadow-md bg-white">
      <CardContent className="p-4 space-y-4">
        <h2 className="text-lg font-semibold">Individual Development Plan</h2>
        
        <div>
          <h3 className="font-medium">📘 Learning Modules</h3>
          <ul className="list-disc pl-5 text-sm">
            {idp.learning.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        </div>

        <div>
          <h3 className="font-medium">🛠 On-Job Activities</h3>
          <ul className="list-disc pl-5 text-sm">
            {idp.onJob.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        </div>

        <div>
          <h3 className="font-medium">🎯 Milestones</h3>
          <ul className="list-disc pl-5 text-sm">
            {idp.milestones.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
