from fastapi import APIRouter, Depends

from app.auth import CurrentUser, get_current_user

router = APIRouter(tags=["me"])


@router.get("/me")
def get_me(user: CurrentUser = Depends(get_current_user)) -> dict[str, str | None]:
    return {"id": user.id, "email": user.email}
