from app.services.prompts import build_system_prompt
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import time
from .schemas import ChatRequest
from .schemas import Problem, Example
from app.routes.assistant import router as assistant_router
from app.routes.execute import router as execute_router

app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000",
                   "https://code-arena-livid-psi.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(assistant_router)
app.include_router(execute_router)

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
        "message": len(request.messages)
    }
    
    
    

