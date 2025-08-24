from fastapi import APIRouter, Depends, HTTPException
from typing import List
from app.api.v1.deps import get_db
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.schemas.roomaccess import MemberAccess
from app.crud import crud_roomaccess

router = APIRouter()

@router.get("/{room_id}", response_model=List[MemberAccess])
async def get_room_access(room_id: str, db: AsyncIOMotorDatabase = Depends(get_db)):
    members = await crud_roomaccess.get_members_by_room(db, room_id)
    if members is None:
        raise HTTPException(status_code=404, detail="Room not found")
    return members

