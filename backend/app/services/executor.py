import json
import os
import shutil
import subprocess
import sys
import tempfile
from typing import Any, Dict, List


TIMEOUT_SECONDS = 5
USER_CODE_PLACEHOLDER = "{{USER_CODE}}"


def normalize_output(value: str) -> str:
    text = (value or "").strip().replace("\r\n", "\n")

    try:
        parsed = json.loads(text)
        return json.dumps(parsed, separators=(",", ":"))
    except (json.JSONDecodeError, TypeError):
        return text


def wrap_with_harness(code: str, harness: str | None) -> str:
    if not harness:
        return code

    return harness.replace(USER_CODE_PLACEHOLDER, code)


def run_code(
    code: str,
    language: str,
    input_text: str | None = None,
) -> subprocess.CompletedProcess[str]:
    """
    Execute code in the specified language.
    """

    extension_map = {
        "javascript": ".js",
        "typescript": ".ts",
        "python": ".py",
    }

    runtime_map = {
        "javascript": ["node"],
        "typescript": ["tsx"],
        "python": [sys.executable],
    }

    if language not in extension_map:
        raise ValueError(f"Language '{language}' is not supported yet")

    with tempfile.NamedTemporaryFile(
        mode="w",
        suffix=extension_map[language],
        delete=False,
        encoding="utf-8",
    ) as file:
        file.write(code)
        file_path = file.name

    try:
        command = runtime_map[language] + [file_path]

        return subprocess.run(
            command,
            capture_output=True,
            text=True,
            timeout=TIMEOUT_SECONDS,
            input=input_text,
        )

    finally:
        if os.path.exists(file_path):
            os.remove(file_path)


def evaluate_test_cases(
    test_cases: List[Dict[str, str]],
    code: str,
    language: str,
    harness: str | None = None,
) -> List[Dict[str, Any]]:
    results: List[Dict[str, Any]] = []
    runnable_code = wrap_with_harness(code, harness)

    for test_case in test_cases:
        input_text = test_case.get("input", "")
        expected_output = test_case.get("expectedOutput", "")

        try:
            result = run_code(
                runnable_code,
                language,
                input_text=input_text,
            )

            if result.returncode != 0:
                actual_output = (
                    result.stderr.strip()
                    or result.stdout.strip()
                )

                passed = False

            else:
                actual_output = result.stdout.strip()

                passed = (
                    normalize_output(actual_output)
                    == normalize_output(expected_output)
                )

        except subprocess.TimeoutExpired:
            actual_output = (
                f"Code execution exceeded "
                f"{TIMEOUT_SECONDS} seconds"
            )
            passed = False

        except Exception as exc:
            actual_output = str(exc)
            passed = False

        results.append(
            {
                "passed": passed,
                "input": input_text,
                "expected": expected_output,
                "actual": actual_output,
            }
        )

    return results


def execute_javascript(code: str) -> Dict[str, Any]:
    try:
        if not shutil.which("node"):
            return {
                "status": "Runtime Error",
                "error": "Node.js is not installed or not in PATH",
            }

        result = run_code(code, "javascript")

        if result.returncode != 0:
            return {
                "status": "Runtime Error",
                "error": result.stderr,
                "output": result.stdout,
            }

        return {
            "status": "Accepted",
            "output": result.stdout,
        }

    except subprocess.TimeoutExpired:
        return {
            "status": "Time Limit Exceeded",
            "error": (
                f"Code execution exceeded "
                f"{TIMEOUT_SECONDS} seconds"
            ),
        }

    except Exception as exc:
        return {
            "status": "Runtime Error",
            "error": str(exc),
        }


def execute_typescript(code: str) -> Dict[str, Any]:
    try:
        if not shutil.which("tsx"):
            return {
                "status": "Runtime Error",
                "error": (
                    "tsx is not installed.\n"
                    "Run: npm install -g tsx"
                ),
            }

        result = run_code(code, "typescript")

        if result.returncode != 0:
            return {
                "status": "Runtime Error",
                "error": result.stderr,
                "output": result.stdout,
            }

        return {
            "status": "Accepted",
            "output": result.stdout,
        }

    except subprocess.TimeoutExpired:
        return {
            "status": "Time Limit Exceeded",
            "error": (
                f"Code execution exceeded "
                f"{TIMEOUT_SECONDS} seconds"
            ),
        }

    except Exception as exc:
        return {
            "status": "Runtime Error",
            "error": str(exc),
        }


def execute_python(code: str) -> Dict[str, Any]:
    try:
        result = run_code(code, "python")

        if result.returncode != 0:
            return {
                "status": "Runtime Error",
                "error": result.stderr,
                "output": result.stdout,
            }

        return {
            "status": "Accepted",
            "output": result.stdout,
        }

    except subprocess.TimeoutExpired:
        return {
            "status": "Time Limit Exceeded",
            "error": (
                f"Code execution exceeded "
                f"{TIMEOUT_SECONDS} seconds"
            ),
        }

    except Exception as exc:
        return {
            "status": "Runtime Error",
            "error": str(exc),
        }


def execute_code(
    code: str,
    language: str,
    test_cases: List[Dict[str, str]] | None = None,
    harness: str | None = None,
) -> Dict[str, Any]:

    if not code or not code.strip():
        return {
            "status": "Runtime Error",
            "error": "Please write some code to execute",
        }

    if test_cases:
        test_results = evaluate_test_cases(
            test_cases,
            code,
            language,
            harness=harness,
        )

        has_failed = any(
            not item["passed"]
            for item in test_results
        )

        return {
            "status": (
                "Wrong Answer"
                if has_failed
                else "Accepted"
            ),
            "output": "",
            "testResult": test_results,
        }

    handlers = {
        "javascript": execute_javascript,
        "typescript": execute_typescript,
        "python": execute_python,
    }

    handler = handlers.get(language)

    if not handler:
        return {
            "status": "Runtime Error",
            "error": (
                f"Language '{language}' "
                f"is not supported yet"
            ),
        }

    return handler(code)