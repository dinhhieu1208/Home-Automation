from typing import Optional, List, Dict, Any
from datetime import datetime
from fastapi import APIRouter, Query
from dateutil import parser as date_parser
from app.db.session import db
from app.schemas.analytics import AnalyticsResponse, SensorData, DeviceLog

router = APIRouter()

# collections cố định
SENSOR_COLLECTION = "sensor_data"
LOG_COLLECTION = "device_logs"


def _parse_timestamp(value: Any) -> Optional[datetime]:
    """Chuyển string ISO -> datetime; nếu None thì bỏ qua."""
    if value is None:
        return None
    if isinstance(value, datetime):
        return value
    if isinstance(value, str):
        try:
            return date_parser.isoparse(value)
        except Exception:
            try:
                return datetime.fromisoformat(value.replace("Z", "+00:00"))
            except Exception:
                return None
    return None


def _normalize_doc(doc: Dict[str, Any]) -> Dict[str, Any]:
    """Chuẩn hóa ObjectId, timestamp."""
    out = dict(doc)
    if "_id" in out:
        try:
            out["_id"] = str(out["_id"])
        except Exception:
            pass
    if "timestamp" in out:
        ts = _parse_timestamp(out["timestamp"])
        if ts:
            out["timestamp"] = ts
    return out


@router.get("/", response_model=AnalyticsResponse)
async def get_analytics(
    roomId: Optional[str] = Query(None),
    deviceId: Optional[str] = Query(None),
    limit: int = Query(1000, gt=0, le=5000),
):
    # filter
    filter_q: Dict[str, Any] = {}
    if roomId:
        filter_q["roomId"] = roomId
    if deviceId:
        filter_q["deviceId"] = deviceId

    # lấy sensors
    sensors_cursor = db[SENSOR_COLLECTION].find(filter_q).sort("timestamp", -1).limit(limit)
    sensors_raw = [d async for d in sensors_cursor]
    sensors = [SensorData(**_normalize_doc(d)) for d in sensors_raw]

    # lấy logs
    logs_cursor = db[LOG_COLLECTION].find(filter_q).sort("timestamp", -1).limit(limit)
    logs_raw = [d async for d in logs_cursor]
    logs = [DeviceLog(**_normalize_doc(d)) for d in logs_raw]

    return AnalyticsResponse(sensors=sensors, logs=logs)
