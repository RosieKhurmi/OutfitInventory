from fastapi import FastAPI

from app.routers import health, label

app = FastAPI(title="Outfit Inventory API")

app.include_router(health.router)
app.include_router(label.router)
