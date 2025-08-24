from app.db.session import db
from datetime import datetime
from app.schemas.notification import NotificationBase

async def create_notification(noti: NotificationBase):
    data = noti.dict()
    data.update({"read": False, "created_at": datetime.utcnow()})
    result = await db.notifications.insert_one(data)
    return {**data, "id": str(result.inserted_id)}

async def list_notifications(limit: int = 50):
    cursor = db.notifications.find().sort("created_at", -1).limit(limit)
    return await cursor.to_list(limit)
