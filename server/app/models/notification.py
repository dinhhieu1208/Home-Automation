from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class NotificationModel(BaseModel):
    id: Optional[str] = None
    title: str
    body: Optional[str] = None
    level: str = "info"
    read: bool = False
    created_at: datetime
