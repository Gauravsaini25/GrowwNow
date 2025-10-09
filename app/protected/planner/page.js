"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, Target, BookOpen, Trophy, Circle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Planner() {
  const [roadmap, setRoadmap] = useState([]);

  useEffect(() => {
    // Enhanced roadmap with sub-steps (mini milestones)
    const data = [
      {
        id: 1,
        title: "Current Role",
        subtitle: "Team Lead",
        icon: <CheckCircle2 className="text-indigo-600 w-7 h-7" />,
        status: "completed",
        description: "You’ve mastered your current responsibilities and led your team effectively.",
        substeps: [
          { id: 1, label: "Completed all sprint goals", done: true },
          { id: 2, label: "Team management certified", done: true },
          { id: 3, label: "Cross-team collaboration", done: true },
        ],
      },
      {
        id: 2,
        title: "Skill Gap Identification",
        subtitle: "Leadership & Strategy",
        icon: <Clock className="text-yellow-500 w-7 h-7" />,
        status: "in-progress",
        description: "Focus on strategic decision-making and advanced leadership communication.",
        substeps: [
          { id: 1, label: "Leadership feedback review", done: true },
          { id: 2, label: "Attend mentorship sessions", done: false },
          { id: 3, label: "Gap report approval", done: false },
        ],
      },
      {
        id: 3,
        title: "Training Phase",
        subtitle: "Advanced Leadership Program",
        icon: <BookOpen className="text-green-500 w-7 h-7" />,
        status: "pending",
        description: "Enroll in GrowwNow’s leadership course to enhance executive-level management skills.",
        substeps: [
          { id: 1, label: "Enroll in program", done: false },
          { id: 2, label: "Complete first module", done: false },
          { id: 3, label: "Weekly evaluation", done: false },
        ],
      },
      {
        id: 4,
        title: "Applied Projects",
        subtitle: "Cross-functional collaboration",
        icon: <Trophy className="text-blue-500 w-7 h-7" />,
        status: "pending",
        description: "Lead 2 high-impact cross-team projects to demonstrate leadership growth.",
        substeps: [
          { id: 1, label: "Project planning", done: false },
          { id: 2, label: "Execution phase", done: false },
          { id: 3, label: "Team presentation", done: false },
        ],
      },
      {
        id: 5,
        title: "Target Role",
        subtitle: "Deputy Manager",
        icon: <Target className="text-emerald-600 w-7 h-7" />,
        status: "upcoming",
        description: "Achieve your target role with full competency alignment and proven results.",
        substeps: [
          { id: 1, label: "Review with HR", done: false },
          { id: 2, label: "Performance validation", done: false },
          { id: 3, label: "Promotion interview", done: false },
        ],
      },
    ];

    setRoadmap(data);
  }, []);

  return (
    <div className="flex w-[78vw]">
      <div className="flex min-h-screen bg-gray-50 w-[82vw]">
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-8">
              Career Growth Planner
            </h1>

            <div className="relative">
              {/* Vertical timeline line */}
              <div className="absolute left-1/2 top-0 w-1 bg-indigo-100 h-full -translate-x-1/2 rounded-full" />

              {/* Steps */}
              <div className="flex flex-col items-center space-y-10 relative z-10">
                {roadmap.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, type: "spring" }}
                    className="w-full flex justify-center"
                  >
                    <div
                      className={`relative w-[60%] ${
                        index % 2 === 0
                          ? "self-start translate-x-[-15%]"
                          : "self-end translate-x-[15%]"
                      }`}
                    >
                      <Card
                        className={`shadow-md rounded-2xl border ${
                          step.status === "completed"
                            ? "border-emerald-500 bg-emerald-50"
                            : step.status === "in-progress"
                            ? "border-yellow-400 bg-yellow-50"
                            : step.status === "pending"
                            ? "border-indigo-300 bg-indigo-50"
                            : "border-gray-200 bg-white"
                        }`}
                      >
                        <CardHeader className="flex flex-row items-center space-x-4">
                          <div>{step.icon}</div>
                          <div>
                            <CardTitle className="text-lg font-semibold text-gray-800">
                              {step.title}
                            </CardTitle>
                            <p className="text-sm text-gray-600">{step.subtitle}</p>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                            {step.description}
                          </p>

                          {/* Substeps */}
                          <ul className="space-y-2">
                            {step.substeps.map((sub) => (
                              <li
                                key={sub.id}
                                className="flex items-center space-x-2 text-sm"
                              >
                                {sub.done ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                ) : (
                                  <Circle className="w-4 h-4 text-gray-400" />
                                )}
                                <span
                                  className={`${
                                    sub.done ? "text-emerald-700" : "text-gray-600"
                                  }`}
                                >
                                  {sub.label}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      {/* Connector Dot */}
                      <div className="absolute top-1/2 -left-[10px] w-5 h-5 bg-indigo-600 rounded-full border-4 border-white shadow-md" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
