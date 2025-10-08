export default function ProfileCard({ employee }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-3 text-indigo-700">Profile</h2>
      <p><strong>Name:</strong> {employee.name}</p>
      <p><strong>Current Role:</strong> {employee.currentRole}</p>
      <p><strong>Target Role:</strong> {employee.targetRole}</p>
      <div className="mt-3">
        <h3 className="font-semibold text-gray-700 mb-1">Skills</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          {Object.entries(employee.skills).map(([skill, value]) => (
            <li key={skill} className="flex justify-between">
              <span>{skill}</span>
              <span className="font-medium">{value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
