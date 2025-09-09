from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId
from pymongo import ReturnDocument
from app.schemas.memberManagements import MemberCreateSchema, MemberUpdateSchema

collection_name = "memberManagements"

def serialize_member(member) -> dict:
    if not member:
        return None
    # Convert ObjectId -> string và đổi key từ _id sang id
    member["id"] = str(member["_id"])
    member.pop("_id", None)  # bỏ _id để frontend không bị lẫn
    return member

async def get_all_members(db: AsyncIOMotorDatabase):
    docs = await db[collection_name].find().to_list(1000)
    return [serialize_member(doc) for doc in docs]

async def get_member_by_room(db: AsyncIOMotorDatabase, room_id: str):
    doc = await db[collection_name].find_one({"roomId": room_id})
    return serialize_member(doc)

async def update_toggle_access(db: AsyncIOMotorDatabase, room_id: str, member_id: str, toggle: bool):
    try:
        return await db[collection_name].update_one(
            {"roomId": room_id, "access.memberId": member_id},
            {"$set": {"access.$.toggleAccess": toggle}}
        )
    except Exception:
        return None

async def create_member(db: AsyncIOMotorDatabase, data: MemberCreateSchema):
    doc = data.dict()
    result = await db[collection_name].insert_one(doc)
    new_member = await db[collection_name].find_one({"_id": result.inserted_id})
    return serialize_member(new_member)

async def update_member(db: AsyncIOMotorDatabase, member_id: str, data: MemberUpdateSchema):
    update_data = {k: v for k, v in data.dict().items() if v is not None}
    try:
        updated = await db[collection_name].find_one_and_update(
            {"_id": ObjectId(member_id)},
            {"$set": update_data},
            return_document=ReturnDocument.AFTER
        )
        return serialize_member(updated)
    except Exception:
        return None

async def delete_member(db: AsyncIOMotorDatabase, member_id: str):
    try:
        member = await db[collection_name].find_one({"_id": ObjectId(member_id)})
    except Exception:
        return {"error": "invalid_id"}
    if member and member["role"].lower() in ["admin", "owner"]:
        return None
    return await db[collection_name].delete_one({"_id": ObjectId(member_id)})

async def lock_member(db: AsyncIOMotorDatabase, member_id: str):
    try:
        return await db[collection_name].update_one(
            {"_id": ObjectId(member_id)},
            {"$set": {"active": False}}
        )
    except Exception:
        return None

async def unlock_member(db: AsyncIOMotorDatabase, member_id: str):
    try:
        return await db[collection_name].update_one(
            {"_id": ObjectId(member_id)},
            {"$set": {"active": True}}
        )
    except Exception:
        return None
