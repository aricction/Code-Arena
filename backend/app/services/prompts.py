from app.schemas import Problem


def build_system_prompt(problem: Problem, code: str, language: str) -> str:
    examples = "\n".join(
        f"- Input: {e.input}\n"
        f"  Output: {e.output}"
        + (f"\n  Explanation: {e.explanation}" if e.explanation else "")
        for e in problem.examples
    )

    return f"""You are a coding assistant for Code Arena.

Your goal is to help the user understand and solve the coding problem without giving away the complete solution unless explicitly asked.

Problem: {problem.title} ({problem.difficulty})

Description:
{problem.description}

Examples:
{examples}

User's current code ({language}):

```{language}
{code}
```
"""