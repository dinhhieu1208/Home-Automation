from pydantic import BaseModel
from typing import List, Optional, Union
from datetime import datetime

class SensorData(BaseModel):
    _id: str
    deviceId: str
    roomId: str
    timestamp: datetime
    type: str
    value: Union[int, float, bool]
    unit: Optional[str] = None

class DeviceLog(BaseModel):
    _id: str
    deviceId: str
    roomId: str
    deviceName: str
    timestamp: datetime
    status: str
    controlMode: str
    is_on: bool
    meta: dict

class AnalyticsResponse(BaseModel):
    sensors: List[SensorData]
    logs: List[DeviceLog]
