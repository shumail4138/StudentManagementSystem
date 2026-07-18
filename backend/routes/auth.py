from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm

from app.auth import create_access_token

router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"]
)

ADMIN_EMAIL = "admin@example.com"
ADMIN_PASSWORD = "admin123"


@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):

    if (
        form_data.username != ADMIN_EMAIL
        or
        form_data.password != ADMIN_PASSWORD
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    token = create_access_token(
        {"sub": form_data.username}
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }