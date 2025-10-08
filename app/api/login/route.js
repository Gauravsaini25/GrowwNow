// app/api/login/route.js
import { EMPLOYEES } from "../../../mock/employees";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 , headers: { "Content-Type": "application/json" } });
    }

    const employee = EMPLOYEES.find((e) => e.email === email && e.password === password);

    if (!employee) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401, headers: { "Content-Type": "application/json" }  });
    }

    // NOTE: this is a mock — no JWT. We return the employee object (without password).
    const { password: _p, ...safe } = employee;
    return new Response(JSON.stringify({ success: true, employee: safe }), { status: 200 , headers: { "Content-Type": "application/json" } });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error", details: err.message }), {
      status: 500, headers: { "Content-Type": "application/json" } 
    });
  }
}
