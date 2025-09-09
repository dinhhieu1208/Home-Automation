from app.db.session import db
from typing import List

async def list_notifications(limit: int = 50) -> List[dict]:
    cursor = db.notifications.find().sort("created_at", -1).limit(limit)
    docs = await cursor.to_list(length=limit)
    notifications = []

    for doc in docs:
        # đọc các field cơ bản
        noti = {
            "id": str(doc["_id"]),
            "type": doc.get("type", "reminder"),
            "icon": doc.get("icon", "🔔"),
            "message": doc.get("message", ""),
            "actions": doc.get("actions", [])
        }

        # nếu có user info
        if "user" in doc:
            noti["user"] = {
                "name": doc["user"].get("name", "Unknown"),
                "avatar": doc["user"].get("avatar", "")
            }

        # nếu có profile liên quan
        if "profile" in doc:
            noti["profile"] = {
                "name": doc["profile"].get("name", "Unknown"),
                "avatar": doc["profile"].get("avatar", ""),
                "link": doc["profile"].get("link", "")
            }

        notifications.append(noti)

    return notifications
