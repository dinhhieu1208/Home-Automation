from fastapi import APIRouter, Depends, HTTPException
from typing import List
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.crud import crud_memberManagements as crud
from app.schemas.memberManagements import MemberManagementSchema, MemberCreateSchema, MemberUpdateSchema, MemberSchema
from app.api.v1.deps import get_db


router = APIRouter(tags=["Member Management"])

@router.get("/", response_model=List[MemberManagementSchema])
async def list_members(db: AsyncIOMotorDatabase = Depends(get_db)):
    return await crud.get_all_members(db)

@router.patch("/{room_id}/{member_id}/toggle")
async def toggle_member(room_id: str, member_id: str, data: MemberUpdateSchema, db: AsyncIOMotorDatabase = Depends(get_db)):
    result = await crud.update_toggle_access(db, room_id, member_id, data.toggleAccess)
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Member not found")
    return {"msg": "Toggle access updated"}

@router.post("/create", response_model=MemberSchema)
async def create_member(data: MemberCreateSchema, db: AsyncIOMotorDatabase = Depends(get_db)):
    return await crud.create_member(db, data)

@router.put("/update/{member_id}")
async def update_member(member_id: str, data: MemberUpdateSchema, db: AsyncIOMotorDatabase = Depends(get_db)):
    result = await crud.update_member(db, member_id, data)
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Member not found or no changes")
    return {"msg": "Member updated successfully"}

@router.delete("/delete/{member_id}")
async def remove_member(member_id: str, db: AsyncIOMotorDatabase = Depends(get_db)):
    result = await crud.delete_member(db, member_id)
    if result is None:
        raise HTTPException(status_code=403, detail="Cannot delete Admin/Owner account")
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Member not found")
    return {"msg": "Member deleted"}


@router.patch("/lock/{member_id}")
async def lock_member(member_id: str, db: AsyncIOMotorDatabase = Depends(get_db)):
    result = await crud.lock_member(db, member_id)
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Member not found")
    return {"msg": "Member account locked"}

@router.patch("/unlock/{member_id}")
async def unlock_member(member_id: str, db: AsyncIOMotorDatabase = Depends(get_db)):
    result = await crud.unlock_member(db, member_id)
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Member not found")
    return {"msg": "Member account unlocked"}