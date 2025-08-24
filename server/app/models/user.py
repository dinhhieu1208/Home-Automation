from pydantic import BaseModel, EmailStr
from typing import Optional

class User(BaseModel):
    id: Optional[str]
    email: EmailStr
    full_name: Optional[str] = None
    hashed_password: str
    avatar: Optional[str] = None
    role: Optional[str] = "admin"