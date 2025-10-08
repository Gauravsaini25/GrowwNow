import Header from "@/components/Header";
import AIRecCard from "@/components/AIRecCard";

export default function AIPage() {
  const recos = [
    "Enroll in advanced strategy workshop",
    "Shadow senior leader in quarterly review",
    "Take online course in decision science"
  ];

  return (
    <div className="p-6 space-y-6">
      <Header title="AI Suggestions" subtitle="Smart recommendations for your growth" />
      <AIRecCard recos={recos} />
    </div>
  );
}
