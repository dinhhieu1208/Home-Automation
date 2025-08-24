from pydantic import BaseModel
from typing import Optional, List, Dict
from app.schemas.device import DeviceRead

class RoomBase(BaseModel):
    name: str
    description: Optional[str] = None

class RoomRead(RoomBase):
    id: str
    devices: List[DeviceRead] = []

class MemberAccess(BaseModel):
    id: Optional[str] = None  
    avatar: Optional[str] = None
    name: str
    role: Optional[str] = "Member"
    status: Optional[str] = "offline"
    joinedDate: Optional[str] = None
    toggleAccess: Optional[bool] = True

class RoomCreate(BaseModel):
    name: str
    description: Optional[str] = None
    devices: Optional[List[Dict]] = []
    members: Optional[List[MemberAccess]] = []
