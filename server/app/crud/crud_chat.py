from typing import List, Optional
from datetime import datetime
from bson import ObjectId
from app.db.session import db  

DB = db

COL_USERS = "chat_users"
COL_CONVS = "chat_conversations"
COL_MSGS = "chat_messages"

async def create_conversation(doc: dict) -> dict:
    doc.setdefault("createdAt", datetime.utcnow())
    doc.setdefault("updatedAt", datetime.utcnow())
    res = await DB[COL_CONVS].insert_one(doc)
    created = await DB[COL_CONVS].find_one({"_id": res.inserted_id})
    created["_id"] = str(created["_id"])
    return created

async def get_conversations_for_user(user_id: str) -> List[dict]:
    cursor = DB[COL_CONVS].find({"members.userId": user_id}).sort("updatedAt", -1)
    items = []
    async for d in cursor:
        d["_id"] = str(d["_id"])
        items.append(d)
    return items

async def get_conversation_by_id(conv_id: str) -> Optional[dict]:
    doc = await DB[COL_CONVS].find_one({"_id": ObjectId(conv_id)})
    if doc:
        doc["_id"] = str(doc["_id"])
    return doc

async def add_message(msg: dict) -> dict:
    msg.setdefault("createdAt", datetime.utcnow())
    msg.setdefault("status", "sent")
    # ensure conversationId is ObjectId for storage
    msg_copy = msg.copy()
    msg_copy["conversationId"] = ObjectId(msg["conversationId"]) if not ObjectId.is_valid(msg["conversationId"]) is False else ObjectId(msg["conversationId"])
    res = await DB[COL_MSGS].insert_one(msg_copy)
    created = await DB[COL_MSGS].find_one({"_id": res.inserted_id})
    # update lastMessage in conversation
    lm = {
        "senderId": created["senderId"],
        "text": created.get("text", None),
        "attachments": created.get("attachments", []),
        "createdAt": created["createdAt"]
    }
    await DB[COL_CONVS].update_one(
        {"_id": created["conversationId"]},
        {"$set": {"lastMessage": lm, "updatedAt": datetime.utcnow()}}
    )
    created["_id"] = str(created["_id"])
    # convert conversationId back to str for API
    created["conversationId"] = str(created["conversationId"])
    return created

async def get_messages(conversation_id: str, limit: int = 100, skip: int = 0) -> List[dict]:
    conv_oid = ObjectId(conversation_id)
    cursor = DB[COL_MSGS].find({"conversationId": conv_oid}).sort("createdAt", 1).skip(skip).limit(limit)
    items = []
    async for d in cursor:
        d["_id"] = str(d["_id"])
        d["conversationId"] = str(d["conversationId"])
        items.append(d)
    return items

async def seed_users(users: List[dict]):
    # upsert users
    for u in users:
        await DB[COL_USERS].update_one({"_id": u["_id"]}, {"$set": u}, upsert=True)
