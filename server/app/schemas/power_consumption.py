from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class PowerConsumptionBase(BaseModel):
    deviceId: str
    roomId: str
    deviceName: str
    roomName: str
    timestamp: datetime
    power: float


class PowerConsumptionCreate(PowerConsumptionBase):
    pass


class PowerConsumptionOut(PowerConsumptionBase):
    id: Optional[str]

    class Config:
        orm_mode = True
        allow_population_by_field_name = True
