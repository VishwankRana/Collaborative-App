function normalizeComparable(value) {
  if (value === null || value === undefined) {
    return "";
  }

  if (typeof value === "string") {
    const trimmed = value.trim();

    if (!trimmed) {
      return "";
    }

    try {
      return JSON.parse(trimmed);
    } catch {
      return trimmed;
    }
  }

  return value;
}

function sortNestedArrays(value) {
  if (!Array.isArray(value)) {
    return value;
  }

  if (value.every((entry) => Array.isArray(entry))) {
    const normalizedRows = value.map((entry) => sortNestedArrays(entry));
    return normalizedRows.sort((left, right) =>
      JSON.stringify(left).localeCompare(JSON.stringify(right))
    );
  }

  return value;
}

export function outputsMatch(actualOutput, expected) {
  const actual = normalizeComparable(actualOutput);
  const expectedValue = normalizeComparable(
    typeof expected === "string" ? expected : formatExpectedForCompare(expected)
  );

  if (Array.isArray(actual) && Array.isArray(expectedValue)) {
    if (
      actual.every((entry) => Array.isArray(entry)) &&
      expectedValue.every((entry) => Array.isArray(entry))
    ) {
      return (
        JSON.stringify(sortNestedArrays(actual)) ===
        JSON.stringify(sortNestedArrays(expectedValue))
      );
    }
  }

  return JSON.stringify(actual) === JSON.stringify(expectedValue);
}

function formatExpectedForCompare(expected) {
  if (typeof expected === "number" || typeof expected === "boolean") {
    return expected;
  }

  if (Array.isArray(expected)) {
    return expected;
  }

  return String(expected);
}
