from fastapi import APIRouter
from app.crud import crud_notification

router = APIRouter(tags=["notifications"])

@router.get("/")
async def get_notifications():
    return await crud_notification.list_notifications()
