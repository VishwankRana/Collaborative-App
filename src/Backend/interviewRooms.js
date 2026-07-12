export const DEFAULT_STARTER_CODE = {
  javascript: "function solution(nums) {\n  // Write your solution here\n}\n",
  python: "def solution(nums):\n    # Write your solution here\n    pass\n",
  java: "class Solution {\n    public int solution(int[] nums) {\n        \n    }\n}",
  cpp: "#include <vector>\nusing namespace std;\n\nint solution(vector<int>& nums) {\n    \n}",
};

export function getYjsRoomName(roomId) {
  return `interview-${String(roomId)}`;
}

export function getRoomRole(room, userId) {
  const normalizedUserId = String(userId);

  if (String(room.interviewerId?._id || room.interviewerId) === normalizedUserId) {
    return "interviewer";
  }

  if (String(room.candidateId?._id || room.candidateId) === normalizedUserId) {
    return "candidate";
  }

  return null;
}

export function isInterviewer(room, userId) {
  return getRoomRole(room, userId) === "interviewer";
}

function serializeUser(user) {
  if (!user) {
    return null;
  }

  return {
    id: String(user._id || user),
    name: user.name,
    email: user.email,
  };
}

function serializeTestCases(testCases, role) {
  const cases = testCases || [];

  const mapCase = (testCase) => ({
    input: testCase.input,
    expectedOutput: testCase.expectedOutput,
    args: testCase.args ?? null,
    expected: testCase.expected ?? null,
    isHidden: Boolean(testCase.isHidden),
  });

  if (role === "candidate") {
    return cases
      .filter((testCase) => !testCase.isHidden)
      .map((testCase) => ({
        ...mapCase(testCase),
        isHidden: false,
      }));
  }

  return cases.map(mapCase);
}

export function serializeRoom(room, role) {
  const serialized = {
    id: String(room._id),
    title: room.title,
    problem: room.problem || {},
    starterCode: room.starterCode || {},
    language: room.language,
    status: room.status,
    testCases: serializeTestCases(room.testCases, role),
    startedAt: room.startedAt,
    endedAt: room.endedAt,
    finalScore: room.finalScore,
    createdAt: room.createdAt,
    yjsRoomName: getYjsRoomName(room._id),
    role,
    interviewer: serializeUser(room.interviewerId),
    candidate: serializeUser(room.candidateId),
  };

  if (role === "interviewer") {
    serialized.inviteToken = room.inviteToken;
    serialized.notes = room.notes || "";
  }

  return serialized;
}

export function formatDuration(ms) {
  if (!ms || ms < 0) {
    return "0:00";
  }

  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function sampleRecordingEvents(events, max = 500) {
  if (events.length <= max) {
    return events;
  }

  const sampled = [];
  const step = events.length / max;

  for (let index = 0; index < max; index += 1) {
    sampled.push(events[Math.floor(index * step)]);
  }

  return sampled;
}

export function mergeStarterCode(starterCode = {}) {
  return {
    ...DEFAULT_STARTER_CODE,
    ...starterCode,
  };
}
