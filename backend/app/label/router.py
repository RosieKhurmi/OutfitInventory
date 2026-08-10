from fastapi import APIRouter, Depends, HTTPException, status

from app.core.auth import CurrentUser, get_current_user

router = APIRouter(prefix="/label", tags=["label"])


@router.post("")
def label_item(user: CurrentUser = Depends(get_current_user)) -> None:
    # TODO: accept an uploaded image and return generated tags via
    # app/services/labeling.py once the custom vision model is ready.
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Labeling is not implemented yet.",
    )
