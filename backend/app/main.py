from fastapi import FastAPI
from app.api import auth, users, education, simulation, investments, community, ai
from app.db import init_db
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5500", "https://your-frontend-domain.com"],  # replace with your actual frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth")
app.include_router(users.router, prefix="/users")
app.include_router(education.router, prefix="/education")
app.include_router(simulation.router, prefix="/simulation")
app.include_router(investments.router, prefix="/investments")
app.include_router(community.router, prefix="/community")
app.include_router(ai.router, prefix="/ai")

@app.on_event("startup")
async def startup():
    await init_db()

@app.get("/")
async def root():
    return {"message": "Financial Platform Backend is live"}
