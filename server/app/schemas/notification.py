from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class NotificationBase(BaseModel):
    title: str
    body: Optional[str] = None
    level: str = "info"

class NotificationRead(NotificationBase):
    id: str
    read: bool = False
    created_at: datetime
