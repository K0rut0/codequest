export async function getProblems() {
  const res = await fetch("/api/problem", { method: "GET" });
  const data = await res.json();
  return data;
}

export async function getProblem({ id }) {
  const res = await fetch(`/api/problem/${id}`, { method: "GET" });
  const data = await res.json();
  return data;
}
