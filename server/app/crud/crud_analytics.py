from typing import Dict, Any, List
from app.db.session import db

async def get_device_logs(filter_doc: Dict[str, Any]) -> List[Dict[str, Any]]:
    cursor = db.device_logs.find(filter_doc).sort("timestamp", 1)
    return [doc async for doc in cursor]

async def count_active_devices(filter_doc: Dict[str, Any]) -> int:
    return await db.device_logs.count_documents({**filter_doc, "is_on": True})

async def count_alerts(filter_doc: Dict[str, Any]) -> int:
    return await db.device_logs.count_documents({**filter_doc, "status": {"$in": ["error", "offline"]}})

async def sum_energy_usage(filter_doc: Dict[str, Any]) -> float:
    pipeline = [
        {"$match": filter_doc},
        {"$group": {"_id": None, "total": {"$sum": {"$ifNull": ["$meta.energyUsage", 0]}}}}
    ]
    cur = db.device_logs.aggregate(pipeline)
    lst = await cur.to_list(length=1)
    return float(lst[0]["total"]) if lst else 0.0

async def avg_sensors(filter_doc: Dict[str, Any]) -> Dict[str, float]:
    pipeline = [
        {"$match": filter_doc},
        {"$group": {"_id": "$type", "avg": {"$avg": "$value"}}}
    ]
    cur = db.sensor_data.aggregate(pipeline)
    lst = await cur.to_list(length=None)
    result = {}
    for item in lst:
        avg_val = item.get("avg")
        result[item["_id"]] = float(avg_val) if avg_val is not None else 0.0
    return result
