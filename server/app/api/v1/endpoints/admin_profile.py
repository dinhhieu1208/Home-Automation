from fastapi import APIRouter, Depends, HTTPException
from app.schemas.admin import AdminProfile, AdminUpdate
from app.services import admin_service
from app.api.v1.deps import get_current_admin

router = APIRouter()

@router.get("/auth/me", response_model=AdminProfile)
async def get_admin_me(current_admin = Depends(get_current_admin)):
    return AdminProfile(
        name=current_admin["name"],
        email=current_admin.get("email"),
        avatar=current_admin.get("avatar"),
        role=current_admin.get("role", "admin")
    )

@router.put("/auth/me/profile", response_model=AdminProfile)
async def update_admin_me(update: AdminUpdate, current_admin = Depends(get_current_admin)):
    updated = await admin_service.update_admin(current_admin["_id"], update.dict(exclude_unset=True))
    if not updated:
        raise HTTPException(status_code=404, detail="Admin not found")
    return AdminProfile(**updated)
