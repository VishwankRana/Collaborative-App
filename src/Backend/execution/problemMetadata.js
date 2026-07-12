const PYTHON_NAME_OVERRIDES = {
  twoSum: "two_sum",
  isValid: "is_valid",
  maxProfit: "max_profit",
  containsDuplicate: "contains_duplicate",
  maxSubArray: "max_sub_array",
  climbStairs: "climb_stairs",
  lengthOfLongestSubstring: "length_of_longest_substring",
  threeSum: "three_sum",
  productExceptSelf: "product_except_self",
  maxArea: "max_area",
  coinChange: "coin_change",
  numIslands: "num_islands",
  findMin: "find_min",
  trap: "trap",
  mergeKLists: "merge_k_lists",
  wordBreak: "word_break",
};

export function camelToSnake(value) {
  return String(value || "")
    .replace(/([A-Z])/g, "_$1")
    .toLowerCase()
    .replace(/^_/, "");
}

export function getFunctionNameForLanguage(problem = {}, language) {
  const override = problem.functionNames?.[language];

  if (override) {
    return override;
  }

  const baseName = problem.functionName || "solution";

  if (language === "python") {
    return PYTHON_NAME_OVERRIDES[baseName] || camelToSnake(baseName);
  }

  return baseName;
}

export function hasDriverMetadata(problem = {}) {
  return Boolean(problem.functionName);
}

export function getParameterNames(problem = {}, args = []) {
  const parameters = problem.parameters || [];

  return args.map((_, index) => parameters[index]?.name || `arg${index}`);
}
