import { PROBLEM_EXECUTION_PROFILES } from "../seed/problemExecutionProfiles.js";
import {
  formatArgsForDisplay,
  formatExpectedOutput,
} from "./valueFormatter.js";

function parseNumberList(value) {
  return String(value || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map(Number);
}

function parseLegacyExpected(expectedOutput, returnType = {}) {
  const trimmed = String(expectedOutput ?? "").trim();

  if (!trimmed) {
    return "";
  }

  if (trimmed === "true") {
    return true;
  }

  if (trimmed === "false") {
    return false;
  }

  if (/^-?\d+$/.test(trimmed)) {
    return Number(trimmed);
  }

  if (trimmed.startsWith("[") || trimmed.startsWith("{")) {
    try {
      return JSON.parse(trimmed);
    } catch {
      return trimmed;
    }
  }

  const javaReturn = returnType.java || "";
  const jsReturn = returnType.javascript || "";

  if (
    javaReturn.includes("[]") ||
    jsReturn.includes("[]") ||
    (trimmed.includes(" ") && /^[\d\s-]+$/.test(trimmed))
  ) {
    return parseNumberList(trimmed);
  }

  if (trimmed.includes("\n")) {
    return trimmed
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => parseNumberList(line));
  }

  return trimmed;
}

function parseLegacyArgs(input, parameters = []) {
  const trimmed = String(input || "").trim();

  if (!parameters.length) {
    return null;
  }

  if (parameters.length === 1) {
    const parameter = parameters[0];
    const javaType = parameter.type?.java || "";

    if (javaType === "String" || parameter.name === "s") {
      return [trimmed];
    }

    if (javaType === "int[]") {
      if (trimmed.includes("\n")) {
        return [
          trimmed.split("\n").map((line) =>
            line.trim().split(/\s+/).map((cell) => cell)
          ),
        ];
      }

      return [parseNumberList(trimmed)];
    }

    if (javaType === "int") {
      return [Number(trimmed)];
    }

    if (javaType === "int[][]") {
      return [
        trimmed.split("\n").map((line) => parseNumberList(line)),
      ];
    }
  }

  if (parameters.length === 2) {
    const lines = trimmed.split("\n");
    const first = parameters[0];
    const second = parameters[1];
    const firstType = first.type?.java || "";

    const arg0 =
      firstType === "int[]"
        ? parseNumberList(lines[0] || "")
        : (lines[0] || "").trim();

    if ((second.type?.java || "") === "int") {
      return [arg0, Number((lines[1] || "").trim())];
    }

    if ((second.type?.java || "") === "String[]") {
      return [arg0, (lines[1] || "").trim().split(/\s+/).filter(Boolean)];
    }
  }

  return null;
}

export function getProfileForProblem(problem = {}) {
  const title = String(problem.title || "").trim();

  if (!title) {
    return null;
  }

  return PROBLEM_EXECUTION_PROFILES[title] || null;
}

export function resolveProblemExecutionContext(room = {}) {
  const problem = room.problem || {};
  const profile = getProfileForProblem(problem);

  return {
    functionName: problem.functionName || profile?.functionName || "",
    className: problem.className || profile?.className || "Solution",
    functionNames: {
      ...(profile?.functionNames || {}),
      ...(problem.functionNames || {}),
    },
    returnType: {
      ...(profile?.returnType || {}),
      ...(problem.returnType || {}),
    },
    parameters:
      problem.parameters?.length > 0
        ? problem.parameters
        : profile?.parameters || [],
  };
}

export function enrichTestCase(testCase = {}, problem = {}) {
  if (Array.isArray(testCase.args)) {
    return testCase;
  }

  const profile = getProfileForProblem(problem);
  const executionProblem = resolveProblemExecutionContext({ problem });
  const parameters = executionProblem.parameters;

  if (!parameters.length) {
    return testCase;
  }

  const args = parseLegacyArgs(testCase.input, parameters);

  if (!args) {
    return testCase;
  }

  const expected = parseLegacyExpected(
    testCase.expectedOutput,
    executionProblem.returnType
  );

  return {
    ...testCase,
    args,
    expected,
    input:
      testCase.input ||
      formatArgsForDisplay(executionProblem, args),
    expectedOutput:
      testCase.expectedOutput || formatExpectedOutput(expected),
  };
}

export function sanitizeUserCode(language, userCode = "") {
  if (language !== "java") {
    return userCode;
  }

  return userCode
    .replace(/\bpublic\s+class\s+Solution\b/g, "class Solution")
    .replace(/\bpublic\s+class\s+Main\b/g, "class Main");
}
