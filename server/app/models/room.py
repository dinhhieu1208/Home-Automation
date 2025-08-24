from pydantic import BaseModel
from typing import Optional, List
from .device import DeviceModel

class RoomModel(BaseModel):
    id: Optional[str] = None
    name: str
    description: Optional[str] = None
    devices: List[DeviceModel] = []

