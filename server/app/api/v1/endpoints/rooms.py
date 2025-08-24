from app.db.session import db  
from fastapi import APIRouter, HTTPException, status, Depends
from app.schemas.room import RoomCreate, RoomRead
from app.api.v1.deps import get_db
from app.crud.crud_room import create_room, get_room_by_name
from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import datetime
import uuid
from bson import ObjectId

router = APIRouter(tags=["rooms"])

@router.get("/")
async def get_rooms_with_devices():
    rooms_cursor = db.rooms.find()
    rooms = []

    async for r in rooms_cursor:
        devices_cursor = db.devices.find({"roomId": r["_id"]})
        devices = []
        async for d in devices_cursor:
            devices.append({
                "id": str(d["_id"]),
                "name": d["name"],
                "type": d["type"],
                "status": d.get("status", d.get("defaultState", "off")),
                "controlMode": d.get("controlMode", "manual")
            })
        rooms.append({
            "id": str(r["_id"]),
            "name": r["name"],
            "description": r.get("description", ""),
            "devices": devices
        })
    return rooms


@router.post("/create", response_model=RoomRead, status_code=status.HTTP_201_CREATED)
async def add_room(room_data: RoomCreate, db: AsyncIOMotorDatabase = Depends(get_db)):

    # --- Check phòng trùng tên ---
    existing_room = await db.rooms.find_one({"name": room_data.name})
    if existing_room:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Room with name '{room_data.name}' already exists."
        )

    # --- Tạo ObjectId mới cho phòng ---
    room_oid = ObjectId()
    room_dict = {
        "_id": room_oid,
        "name": room_data.name,
        "description": room_data.description
    }

    # --- Lưu phòng vào collection rooms ---
    await db.rooms.insert_one(room_dict)

    # --- Lưu devices ---
    devices_input = getattr(room_data, "devices", [])
    devices_to_insert = []
    for d in devices_input:
        device_doc = {
            "_id": ObjectId(),
            "roomId": room_oid,
            "name": d.get("name") or f"Device_{uuid.uuid4().hex[:6]}",
            "type": d.get("type"),
            "status": d.get("status", d.get("defaultState", "off")),
            "defaultState": d.get("defaultState", "off"),
            "controlMode": d.get("controlMode", "manual"),
            "lastUpdated": datetime.utcnow(),
            "meta": d.get("meta", {})
        }
        devices_to_insert.append(device_doc)

    if devices_to_insert:
        await db.devices.insert_many(devices_to_insert)

    # --- Tạo roomAccess document cho phòng mới ---
    access_list = []

    # Owner mặc định
    owner_id = "custom_owner_001"
    access_list.append({
        "memberId": owner_id,
        "name": "Trương Trọng Hiếu",
        "role": "owner",
        "avatar": "https://i.pinimg.com/1200x/54/fc/0b/54fc0b74b56a74537d90862547f7e3d1.jpg",
        "grantedAt": datetime.utcnow().isoformat()
    })

    # Members được chọn
    members_input = getattr(room_data, "members", [])
    for m in members_input:
        member_id = getattr(m, "id", str(uuid.uuid4()))
        access_list.append({
            "memberId": member_id,
            "name": getattr(m, "name", f"User_{uuid.uuid4().hex[:4]}"),
            "role": getattr(m, "role", "member"),
            "avatar": getattr(m, "avatar", ""),
            "grantedAt": datetime.utcnow().isoformat()
        })

    room_access_doc = {
        "_id": f"acl_{uuid.uuid4().hex[:8]}",
        "roomId": str(room_oid),
        "roomName": room_data.name,
        "access": access_list
    }

    await db.roomAccess.insert_one(room_access_doc)

    # --- Lấy danh sách devices để trả về ---
    devices_cursor = db.devices.find({"roomId": room_oid})
    devices_result = []
    async for d in devices_cursor:
        devices_result.append({
            "id": str(d["_id"]),
            "name": d["name"],
            "type": d.get("type"),
            "status": d.get("status", "off"),
            "controlMode": d.get("controlMode", "manual")
        })

    room_dict["devices"] = devices_result
    room_dict["id"] = str(room_dict["_id"])

    return RoomRead(**room_dict)