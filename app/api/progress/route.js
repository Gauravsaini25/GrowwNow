// app/api/progress/route.js
export async function POST(req) {
  try {
    const body = await req.json();
    
    console.log("📩 Progress API received body:", body);

    const { employeeId } = body;
    console.log("👉 EmployeeId received:", employeeId);

    const progressData = {
      1: { gapsClosed: 40, activitiesDone: 5, nextMilestone: "Leadership Training Completion" },
      2: { gapsClosed: 55, activitiesDone: 8, nextMilestone: "Advanced Strategy Workshop" },
    };

    const progress = progressData[employeeId];

    if (!progress) {
      console.warn("⚠️ No progress found for employeeId:", employeeId);
      return new Response(JSON.stringify({ error: "No progress data found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(progress), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("❌ Progress API error:", err);
    return new Response(
      JSON.stringify({ error: "Server error", details: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
