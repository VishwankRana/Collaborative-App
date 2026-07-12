import {
  formatArgsForDisplay,
  formatExpectedOutput,
} from "../execution/valueFormatter.js";

export const PROBLEM_EXECUTION_PROFILES = {
  "Two Sum": {
    functionName: "twoSum",
    className: "Solution",
    returnType: {
      java: "int[]",
      cpp: "vector<int>",
      python: "list",
      javascript: "number[]",
    },
    parameters: [
      {
        name: "nums",
        type: {
          java: "int[]",
          cpp: "vector<int>",
          python: "list[int]",
          javascript: "number[]",
        },
      },
      {
        name: "target",
        type: {
          java: "int",
          cpp: "int",
          python: "int",
          javascript: "number",
        },
      },
    ],
    testCases: [
      { args: [[2, 7, 11, 15], 9], expected: [0, 1], isHidden: false },
      { args: [[3, 2, 4], 6], expected: [1, 2], isHidden: false },
      { args: [[3, 3], 6], expected: [0, 1], isHidden: true },
    ],
  },
  "Valid Parentheses": {
    functionName: "isValid",
    className: "Solution",
    returnType: {
      java: "boolean",
      cpp: "bool",
      python: "bool",
      javascript: "boolean",
    },
    parameters: [
      {
        name: "s",
        type: {
          java: "String",
          cpp: "string",
          python: "str",
          javascript: "string",
        },
      },
    ],
    testCases: [
      { args: ["()"], expected: true, isHidden: false },
      { args: ["()[]{}"], expected: true, isHidden: false },
      { args: ["(]"], expected: false, isHidden: false },
      { args: ["([)]"], expected: false, isHidden: true },
      { args: ["{[]}"], expected: true, isHidden: true },
    ],
  },
  "Best Time to Buy and Sell Stock": {
    functionName: "maxProfit",
    className: "Solution",
    returnType: {
      java: "int",
      cpp: "int",
      python: "int",
      javascript: "number",
    },
    parameters: [
      {
        name: "prices",
        type: {
          java: "int[]",
          cpp: "vector<int>",
          python: "list[int]",
          javascript: "number[]",
        },
      },
    ],
    testCases: [
      { args: [[7, 1, 5, 3, 6, 4]], expected: 5, isHidden: false },
      { args: [[7, 6, 4, 3, 1]], expected: 0, isHidden: false },
      { args: [[1, 2]], expected: 1, isHidden: true },
    ],
  },
  "Contains Duplicate": {
    functionName: "containsDuplicate",
    className: "Solution",
    returnType: {
      java: "boolean",
      cpp: "bool",
      python: "bool",
      javascript: "boolean",
    },
    parameters: [
      {
        name: "nums",
        type: {
          java: "int[]",
          cpp: "vector<int>",
          python: "list[int]",
          javascript: "number[]",
        },
      },
    ],
    testCases: [
      { args: [[1, 2, 3, 1]], expected: true, isHidden: false },
      { args: [[1, 2, 3, 4]], expected: false, isHidden: false },
      { args: [[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]], expected: true, isHidden: true },
    ],
  },
  "Maximum Subarray": {
    functionName: "maxSubArray",
    className: "Solution",
    returnType: {
      java: "int",
      cpp: "int",
      python: "int",
      javascript: "number",
    },
    parameters: [
      {
        name: "nums",
        type: {
          java: "int[]",
          cpp: "vector<int>",
          python: "list[int]",
          javascript: "number[]",
        },
      },
    ],
    testCases: [
      { args: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6, isHidden: false },
      { args: [[1]], expected: 1, isHidden: false },
      { args: [[5, 4, -1, 7, 8]], expected: 23, isHidden: true },
    ],
  },
  "Climbing Stairs": {
    functionName: "climbStairs",
    returnType: {
      java: "int",
      cpp: "int",
      python: "int",
      javascript: "number",
    },
    parameters: [
      {
        name: "n",
        type: {
          java: "int",
          cpp: "int",
          python: "int",
          javascript: "number",
        },
      },
    ],
    testCases: [
      { args: [2], expected: 2, isHidden: false },
      { args: [3], expected: 3, isHidden: false },
      { args: [5], expected: 8, isHidden: true },
    ],
  },
  "Longest Substring Without Repeating Characters": {
    functionName: "lengthOfLongestSubstring",
    className: "Solution",
    returnType: {
      java: "int",
      cpp: "int",
      python: "int",
      javascript: "number",
    },
    parameters: [
      {
        name: "s",
        type: {
          java: "String",
          cpp: "string",
          python: "str",
          javascript: "string",
        },
      },
    ],
    testCases: [
      { args: ["abcabcbb"], expected: 3, isHidden: false },
      { args: ["bbbbb"], expected: 1, isHidden: false },
      { args: ["pwwkew"], expected: 3, isHidden: true },
      { args: [""], expected: 0, isHidden: true },
    ],
  },
  "3Sum": {
    functionName: "threeSum",
    className: "Solution",
    returnType: {
      java: "List<List<Integer>>",
      cpp: "vector<vector<int>>",
      python: "list",
      javascript: "number[][]",
    },
    parameters: [
      {
        name: "nums",
        type: {
          java: "int[]",
          cpp: "vector<int>",
          python: "list[int]",
          javascript: "number[]",
        },
      },
    ],
    testCases: [
      {
        args: [[-1, 0, 1, 2, -1, -4]],
        expected: [
          [-1, -1, 2],
          [-1, 0, 1],
        ],
        isHidden: false,
      },
      { args: [[0, 1, 1]], expected: [], isHidden: false },
      { args: [[0, 0, 0]], expected: [[0, 0, 0]], isHidden: true },
    ],
  },
  "Product of Array Except Self": {
    functionName: "productExceptSelf",
    className: "Solution",
    returnType: {
      java: "int[]",
      cpp: "vector<int>",
      python: "list",
      javascript: "number[]",
    },
    parameters: [
      {
        name: "nums",
        type: {
          java: "int[]",
          cpp: "vector<int>",
          python: "list[int]",
          javascript: "number[]",
        },
      },
    ],
    testCases: [
      { args: [[1, 2, 3, 4]], expected: [24, 12, 8, 6], isHidden: false },
      { args: [[-1, 1, 0, -3, 3]], expected: [0, 0, 9, 0, 0], isHidden: true },
    ],
  },
  "Container With Most Water": {
    functionName: "maxArea",
    className: "Solution",
    returnType: {
      java: "int",
      cpp: "int",
      python: "int",
      javascript: "number",
    },
    parameters: [
      {
        name: "height",
        type: {
          java: "int[]",
          cpp: "vector<int>",
          python: "list[int]",
          javascript: "number[]",
        },
      },
    ],
    testCases: [
      { args: [[1, 8, 6, 2, 5, 4, 8, 3, 7]], expected: 49, isHidden: false },
      { args: [[1, 1]], expected: 1, isHidden: false },
      { args: [[4, 3, 2, 1, 4]], expected: 16, isHidden: true },
    ],
  },
  "Coin Change": {
    functionName: "coinChange",
    className: "Solution",
    returnType: {
      java: "int",
      cpp: "int",
      python: "int",
      javascript: "number",
    },
    parameters: [
      {
        name: "coins",
        type: {
          java: "int[]",
          cpp: "vector<int>",
          python: "list[int]",
          javascript: "number[]",
        },
      },
      {
        name: "amount",
        type: {
          java: "int",
          cpp: "int",
          python: "int",
          javascript: "number",
        },
      },
    ],
    testCases: [
      { args: [[1, 2, 5], 11], expected: 3, isHidden: false },
      { args: [[2], 3], expected: -1, isHidden: false },
      { args: [[1], 0], expected: 0, isHidden: true },
    ],
  },
  "Number of Islands": {
    functionName: "numIslands",
    className: "Solution",
    returnType: {
      java: "int",
      cpp: "int",
      python: "int",
      javascript: "number",
    },
    parameters: [
      {
        name: "grid",
        type: {
          java: "char[][]",
          cpp: "vector<vector<char>>",
          python: "list[list[str]]",
          javascript: "string[][]",
        },
      },
    ],
    testCases: [
      {
        args: [
          [
            ["1", "1", "1", "1", "0"],
            ["1", "1", "0", "1", "0"],
            ["1", "1", "0", "0", "0"],
            ["0", "0", "0", "0", "0"],
          ],
        ],
        expected: 1,
        isHidden: false,
      },
      {
        args: [
          [
            ["1", "1", "0", "0", "0"],
            ["1", "1", "0", "0", "0"],
            ["0", "0", "1", "0", "0"],
            ["0", "0", "0", "1", "1"],
          ],
        ],
        expected: 3,
        isHidden: false,
      },
    ],
  },
  "Find Minimum in Rotated Sorted Array": {
    functionName: "findMin",
    className: "Solution",
    returnType: {
      java: "int",
      cpp: "int",
      python: "int",
      javascript: "number",
    },
    parameters: [
      {
        name: "nums",
        type: {
          java: "int[]",
          cpp: "vector<int>",
          python: "list[int]",
          javascript: "number[]",
        },
      },
    ],
    testCases: [
      { args: [[3, 4, 5, 1, 2]], expected: 1, isHidden: false },
      { args: [[4, 5, 6, 7, 0, 1, 2]], expected: 0, isHidden: false },
      { args: [[11, 13, 15, 17]], expected: 11, isHidden: true },
    ],
  },
  "Trapping Rain Water": {
    functionName: "trap",
    returnType: {
      java: "int",
      cpp: "int",
      python: "int",
      javascript: "number",
    },
    parameters: [
      {
        name: "height",
        type: {
          java: "int[]",
          cpp: "vector<int>",
          python: "list[int]",
          javascript: "number[]",
        },
      },
    ],
    testCases: [
      { args: [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]], expected: 6, isHidden: false },
      { args: [[4, 2, 0, 3, 2, 5]], expected: 9, isHidden: false },
      { args: [[3, 0, 2, 0, 4]], expected: 7, isHidden: true },
    ],
  },
  "Merge K Sorted Lists": {
    functionName: "mergeKLists",
    className: "Solution",
    returnType: {
      java: "int[]",
      cpp: "vector<int>",
      python: "list",
      javascript: "number[]",
    },
    parameters: [
      {
        name: "lists",
        type: {
          java: "int[][]",
          cpp: "vector<vector<int>>",
          python: "list[list[int]]",
          javascript: "number[][]",
        },
      },
    ],
    testCases: [
      {
        args: [[[1, 4, 5], [1, 3, 4], [2, 6]]],
        expected: [1, 1, 2, 3, 4, 4, 5, 6],
        isHidden: false,
      },
      { args: [[]], expected: [], isHidden: false },
      { args: [[[]]], expected: [], isHidden: true },
    ],
  },
  "Word Break": {
    functionName: "wordBreak",
    className: "Solution",
    returnType: {
      java: "boolean",
      cpp: "bool",
      python: "bool",
      javascript: "boolean",
    },
    parameters: [
      {
        name: "s",
        type: {
          java: "String",
          cpp: "string",
          python: "str",
          javascript: "string",
        },
      },
      {
        name: "wordDict",
        type: {
          java: "String[]",
          cpp: "vector<string>",
          python: "list[str]",
          javascript: "string[]",
        },
      },
    ],
    testCases: [
      { args: ["leetcode", ["leet", "code"]], expected: true, isHidden: false },
      { args: ["applepenapple", ["apple", "pen"]], expected: true, isHidden: false },
      {
        args: ["catsandog", ["cats", "dog", "sand", "and", "cat"]],
        expected: false,
        isHidden: true,
      },
    ],
  },
};

export function enrichQuestionWithExecutionProfile(question) {
  const profile = PROBLEM_EXECUTION_PROFILES[question.title];

  if (!profile) {
    return question;
  }

  const testCases = profile.testCases.map((testCase) => ({
    ...testCase,
    input: formatArgsForDisplay(
      { parameters: profile.parameters },
      testCase.args
    ),
    expectedOutput: formatExpectedOutput(testCase.expected),
  }));

  return {
    ...question,
    functionName: profile.functionName,
    className: profile.className,
    returnType: profile.returnType,
    parameters: profile.parameters,
    testCases,
  };
}
