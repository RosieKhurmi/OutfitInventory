from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import health, label, me

app = FastAPI(title="Outfit Inventory API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(label.router)
app.include_router(me.router)
