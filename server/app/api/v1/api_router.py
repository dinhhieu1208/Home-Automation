from fastapi import APIRouter
from app.api.v1.endpoints import auth, devices, rooms, members, notifications, admin_profile, power_consumptions, roomaccess,memberManagements,cloud,analytics,chat

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(devices.router, prefix="/devices", tags=["devices"])
api_router.include_router(rooms.router, prefix="/rooms", tags=["rooms"])
api_router.include_router(members.router, prefix="/members", tags=["members"])
api_router.include_router(notifications.router, prefix="/notifications", tags=["notifications"])
api_router.include_router(admin_profile.router, prefix="/auth", tags=["auth"])
api_router.include_router(admin_profile.router, prefix="", tags=["admin_profile"]) 
api_router.include_router(power_consumptions.router, prefix="/power-consumptions", tags=["power consumptions"])
api_router.include_router(roomaccess.router, prefix="/roomaccess", tags=["roomaccess"])
api_router.include_router(memberManagements.router, prefix="/member-managements", tags=["memberManagements"])
api_router.include_router(cloud.router, prefix="/cloud", tags=["cloud"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["Analytics"])
api_router.include_router(analytics.router, prefix="/chat", tags=["Analytics"])