export function getProblemExecutionContext(room = {}) {
  const problem = room.problem || {};

  return {
    functionName: problem.functionName || room.functionName || "",
    className: problem.className || "Solution",
    functionNames: problem.functionNames || {},
    returnType: problem.returnType || {},
    parameters: problem.parameters || [],
  };
}
