import { EMPLOYEES } from '../../../../mock/data'


export async function GET(req, { params }) {
const emp = EMPLOYEES.find(e => e.id === params.id)
if (!emp) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 })
return new Response(JSON.stringify(emp), { status: 200 })
}