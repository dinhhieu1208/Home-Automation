from app.db.session import db
from bson import ObjectId
from typing import List,Optional

async def get_rooms() -> List[dict]:
    rooms = []
    cursor = db.rooms.find()
    async for room in cursor:
        devices = await db.devices.find({"room_id": str(room["_id"])}).to_list(50)
        room["devices"] = [{"id": str(d["_id"]), **d} for d in devices]
        rooms.append({"id": str(room["_id"]), **room})
    return rooms


async def get_room_by_name(name: str) -> Optional[dict]:
    room = await db.rooms.find_one({"name": name})
    if room:
        room["id"] = str(room["_id"])
    return room

async def create_room(room_data: dict) -> dict:
    result = await db.rooms.insert_one(room_data)
    new_room = await db.rooms.find_one({"_id": result.inserted_id})
    if new_room:
        new_room["id"] = str(new_room["_id"])
    return new_room

