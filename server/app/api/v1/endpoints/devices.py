from fastapi import APIRouter, BackgroundTasks, HTTPException
from app.crud import crud_device, crud_notification
from app.schemas.device import DeviceUpdate
from app.schemas.notification import NotificationBase
from app.services.notify_service import notify_ws_clients

router = APIRouter(tags=["devices"])

@router.patch("/{device_id}/toggle")
async def toggle_device(device_id: str, payload: DeviceUpdate, background_tasks: BackgroundTasks):
    device = await crud_device.get_device(device_id)
    if not device:
        raise HTTPException(404, "Device not found")
    new_state = payload.is_on if payload.is_on is not None else not device.get("is_on", False)
    await crud_device.update_device_state(device_id, new_state)

    noti = NotificationBase(title=f"{device['name']} turned {'ON' if new_state else 'OFF'}",
                            body=f"Device in room {device.get('room_id')} is now {'ON' if new_state else 'OFF'}")
    noti_record = await crud_notification.create_notification(noti)

    background_tasks.add_task(notify_ws_clients, {"type":"device_toggle","device":device_id,"is_on":new_state})

    return {"status": "ok", "device": {"id": device_id, "is_on": new_state}}


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

