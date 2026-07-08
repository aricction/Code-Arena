from app.services.prompts import build_system_prompt
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import time
from .schemas import ChatRequest
from .schemas import Problem, Example

app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Custom Middleware
@app.middleware("http")
async def add_process_time(request: Request, call_next):
    start_time = time.time()

    response = await call_next(request)

    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)

    return response


@app.get("/")
def home():
    return {"message": "Hello World"}


@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/chat")
async def chat(request: ChatRequest):
    return {
        "status": "success",
        "language": request.language,
        "problem": request.problem.title,
        "message": len(request.message)
    }
    

    problem = Problem(
        id="1",
        title="Two Sum",
        difficulty="Easy",
        description="Find two numbers that add up to the target.",
        examples=[
            Example(
                input="nums=[2,7,11,15], target=9",
                output="[0,1]",
                explanation="nums[0] + nums[1] = 9"
            )
        ]
    )
    
    return {
         "prompt": build_system_prompt(
            problem,
            "def twoSum(nums, target):\n    pass",
            "python",
        )
    }    