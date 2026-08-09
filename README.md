# Outfit Inventory

AI clothing labeler: upload photos of clothing items, get auto-generated
tags (category, color, pattern, season, occasion), then review/edit tags
and browse your wardrobe.

This is a two-service architecture, kept separate so the backend can later
serve a custom-trained vision model without the frontend needing to change:

- **`/frontend`** — Next.js (App Router) + TypeScript + Tailwind CSS. Pages,
  UI, and client-side state.
- **`/backend`** — FastAPI. REST API, business logic, and (eventually) the
  custom vision model used for labeling.

Not set up yet: authentication, Supabase/database, and the actual labeling
logic. Right now both services just run and the backend exposes a health
check.

## Prerequisites

- Node.js 20+ and npm
- Python 3.12+ and [uv](https://docs.astral.sh/uv/)

## Running locally

### Backend (FastAPI)

```bash
cd backend
uv sync
uv run uvicorn app.main:app --reload
```

Runs at http://localhost:8000. Check http://localhost:8000/health — should
return `{"status": "ok"}`. Interactive docs at http://localhost:8000/docs.

### Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Runs at http://localhost:3000.

The frontend reads the backend URL from `NEXT_PUBLIC_API_BASE_URL` (see
`frontend/.env.local.example`); it defaults to `http://localhost:8000` if
unset.

## Project structure

```
frontend/
  src/app/            # App Router pages
    (auth)/login/
    (auth)/signup/
    upload/
    wardrobe/
  src/components/
  src/lib/

backend/
  app/
    main.py            # FastAPI app + router registration
    routers/          # API routes (health, label)
    models/           # Pydantic request/response schemas
    services/         # business logic
  models/             # placeholder for the future custom vision model
```
