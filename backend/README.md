# Outfit Inventory — Backend

FastAPI service for the Outfit Inventory clothing labeler. See the
[root README](../README.md) for how to run this alongside the frontend.

## Structure

- `app/main.py` — FastAPI app instance, router registration
- `app/routers/` — API routes (`health`, `label`)
- `app/models/` — Pydantic request/response schemas
- `app/services/` — business logic (called by routers)
- `models/` — placeholder for the future custom vision model
