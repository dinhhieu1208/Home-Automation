from typing import Optional
from fastapi import HTTPException, status
from app.schemas.room import RoomCreate, RoomOut
from app.crud.crud_room import create_room, get_room_by_name

class RoomService:
    @staticmethod
    async def add_room(room_data: RoomCreate) -> RoomOut:

        existing_room = await get_room_by_name(room_data.name)
        if existing_room:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Room with name '{room_data.name}' already exists."
            )

        new_room = await create_room(room_data)
        return RoomOut(**new_room.dict())
