import pytest
from app.services.executor import evaluate_test_cases, wrap_with_harness

TWO_SUM_HARNESS = """{{USER_CODE}}
const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
const nums = JSON.parse(lines[0]);
const target = Number(lines[1]);
console.log(JSON.stringify(twoSum(nums, target)));"""


def test_evaluate_test_cases_marks_correct_and_wrong_answers():
    cases = [
        {"input": "[2,7,11,15]\n9", "expectedOutput": "[0,1]"},
        {"input": "[3,2,4]\n6", "expectedOutput": "[1,3]"},
    ]

    correct_code = """
function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) return [seen.get(complement), i];
    seen.set(nums[i], i);
  }
  return [];
}
"""

    result = evaluate_test_cases(
        cases,
        correct_code,
        "javascript",
        harness=TWO_SUM_HARNESS,
    )

    assert result[0]["passed"] is True
    assert result[1]["passed"] is False
    assert result[1]["expected"] == "[1,3]"
    assert result[1]["actual"] == "[1,2]"


def test_evaluate_test_cases_ignores_whitespace_formatting():
    cases = [{"input": "", "expectedOutput": "[0,1]"}]

    result = evaluate_test_cases(cases, "console.log([0, 1])", "javascript")

    assert result[0]["passed"] is True


def test_wrap_with_harness_inserts_user_code():
    harness = "{{USER_CODE}}\nconsole.log('done');"
    wrapped = wrap_with_harness("function twoSum() {}", harness)

    assert "function twoSum() {}" in wrapped
    assert "console.log('done');" in wrapped
