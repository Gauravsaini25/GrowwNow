export async function POST() {
  // Mock logout endpoint
  return new Response(JSON.stringify({ success: true, message: "Logged out successfully" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
