from typing import List, Optional
from datetime import datetime
from app.models.power_consumption import PowerConsumption
from app.schemas.power_consumption import PowerConsumptionCreate
from app.db.session import db


class CRUDPowerConsumption:
    collection = db["power_consumptions"]

    async def create(self, obj_in: PowerConsumptionCreate) -> PowerConsumption:
        data = obj_in.dict()
        result = await self.collection.insert_one(data)
        data["_id"] = str(result.inserted_id)
        return PowerConsumption(**data)

    async def get_all(self, limit: int = 50) -> List[PowerConsumption]:
        cursor = self.collection.find().sort("timestamp", -1).limit(limit)
        items = []
        async for doc in cursor:
            doc["_id"] = str(doc["_id"])
            items.append(PowerConsumption(**doc))
        return items

    async def get_by_device(
        self, device_id: str, start: Optional[datetime] = None, end: Optional[datetime] = None
    ) -> List[PowerConsumption]:
        query = {"deviceId": device_id}
        if start and end:
            query["timestamp"] = {"$gte": start, "$lte": end}
        cursor = self.collection.find(query).sort("timestamp", -1)
        items = []
        async for doc in cursor:
            doc["_id"] = str(doc["_id"])
            items.append(PowerConsumption(**doc))
        return items


crud_power_consumption = CRUDPowerConsumption()
