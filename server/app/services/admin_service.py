import jwt
from bson import ObjectId
from app.db.session import db
from app.core.config import settings

admin_collection = db["admin"]

def _normalize_admin(doc: dict | None) -> dict | None:
    if not doc:
        return None

    return {
        "_id": str(doc.get("_id")),
        "name": doc.get("name") or doc.get("full_name") or "",
        "full_name": doc.get("full_name") or doc.get("name") or "",
        "email": doc.get("email"),
        "avatar": doc.get("avatar"),
        "role": doc.get("role", "Admin"),
    }

def _is_valid_objectid(oid: str) -> bool:
    try:
        ObjectId(oid)
        return True
    except Exception:
        return False

async def get_admin_by_token(token: str):
    try:
        payload = jwt.decode(token, settings.jwt_secret, algorithms=[settings.jwt_algorithm])
        sub = payload.get("sub")
        if not sub:
            return None
        doc = await admin_collection.find_one({"email": sub})
        if not doc and _is_valid_objectid(sub):
            doc = await admin_collection.find_one({"_id": ObjectId(sub)})

        return _normalize_admin(doc)
    except Exception:
        return None

async def get_admin_by_id(admin_id: str):
    if not _is_valid_objectid(admin_id):
        return None
    doc = await admin_collection.find_one({"_id": ObjectId(admin_id)})
    return _normalize_admin(doc)

async def update_admin(admin_id: str, update_data: dict):
    update_data.pop("role", None)

    db_update = {}
    if "name" in update_data:
        db_update["full_name"] = update_data["name"]
        db_update["name"] = update_data["name"]  
    if "full_name" in update_data and "name" not in update_data:
        db_update["full_name"] = update_data["full_name"]
    if "email" in update_data:
        db_update["email"] = update_data["email"]
    if "avatar" in update_data:
        db_update["avatar"] = update_data["avatar"]

    if not db_update:
        return await get_admin_by_id(admin_id)

    if not _is_valid_objectid(admin_id):
        return None

    await admin_collection.update_one({"_id": ObjectId(admin_id)}, {"$set": db_update})
    doc = await admin_collection.find_one({"_id": ObjectId(admin_id)})
    return _normalize_admin(doc)
