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
    executionHarness: {
      javascript: `{{USER_CODE}}
const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
const nums = JSON.parse(lines[0]);
const target = Number(lines[1]);
console.log(JSON.stringify(twoSum(nums, target)));`,
      typescript: `{{USER_CODE}}
import * as fs from 'fs';
const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
const nums = JSON.parse(lines[0]) as number[];
const target = Number(lines[1]);
console.log(JSON.stringify(twoSum(nums, target)));`,
      python: `{{USER_CODE}}
import sys
import json
lines = sys.stdin.read().strip().split('\\n')
nums = json.loads(lines[0])
target = int(lines[1])
print(json.dumps(two_sum(nums, target)))`,
    },
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
    executionHarness: {
      javascript: `{{USER_CODE}}
const fs = require('fs');
const s = JSON.parse(fs.readFileSync(0, 'utf-8').trim());
reverseString(s);
console.log(JSON.stringify(s));`,
      typescript: `{{USER_CODE}}
import * as fs from 'fs';
const s = JSON.parse(fs.readFileSync(0, 'utf-8').trim()) as string[];
reverseString(s);
console.log(JSON.stringify(s));`,
      python: `{{USER_CODE}}
import sys
import json
s = json.loads(sys.stdin.read().strip())
reverse_string(s)
print(json.dumps(s))`,
    },
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