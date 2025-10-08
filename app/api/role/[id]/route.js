import { ROLES } from '../../../../mock/data'


export async function GET(req, { params }) {
const role = ROLES.find(r => r.id === params.id)
if (!role) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 , headers: { "Content-Type": "application/json" } })
return new Response(JSON.stringify(role), { status: 200 , headers: { "Content-Type": "application/json" } })
}