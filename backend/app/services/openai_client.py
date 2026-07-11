import os

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

MODEL = os.getenv("OPENAI_MODEL", "gpt-4o-mini")


def stream_chat(system_prompt: str, messages: list[dict]):
    openai_messages = [
        {
            "role": "system",
            "content": system_prompt,
        }
    ]

    openai_messages.extend(messages)

    print("\n=== OPENAI REQUEST ===")
    print("MODEL:", MODEL)
    print("MESSAGES:", openai_messages)
    print("======================\n")

    try:
        stream = client.chat.completions.create(
            model=MODEL,
            messages=openai_messages,
            stream=True,
            temperature=0.4,
            max_completion_tokens=500,
        )

        for chunk in stream:
            print("RAW CHUNK:", chunk)

            content = chunk.choices[0].delta.content

            print("CONTENT:", repr(content))

            if content:
                yield content

        print("\n=== STREAM COMPLETE ===\n")

    except Exception as e:
        print("\n=== ERROR ===")
        print(e)
        print("=============\n")

        yield f"ERROR: {str(e)}"