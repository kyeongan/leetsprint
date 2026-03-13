import type { Problem } from "../types/problem";

export const mockProblem: Problem = {
  id: "two-sum",
  number: 1,
  title: "Two Sum",
  difficulty: "Easy",
  priority: "Must Know",
  pattern: "Hash Map",
  summary: "Find two numbers in an array that add up to a target.",
  whyItMatters: "Classic warm-up that tests hash map intuition.",
  strategy: [
    "Iterate through the array.",
    "For each number, check if its complement exists in a hash map.",
    "If found, return the indices. Otherwise, store the current number.",
  ],
  pitfalls: [
    "Don't use the same element twice.",
    "Indices must be returned, not the values.",
  ],
  complexity: {
    time: "O(n)",
    space: "O(n)",
  },
  code: `def two_sum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        diff = target - n
        if diff in seen:
            return [seen[diff], i]
        seen[n] = i
`,
};

export const mockMediumProblem: Problem = {
  id: "longest-substring",
  number: 3,
  title: "Longest Substring Without Repeating Characters",
  difficulty: "Medium",
  priority: "High Value",
  pattern: "Sliding Window",
  summary: "Return the length of the longest substring with no duplicate characters.",
  whyItMatters: "Tests sliding window technique.",
  strategy: ["Use two pointers and a hash map to track last seen indices."],
  pitfalls: ["Use max(left, last_seen[char] + 1) to avoid moving left backward."],
  complexity: {
    time: "O(n)",
    space: "O(min(n, charset))",
  },
  code: `def length_of_longest_substring(s):
    last_seen = {}
    left = 0
    best = 0
    for right, char in enumerate(s):
        if char in last_seen and last_seen[char] >= left:
            left = last_seen[char] + 1
        last_seen[char] = right
        best = max(best, right - left + 1)
    return best
`,
};
