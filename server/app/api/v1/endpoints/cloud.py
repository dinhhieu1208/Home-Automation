from fastapi import APIRouter, HTTPException
from app.schemas.cloud import CloudData
from datetime import datetime
from app.db.session import db

router = APIRouter()

def serialize_doc(doc):
    if isinstance(doc, dict):
        if "$date" in doc:
            return doc["$date"]
        return {k: serialize_doc(v) for k, v in doc.items()}
    elif isinstance(doc, list):
        return [serialize_doc(v) for v in doc]
    elif isinstance(doc, datetime):
        return doc.isoformat()   # <-- convert datetime to string
    else:
        return doc

@router.get("", response_model=CloudData)
async def get_cloud_data():
    doc = await db.cloud.find_one({}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="No cloud data found")

    cloud_doc = {
        "connection": {
            "status": doc["mqtt"]["broker"]["status"],
            "server": f"{doc['mqtt']['broker']['host']}:{doc['mqtt']['broker']['port']}",
            "uptime": serialize_doc(doc["mqtt"]["broker"]["uptime"]),
            "lastConnected": serialize_doc(doc["mqtt"]["broker"]["lastConnected"]),
        },
        "config": {
            "mqttBroker": {
                "host": doc["mqtt"]["broker"]["host"],
                "port": doc["mqtt"]["broker"]["port"],
                "username": doc["mqtt"]["broker"]["username"],
                "password": doc["mqtt"]["broker"]["password"],
                "status": doc["mqtt"]["broker"]["status"],
                "uptime": serialize_doc(doc["mqtt"]["broker"]["uptime"]),
                "lastConnected": serialize_doc(doc["mqtt"]["broker"]["lastConnected"]),
                "useTLS": doc["mqtt"]["broker"]["useTLS"]
            },
            "apiKey": doc.get("apiKey", ""),
            "useTLS": doc["mqtt"]["broker"]["useTLS"]
        },
        "monitoring": {
            "messages": doc["mqtt"].get("messages", {"sent": 0, "received": 0}),
            "logs": [
                {
                    "timestamp": serialize_doc(log.get("timestamp")),
                    "event": log.get("event"),
                    "deviceId": log.get("deviceId")
                }
                for log in doc["mqtt"].get("logs", [])
            ],
            "topics": doc["mqtt"].get("topics", {"subscribed": [], "published": []})
        },
        "iotHub": {
            "projects": doc.get("iotHub", [])
        },
        "backupSync": {
            "lastBackup": serialize_doc(doc.get("backupSync", {}).get("lastBackup")),
            "autoSync": doc.get("backupSync", {}).get("autoSync", False),
            "targets": doc.get("backupSync", {}).get("targets", [])
        },
        "mongoDB": {
            "uri": doc["mongoDB"]["uri"],
            "database": doc["mongoDB"]["database"],
            "status": doc["mongoDB"]["status"],
            "lastConnected": serialize_doc(doc["mongoDB"]["lastConnected"])
        }
    }

    return cloud_doc
