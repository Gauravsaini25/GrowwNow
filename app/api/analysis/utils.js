export function computeGaps(employee, role) {
  const gaps = [];
  for (const skill in role.skills) {
    const current = employee.skills[skill] || 0;
    const required = role.skills[skill];
    if (required > current) {
      gaps.push({
        skill,
        current,
        required,
        gap: required - current,
      });
    }
  }
  return gaps;
}

export function recommendDevelopment(gaps) {
  return gaps.map(
    (g) => `Focus on improving ${g.skill} by ${g.gap} points through mentorship and targeted learning.`
  );
}
