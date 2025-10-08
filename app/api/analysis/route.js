// app/api/analysis/route.js
import { EMPLOYEES } from "../../../mock/employees";
import { ROLES } from "../../../mock/data";
import { computeGaps, recommendDevelopment } from "./utils";

export async function POST(req) {
  try {
    const { employeeId, roleId } = await req.json();

    const employee = EMPLOYEES.find(e => e.id === employeeId);
    const role = ROLES.find(r => r.id === roleId);

    if (!employee || !role) {
      return new Response(
        JSON.stringify({ error: "Invalid employee or role" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const gaps = computeGaps(employee, role);
    const recos = recommendDevelopment(gaps);

    return new Response(
      JSON.stringify({ employee, role, gaps, recos }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Server error", details: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
