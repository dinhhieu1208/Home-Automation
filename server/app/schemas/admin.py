from pydantic import BaseModel, EmailStr
from typing import Optional

class AdminProfile(BaseModel):
    name: str
    email: EmailStr
    avatar: Optional[str] = None
    role: str

class AdminUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    avatar: Optional[str] = None
