from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class PowerConsumption(BaseModel):
    id: Optional[str] = Field(alias="_id", default=None)
    deviceId: str
    roomId: str
    deviceName: str
    roomName: str
    timestamp: datetime
    power: float
