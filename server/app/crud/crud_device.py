from app.db.session import db
from bson import ObjectId
from typing import List
from app.schemas.device import DeviceCreate, DeviceUpdate

async def get_devices_by_room(room_id: str) -> List[dict]:
    cursor = db.devices.find({"room_id": room_id})
    return await cursor.to_list(100)

async def get_device(device_id: str):
    return await db.devices.find_one({"_id": ObjectId(device_id)})

async def create_device(device: DeviceCreate):
    result = await db.devices.insert_one(device.dict())
    return {**device.dict(), "id": str(result.inserted_id), "is_on": False}

async def update_device_state(device_id: str, is_on: bool):
    await db.devices.update_one({"_id": ObjectId(device_id)}, {"$set": {"is_on": is_on}})
    return await get_device(device_id)


async def get_devices() -> List[dict]:
    cursor = db.devices.find({})
    devices = await cursor.to_list(1000)  
    for d in devices:
        d["_id"] = str(d["_id"])
    return devices
