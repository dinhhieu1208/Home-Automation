from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class RoomAccess(BaseModel):
    memberId: str
    name: str
    role: str
    avatar: str
    grantedAt: datetime
    status: str = "offline"  
    toggleAccess: bool = True  

class MemberManagement(BaseModel):
    _id: Optional[str] = None
    roomId: str
    roomName: str
    access: List[RoomAccess] = []
