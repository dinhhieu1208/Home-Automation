from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId
from app.schemas.memberManagements import MemberCreateSchema, MemberUpdateSchema

collection_name = "memberManagements"

async def get_all_members(db: AsyncIOMotorDatabase):
    return await db[collection_name].find().to_list(1000)

async def get_member_by_room(db: AsyncIOMotorDatabase, room_id: str):
    return await db[collection_name].find_one({"roomId": room_id})

async def update_toggle_access(db: AsyncIOMotorDatabase, room_id: str, member_id: str, toggle: bool):
    return await db[collection_name].update_one(
        {"roomId": room_id, "access.memberId": member_id},
        {"$set": {"access.$.toggleAccess": toggle}}
    )

def serialize_member(member) -> dict:
    member["_id"] = str(member["_id"])
    return member

async def create_member(db: AsyncIOMotorDatabase, data: MemberCreateSchema):
    doc = data.dict()
    result = await db[collection_name].insert_one(doc)
    new_member = await db[collection_name].find_one({"_id": result.inserted_id})
    return serialize_member(new_member)

async def update_member(db: AsyncIOMotorDatabase, member_id: str, data: MemberUpdateSchema):
    update_data = {k: v for k, v in data.dict().items() if v is not None}
    result = await db[collection_name].update_one({"_id": ObjectId(member_id)}, {"$set": update_data})
    return result

async def delete_member(db: AsyncIOMotorDatabase, member_id: str):
    member = await db[collection_name].find_one({"_id": ObjectId(member_id)})
    if member and member["role"].lower() in ["admin", "owner"]:
        return None 
    return await db[collection_name].delete_one({"_id": ObjectId(member_id)})

async def lock_member(db: AsyncIOMotorDatabase, member_id: str):
    return await db[collection_name].update_one(
        {"_id": ObjectId(member_id)},
        {"$set": {"active": False}}
    )

async def unlock_member(db: AsyncIOMotorDatabase, member_id: str):
    return await db[collection_name].update_one(
        {"_id": ObjectId(member_id)},
        {"$set": {"active": True}}
    )
