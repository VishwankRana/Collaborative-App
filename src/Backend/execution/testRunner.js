import { executeCode } from "../services/codeExecution.js";
import { buildDriverProgram } from "./driverBuilder.js";
import {
  enrichTestCase,
  resolveProblemExecutionContext,
  sanitizeUserCode,
} from "./legacyConverter.js";
import { hasDriverMetadata } from "./problemMetadata.js";
import { outputsMatch } from "./outputCompare.js";
import {
  formatArgsForDisplay,
  formatExpectedOutput,
} from "./valueFormatter.js";

export function normalizeTestCase(testCase = {}, problem = {}) {
  const enriched = enrichTestCase(testCase, problem);

  if (Array.isArray(enriched.args)) {
    const executionProblem = resolveProblemExecutionContext({ problem });

    return {
      args: enriched.args,
      expected: enriched.expected ?? enriched.expectedOutput,
      isHidden: Boolean(enriched.isHidden),
      input:
        enriched.input ||
        formatArgsForDisplay(executionProblem, enriched.args),
      expectedOutput:
        enriched.expectedOutput ||
        formatExpectedOutput(enriched.expected ?? enriched.expectedOutput),
    };
  }

  return {
    args: null,
    expected: enriched.expectedOutput,
    isHidden: Boolean(enriched.isHidden),
    input: enriched.input || "",
    expectedOutput: enriched.expectedOutput || "",
    legacy: true,
  };
}

function shouldUseDriver(language, problem, normalized) {
  if (!hasDriverMetadata(problem)) {
    return false;
  }

  if (!Array.isArray(normalized.args)) {
    return false;
  }

  if (language === "java" || language === "cpp") {
    return true;
  }

  return true;
}

export async function runTestCase({
  language,
  userCode,
  problem = {},
  testCase = {},
}) {
  const executionProblem = resolveProblemExecutionContext({ problem });
  const normalized = normalizeTestCase(testCase, problem);
  const sanitizedCode = sanitizeUserCode(language, userCode);

  if (shouldUseDriver(language, executionProblem, normalized)) {
    const program = buildDriverProgram({
      language,
      userCode: sanitizedCode,
      problem: executionProblem,
      args: normalized.args,
    });

    const result = await executeCode(language, program, "");
    const actualOutput = result.stdout.trim();
    const stderr = result.stderr?.trim() || "";
    const passed =
      result.exitCode === 0 &&
      !stderr &&
      outputsMatch(actualOutput, normalized.expected);

    return {
      ...result,
      passed,
      actualOutput: stderr && !actualOutput ? stderr : actualOutput,
      expectedOutput: formatExpectedOutput(normalized.expected),
      input: normalized.input,
      isHidden: normalized.isHidden,
      stderr,
    };
  }

  const result = await executeCode(language, sanitizedCode, normalized.input || "");
  const actualOutput = result.stdout.trim();
  const stderr = result.stderr?.trim() || "";
  const passed = actualOutput === String(normalized.expectedOutput || "").trim();

  return {
    ...result,
    passed,
    actualOutput: stderr && !actualOutput ? stderr : actualOutput,
    expectedOutput: normalized.expectedOutput,
    input: normalized.input,
    isHidden: normalized.isHidden,
    stderr,
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
