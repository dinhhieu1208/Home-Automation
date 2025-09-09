from fastapi import APIRouter, BackgroundTasks, HTTPException
from app.crud import crud_device, crud_notification
from app.schemas.device import DeviceUpdate
from app.schemas.notification import NotificationBase
from app.services.notify_service import notify_ws_clients

router = APIRouter(tags=["devices"])

@router.get("/")
async def list_devices():
    devices = await crud_device.get_devices()
    if not devices:
        return []

    devices_serializable = []
    for d in devices:
        d_copy = d.copy()
        d_copy["id"] = str(d["_id"])
        if "roomId" in d_copy:
            d_copy["roomId"] = str(d_copy["roomId"])
        devices_serializable.append(d_copy)

    return devices_serializable


from app.services.mqtt_service import mqtt_service

from pydantic import BaseModel
from typing import Optional

class DeviceUpdate(BaseModel):
    is_on: Optional[bool] = None


# Map device_id -> topic MQTT
topic_map = {
    "light_livingroom": "home/livingroom/light",
    "fan_livingroom": "home/livingroom/fan",
}

@router.patch("/{device_id}/toggle")
async def toggle_device(device_id: str, payload: DeviceUpdate, background_tasks: BackgroundTasks):
    # 1️⃣ Xác định topic
    topic = topic_map.get(device_id)
    if not topic:
        raise HTTPException(status_code=404, detail="Device not found")

    # 2️⃣ Lấy trạng thái mới từ payload
    new_state = payload.is_on if payload.is_on is not None else False  # default OFF

    # 3️⃣ Gửi lệnh MQTT
    mqtt_service.publish(topic, "ON" if new_state else "OFF")

    # 4️⃣ Trả kết quả (bỏ qua DB và notification để test nhanh)
    return {
        "status": "ok",
        "device": {"id": device_id, "is_on": new_state}
    }
