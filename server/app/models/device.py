from pydantic import BaseModel, Field
from typing import Optional

class DeviceModel(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    name: str
    type: Optional[str] = None
    room_id: Optional[str] = None
    is_on: bool = False
