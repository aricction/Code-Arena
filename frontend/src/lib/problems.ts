import { Problem } from '@/types'

export const problems: Problem[] = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.`,
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'nums[0] + nums[1] = 2 + 7 = 9' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]' },
    ],
    testCases: [
      { input: '[2,7,11,15]\n9', expectedOutput: '[0,1]' },
      { input: '[3,2,4]\n6', expectedOutput: '[1,2]' },
      { input: '[3,3]\n6', expectedOutput: '[0,1]' },
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {\n  // your code here\n}`,
      typescript: `function twoSum(nums: number[], target: number): number[] {\n  // your code here\n}`,
      python: `def two_sum(nums: list[int], target: int) -> list[int]:\n    # your code here\n    pass`,
      cpp: `#include <vector>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    // your code here\n}`,
      java: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // your code here\n    }\n}`,
    },
  },
  {
    id: 'reverse-string',
    title: 'Reverse String',
    difficulty: 'Easy',
    description: `Write a function that reverses a string. The input string is given as an array of characters \`s\`.

You must do this by modifying the input array in-place with O(1) extra memory.`,
    examples: [
      { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]' },
      { input: 's = ["H","a","n","n","a","h"]', output: '["h","a","n","n","a","H"]' },
    ],
    testCases: [
      { input: '["h","e","l","l","o"]', expectedOutput: '["o","l","l","e","h"]' },
      { input: '["H","a","n","n","a","h"]', expectedOutput: '["h","a","n","n","a","H"]' },
    ],
    starterCode: {
      javascript: `function reverseString(s) {\n  // your code here\n}`,
      typescript: `function reverseString(s: string[]): void {\n  // your code here\n}`,
      python: `def reverse_string(s: list[str]) -> None:\n    # your code here\n    pass`,
      cpp: `#include <vector>\nusing namespace std;\n\nvoid reverseString(vector<char>& s) {\n    // your code here\n}`,
      java: `class Solution {\n    public void reverseString(char[] s) {\n        // your code here\n    }\n}`,
    },
  },
]

export const getProblem = (id: string): Problem | undefined =>
  problems.find((p) => p.id === id)