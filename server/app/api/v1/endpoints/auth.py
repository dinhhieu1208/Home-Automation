from fastapi import APIRouter, HTTPException
from app.schemas.user import UserCreate, UserLogin, UserOut
from app.services import auth_service

router = APIRouter()

@router.post("/register", response_model=UserOut)
async def register(user_in: UserCreate):
    user = await auth_service.register(user_in)
    if not user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return user

@router.post("/login")
async def login(user_in: UserLogin):
    token = await auth_service.login(user_in)
    if not token:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    return {"access_token": token, "token_type": "bearer"}

