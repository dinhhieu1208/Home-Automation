from app.crud import crud_user, crud_admin
from app.core.security import get_password_hash, verify_password, create_access_token
from app.schemas.user import UserCreate, UserLogin

async def register(user_in: UserCreate):
    existing = await crud_user.get_member_by_email(user_in.email)
    if existing:
        return None  

    user_dict = {
        "email": user_in.email,
        "hashed_password": get_password_hash(user_in.password),
        "full_name": user_in.full_name
    }
    await crud_user.create_member(user_dict)
    return {"email": user_dict["email"], "full_name": user_dict["full_name"]}

async def login(user_in: UserLogin):
    admin = await crud_admin.get_admin_by_email(user_in.email)
    if not admin:
        return None

    hashed = admin.get("hashed_password")
    if not hashed or not verify_password(user_in.password, hashed):
        return None

    token = create_access_token({"sub": admin["email"]})
    return token
