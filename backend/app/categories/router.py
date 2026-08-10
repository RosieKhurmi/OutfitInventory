from fastapi import APIRouter, Depends
from pydantic import BaseModel

from app.core.auth import CurrentUser, get_current_user
from app.core.db import get_supabase

router = APIRouter(prefix="/categories", tags=["categories"])


class Category(BaseModel):
    id: str
    name: str
    is_default: bool


@router.get("")
def list_categories(
    user: CurrentUser = Depends(get_current_user),
) -> list[Category]:
    supabase = get_supabase()
    response = (
        supabase.table("categories")
        .select("id, name, is_default")
        .eq("user_id", user.id)
        .order("name")
        .execute()
    )
    return [Category(**row) for row in response.data]
