from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
import os
from dotenv import load_dotenv

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

# @app.post("/run")
# async def run_code(req: JDoodleRequest):
#     print("Received request:")
#     print(f"Language: {req.language}")
#     print(f"VersionIndex: {req.versionIndex}")
#     print(f"Script:\n{req.script}")
#     print(f"Stdin: {req.stdin}")

#     # Comment out actual call for now to save quota
#     # async with httpx.AsyncClient() as client:
#     #     response = await client.post(JDoodle_URL, json=payload)
#     #     return response.json()

#     # Return a dummy response for testing
#     return {
#         "output": "This is a test response. JDoodle request skipped.",
#         "statusCode": 200
#     }