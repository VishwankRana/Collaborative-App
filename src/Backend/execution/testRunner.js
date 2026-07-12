import { executeCode } from "../services/codeExecution.js";
import { buildDriverProgram } from "./driverBuilder.js";
import { hasDriverMetadata } from "./problemMetadata.js";
import { outputsMatch } from "./outputCompare.js";
import {
  formatArgsForDisplay,
  formatExpectedOutput,
} from "./valueFormatter.js";

export function normalizeTestCase(testCase = {}, problem = {}) {
  if (Array.isArray(testCase.args)) {
    return {
      args: testCase.args,
      expected: testCase.expected ?? testCase.expectedOutput,
      isHidden: Boolean(testCase.isHidden),
      input:
        testCase.input ||
        formatArgsForDisplay(problem, testCase.args),
      expectedOutput:
        testCase.expectedOutput ||
        formatExpectedOutput(testCase.expected ?? testCase.expectedOutput),
    };
  }

  return {
    args: null,
    expected: testCase.expectedOutput,
    isHidden: Boolean(testCase.isHidden),
    input: testCase.input || "",
    expectedOutput: testCase.expectedOutput || "",
    legacy: true,
  };
}

export async function runTestCase({
  language,
  userCode,
  problem = {},
  testCase = {},
}) {
  const normalized = normalizeTestCase(testCase, problem);

  if (hasDriverMetadata(problem) && Array.isArray(normalized.args)) {
    const program = buildDriverProgram({
      language,
      userCode,
      problem,
      args: normalized.args,
    });

    const result = await executeCode(language, program, "");
    const actualOutput = result.stdout.trim();
    const passed =
      result.exitCode === 0 &&
      !result.stderr?.trim() &&
      outputsMatch(actualOutput, normalized.expected);

    return {
      ...result,
      passed,
      actualOutput,
      expectedOutput: formatExpectedOutput(normalized.expected),
      input: normalized.input,
      isHidden: normalized.isHidden,
    };
  }

  const result = await executeCode(language, userCode, normalized.input || "");
  const actualOutput = result.stdout.trim();
  const passed = actualOutput === String(normalized.expectedOutput || "").trim();

  return {
    ...result,
    passed,
    actualOutput,
    expectedOutput: normalized.expectedOutput,
    input: normalized.input,
    isHidden: normalized.isHidden,
  };
}

export async function runTestCases({
  language,
  userCode,
  problem = {},
  testCases = [],
  options = {},
}) {
  const { stopOnFailure = false, includeHidden = true } = options;
  const results = [];

  for (const testCase of testCases) {
    if (!includeHidden && testCase.isHidden) {
      continue;
    }

    const result = await runTestCase({
      language,
      userCode,
      problem,
      testCase,
    });

    results.push(result);

    if (stopOnFailure && !result.passed) {
      break;
    }
  }

  const passedCount = results.filter((entry) => entry.passed).length;

  return {
    results,
    passedCount,
    totalCount: results.length,
    successRate: results.length ? Math.round((passedCount / results.length) * 100) : 0,
  };
}

export function serializeTestResult(result, role) {
  if (role === "candidate" && result.isHidden) {
    return {
      passed: result.passed,
      isHidden: true,
      executionTime: result.executionTime,
    };
  }

  return {
    passed: result.passed,
    isHidden: Boolean(result.isHidden),
    input: result.input,
    expectedOutput: result.expectedOutput,
    actualOutput: result.actualOutput,
    stderr: result.stderr,
    exitCode: result.exitCode,
    executionTime: result.executionTime,
  };
}

export function getSampleTestCase(testCases = []) {
  return testCases.find((testCase) => !testCase.isHidden) || testCases[0] || null;
}
