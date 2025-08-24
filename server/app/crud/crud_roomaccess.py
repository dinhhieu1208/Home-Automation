from typing import List
from motor.motor_asyncio import AsyncIOMotorDatabase

async def get_members_by_room(db: AsyncIOMotorDatabase, room_id: str) -> List[dict]:
    doc = await db["roomAccess"].find_one({"roomId": room_id})
    if not doc:
        return []
    access = doc.get("access") or []
    return access
