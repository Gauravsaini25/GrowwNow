export default function GapList({ gaps, recommendations }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow col-span-3">
      <h2 className="text-xl font-semibold mb-4 text-indigo-700">Skill Gaps</h2>
      {gaps.length > 0 ? (
        <>
          <ul className="space-y-2 mb-4">
            {gaps.map((g, i) => (
              <li
                key={i}
                className="flex justify-between border-b py-1 text-sm text-gray-600"
              >
                <span>{g.skill}</span>
                <span className="text-red-600">-{g.gap}</span>
              </li>
            ))}
          </ul>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Recommendations</h3>
          <ul className="list-disc pl-6 text-sm text-gray-600">
            {recommendations.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-gray-500">No gaps detected — great job!</p>
      )}
    </div>
  );
}
