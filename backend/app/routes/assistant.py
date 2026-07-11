from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from app.schemas import ChatRequest
from app.services.prompts import build_system_prompt
from app.services.openai_client import stream_chat

router = APIRouter(
    prefix="/api/assistant",
    tags=["assistant"]
)


@router.post("/chat")
async def chat(request: ChatRequest):
    system_prompt = build_system_prompt(
        request.problem,
        request.code,
        request.language,
    )

    messages = [m.model_dump() for m in request.messages]

    def event_stream():
        print("Starting stream...")

        for chunk in stream_chat(system_prompt, messages):
            print("Yielding:", repr(chunk))

            yield f"data: {chunk}\n\n"

        print("Stream finished.")

        yield "data: [DONE]\n\n"

 #enabled server sent event for streaming response
    return StreamingResponse(   
        event_stream(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        },
    )