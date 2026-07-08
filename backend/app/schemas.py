from pydantic import BaseModel
from typing import Literal

class Message(BaseModel):
    role: Literal["user", "assistant",]
    content: str
    
class Example(BaseModel):
    input: str
    output: str
    explanation: str | None = None
    
class Problem(BaseModel):
    id: str
    title: str
    difficulty: Literal["Easy", "Medium", "Hard"]
    description: str
    examples: list[Example]
    
class ChatRequest(BaseModel):
    messages: list[Message]
    problem: Problem
    code: str
    language: str        
        