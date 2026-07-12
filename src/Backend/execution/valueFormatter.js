function isIntArray(value) {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((entry) => typeof entry === "number" && Number.isInteger(entry))
  );
}

function isStringArray(value) {
  return Array.isArray(value) && value.every((entry) => typeof entry === "string");
}

function is2DIntArray(value) {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((row) => isIntArray(row))
  );
}

function is2DCharGrid(value) {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every(
      (row) =>
        Array.isArray(row) &&
        row.every((cell) => typeof cell === "string" && cell.length === 1)
    )
  );
}

export function inferValueKind(value) {
  if (typeof value === "number") {
    return Number.isInteger(value) ? "int" : "number";
  }

  if (typeof value === "boolean") {
    return "boolean";
  }

  if (typeof value === "string") {
    return "string";
  }

  if (is2DCharGrid(value)) {
    return "char[][]";
  }

  if (is2DIntArray(value)) {
    return "int[][]";
  }

  if (isIntArray(value)) {
    return "int[]";
  }

  if (isStringArray(value)) {
    return "string[]";
  }

  if (Array.isArray(value)) {
    return "array";
  }

  return "unknown";
}

export function formatValueForLanguage(language, value) {
  const kind = inferValueKind(value);

  switch (language) {
    case "javascript":
      return formatJavaScriptValue(value, kind);
    case "python":
      return formatPythonValue(value, kind);
    case "java":
      return formatJavaValue(value, kind);
    case "cpp":
      return formatCppValue(value, kind);
    default:
      return JSON.stringify(value);
  }
}

function formatJavaScriptValue(value, kind) {
  if (kind === "string") {
    return JSON.stringify(value);
  }

  return JSON.stringify(value);
}

function formatPythonValue(value, kind) {
  if (kind === "boolean") {
    return value ? "True" : "False";
  }

  if (kind === "string") {
    return JSON.stringify(value);
  }

  if (typeof value === "number") {
    return String(value);
  }

  return JSON.stringify(value);
}

function formatJavaValue(value, kind) {
  if (kind === "int" || kind === "number") {
    return String(value);
  }

  if (kind === "boolean") {
    return value ? "true" : "false";
  }

  if (kind === "string") {
    return `"${String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
  }

  if (kind === "int[]") {
    return `new int[]{${value.join(",")}}`;
  }

  if (kind === "string[]") {
    return `new String[]{${value.map((entry) => `"${entry.replace(/"/g, '\\"')}"`).join(",")}}`;
  }

  if (kind === "char[][]") {
    const rows = value
      .map((row) => {
        const cells = row.map((cell) => `'${cell.replace(/'/g, "\\'")}'`).join(",");
        return `new char[]{${cells}}`;
      })
      .join(", ");
    return `new char[][]{${rows}}`;
  }

  if (kind === "int[][]") {
    const rows = value
      .map((row) => `new int[]{${row.join(",")}}`)
      .join(", ");
    return `new int[][]{${rows}}`;
  }

  if (kind === "array") {
    return JSON.stringify(value);
  }

  return JSON.stringify(value);
}

function formatCppValue(value, kind) {
  if (kind === "int" || kind === "number") {
    return String(value);
  }

  if (kind === "boolean") {
    return value ? "true" : "false";
  }

  if (kind === "string") {
    return `"${String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
  }

  if (kind === "int[]") {
    return `{${value.join(",")}}`;
  }

  if (kind === "string[]") {
    return `{${value.map((entry) => `"${entry.replace(/"/g, '\\"')}"`).join(",")}}`;
  }

  if (kind === "char[][]") {
    const rows = value
      .map((row) => `{${row.map((cell) => `'${cell.replace(/'/g, "\\'")}'`).join(",")}}`)
      .join(", ");
    return `vector<vector<char>>{${rows}}`;
  }

  if (kind === "int[][]") {
    const rows = value.map((row) => `{${row.join(",")}}`).join(", ");
    return `vector<vector<int>>{${rows}}`;
  }

  return JSON.stringify(value);
}

export function formatExpectedOutput(expected) {
  if (expected === null || expected === undefined) {
    return "";
  }

  if (
    typeof expected === "string" ||
    typeof expected === "number" ||
    typeof expected === "boolean"
  ) {
    return String(expected);
  }

  return JSON.stringify(expected);
}

export function formatArgsForDisplay(problem = {}, args = []) {
  const names = (problem.parameters || []).map((parameter) => parameter.name);

  if (!names.length) {
    return JSON.stringify(args);
  }

  return args
    .map((value, index) => {
      const label = names[index] || `arg${index}`;
      return `${label} = ${JSON.stringify(value)}`;
    })
    .join(", ");
}
