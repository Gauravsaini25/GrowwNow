// Next.js 13+ API route
export async function POST(req) {
  try {
    const { employeeId } = await req.json();

    // Mock data - replace with real DB fetch if available
    const mockEmployees = {
      1: {
        id: 1,
        name: "John Doe",
        skills: {
          Leadership: 70,
          Strategy: 65,
          Communication: 80,
          Technical: 75,
        },
      },
      2: {
        id: 2,
        name: "Jane Smith",
        skills: {
          Leadership: 85,
          Strategy: 70,
          Communication: 90,
          Technical: 60,
        },
      },
    };

    const mockAnalysis = {
      1: {
        gaps: [
          { skill: "Leadership", employee: 70, required: 80 },
          { skill: "Strategy", employee: 65, required: 75 },
        ],
        recos: [
          { text: "Complete Leadership training module", priority: "High" },
          { text: "Read strategy playbooks", priority: "Medium" },
          { text: "Join communication workshop", priority: "Low" },
        ],
      },
      2: {
        gaps: [],
        recos: [
          { text: "Take advanced technical training", priority: "High" },
        ],
      },
    };

    const employee = mockEmployees[employeeId] || null;
    const analysis = mockAnalysis[employeeId] || { gaps: [], recos: [] };

    if (!employee) {
      return new Response(JSON.stringify({ error: "Employee not found" }), { status: 404 });
    }

    const totalSkills = Object.keys(employee.skills).length;
    const gapsCount = analysis.gaps.length;
    const skillsMastered = totalSkills - gapsCount;

    const summary = {
      employeeId: employee.id,
      employeeName: employee.name,
      totalSkills,
      gapsCount,
      skillsMastered,
      recos: analysis.recos.slice(0, 3), // top 3 for dashboard
    };

    return new Response(JSON.stringify(summary), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
