from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class MemberAccess(BaseModel):
    id: str = Field(..., alias="memberId")
    name: str
    avatar: Optional[str] = None
    role: str
    grantedAt: Optional[datetime] = None

    class Config:
        allow_population_by_field_name = True
