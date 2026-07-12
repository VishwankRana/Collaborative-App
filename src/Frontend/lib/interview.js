export const DEFAULT_STARTER_CODE = {
  javascript: "function solution(nums) {\n  // Write your solution here\n}\n",
  python: "def solution(nums):\n    # Write your solution here\n    pass\n",
  java: "class Solution {\n    public int solution(int[] nums) {\n        \n    }\n}",
  cpp: "#include <vector>\nusing namespace std;\n\nint solution(vector<int>& nums) {\n    \n}",
};

export const MONACO_LANGUAGE_IDS = {
  javascript: "javascript",
  python: "python",
  java: "java",
  cpp: "cpp",
};

export function getStarterCodeForLanguage(language, starterCode = {}) {
  return (
    starterCode?.[language] ||
    DEFAULT_STARTER_CODE[language] ||
    DEFAULT_STARTER_CODE.javascript
  );
}

export const INTERVIEW_LANGUAGES = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
];

export function getAwarenessColor(role) {
  return role === "interviewer" ? "#7F77DD" : "#D85A30";
}

export function isStarterOrEmpty(content, starterCode = {}) {
  const trimmed = content.trim();

  if (!trimmed) {
    return true;
  }

  const templates = {
    ...DEFAULT_STARTER_CODE,
    ...starterCode,
  };

  return Object.values(templates).some((template) => template.trim() === trimmed);
}
