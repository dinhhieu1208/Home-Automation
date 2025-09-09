from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional, Union
from datetime import datetime


class MemberCreateSchema(BaseModel):
    name: str
    email: EmailStr
    avatar: str
    role: str = "Member"      
    active: bool = True      
    rooms: Union[List[str], str] = []
    joinedDate: str = Field(default_factory=lambda: datetime.now().strftime("%Y-%m-%d"))


class MemberUpdateSchema(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    avatar: Optional[str] = None
    role: Optional[str] = None
    active: Optional[bool] = None
    rooms: Optional[Union[List[str], str]] = None


class MemberManagementSchema(BaseModel):
    id: str  
    avatar: str
    name: str
    role: str
    email: Optional[str] = None  
    active: Optional[bool] = True
    rooms: Union[List[str], str]
    status: str = "online"
    joinedDate: Optional[str] = None
    toggleAccess: bool = True

    class Config:
        from_attributes = True


class MemberSchema(BaseModel):
    id: str  
    name: str
    email: EmailStr
    avatar: str
    role: str
    active: bool
    rooms: Union[List[str], str]

    class Config:
        from_attributes = True



class ToggleAccessSchema(BaseModel):
    toggleAccess: bool
