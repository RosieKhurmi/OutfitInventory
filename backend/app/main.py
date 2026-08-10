from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.categories.router import router as categories_router
from app.health import router as health_router
from app.label.router import router as label_router
from app.users.router import router as users_router

app = FastAPI(title="Outfit Inventory API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(label_router)
app.include_router(users_router)
app.include_router(categories_router)
