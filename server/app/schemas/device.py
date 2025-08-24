from pydantic import BaseModel
from typing import Optional

class DeviceBase(BaseModel):
    name: str
    type: Optional[str] = None
    room_id: Optional[str] = None

class DeviceCreate(DeviceBase):
    pass

class DeviceUpdate(BaseModel):
    is_on: Optional[bool] = None

class DeviceRead(DeviceBase):
    id: str
    is_on: bool
    
class DeviceRead(BaseModel):
    id: str
    name: str
    type: Optional[str] = None