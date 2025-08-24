from fastapi import APIRouter
from app.db.session import db

router = APIRouter(tags=["members"])

@router.get("/")
async def list_members():
    cursor = db.members.find()
    members = []
    async for m in cursor:
        members.append({
            "id": str(m["_id"]),         
            "name": m.get("full_name"),  
            "avatar": m.get("avatar"),   
            "role": m.get("role")        
        })
    return members
