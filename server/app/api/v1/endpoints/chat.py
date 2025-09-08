from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.chat import ConversationCreate, ConversationOut, MessageCreate, MessageOut
from app.crud import crud_chat

router = APIRouter(prefix="/chat", tags=["chat"])

@router.post("/conversations", response_model=ConversationOut)
async def create_conversation(payload: ConversationCreate):
    created = await crud_chat.create_conversation(payload.dict())
    if not created:
        raise HTTPException(status_code=500, detail="Cannot create conversation")
    return created

@router.get("/conversations/{user_id}", response_model=List[ConversationOut])
async def list_conversations(user_id: str):
    return await crud_chat.get_conversations_for_user(user_id)

@router.get("/conversations/detail/{conv_id}", response_model=ConversationOut)
async def get_conversation(conv_id: str):
    conv = await crud_chat.get_conversation_by_id(conv_id)
    if not conv:
        raise HTTPException(status_code=404, detail="Conversation not found")
    return conv

@router.post("/messages", response_model=MessageOut)
async def send_message(payload: MessageCreate):
    conv = await crud_chat.get_conversation_by_id(payload.conversationId)
    if not conv:
        raise HTTPException(status_code=404, detail="Conversation not found")
    return await crud_chat.add_message(payload.dict())

@router.get("/messages/{conversation_id}", response_model=List[MessageOut])
async def fetch_messages(conversation_id: str, limit: int = 200, skip: int = 0):
    return await crud_chat.get_messages(conversation_id, limit=limit, skip=skip)
