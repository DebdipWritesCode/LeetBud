from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

JDoodle_URL = "https://api.jdoodle.com/v1/execute"

class JDoodleRequest(BaseModel):
    script: str
    language: str
    versionIndex: str
    stdin: str = ""

@app.post("/run")
async def run_code(req: JDoodleRequest):
    payload = {
        "clientId": os.getenv("JDOODLE_CLIENT_ID"),
        "clientSecret": os.getenv("JDOODLE_CLIENT_SECRET"),
        "script": req.script,
        "language": req.language,
        "versionIndex": req.versionIndex,
        "stdin": req.stdin,
        "compileOnly": False
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(JDoodle_URL, json=payload)
        return response.json()


class GenerateRequest(BaseModel):
    script: str
    language: str

@app.post("/generate")
async def generate_testcases(req: GenerateRequest):
    try:
        with open("prompt.txt", "r") as f:
            base_prompt = f.read()

        final_prompt = f"{base_prompt}\n\nHere is the code:\n\n{req.script}\n\nGenerate the test cases in the required format."

        client = Groq(api_key=os.getenv("GROQ_API_KEY"))

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile", 
            messages=[{"role": "user", "content": final_prompt}],
            max_tokens=1000,
            temperature=0.7,
        )

        testcases = response.choices[0].message.content.strip()
        return {"testcases": testcases}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
