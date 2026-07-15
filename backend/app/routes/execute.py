from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.executor import execute_code
import logging

logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/api/execute",
    tags=["execute"]
)

class ExecutionRequest(BaseModel):
    code: str
    language: str
    testCases: list[dict] | None = None
    harness: str | None = None

@router.post("/run")
async def run_code(request: ExecutionRequest):
    """Execute code and return the result"""
    try:
        logger.info(f"Executing {request.language} code")
        result = execute_code(
            request.code,
            request.language,
            test_cases=request.testCases,
            harness=request.harness,
        )
        logger.info(f"Execution result: {result}")
        return result
    except Exception as e:
        logger.error(f"Execution error: {str(e)}")
        return {
            "status": "Runtime Error",
            "error": str(e)
        }
