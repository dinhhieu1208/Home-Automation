# app/schemas/chat.py
from pydantic import BaseModel, Field, HttpUrl
from typing import List, Optional, Any
from datetime import datetime

class UserPublic(BaseModel):
    id: str = Field(..., alias="_id")
    name: str
    avatar: Optional[HttpUrl] = None
    role: Optional[str] = None
    status: Optional[str] = "offline"

    class Config:
        allow_population_by_field_name = True

class ConversationMember(BaseModel):
    userId: str
    role: Optional[str] = "member"

class LastMessagePreview(BaseModel):
    senderId: Optional[str]
    text: Optional[str]
    createdAt: Optional[datetime]

class ConversationCreate(BaseModel):
    type: str = "group" 
    name: Optional[str] = None
    avatar: Optional[HttpUrl] = None
    members: List[ConversationMember]

class ConversationOut(BaseModel):
    id: str = Field(..., alias="_id")
    type: str
    name: Optional[str]
    avatar: Optional[HttpUrl]
    members: List[ConversationMember]
    lastMessage: Optional[Any] = None
    createdAt: Optional[datetime]
    updatedAt: Optional[datetime]

    class Config:
        allow_population_by_field_name = True

class Attachment(BaseModel):
    type: str 
    url: Optional[HttpUrl] = None
    data: Optional[Any] = None

class MessageCreate(BaseModel):
    conversationId: str
    senderId: str
    text: Optional[str] = ""
    attachments: Optional[List[Attachment]] = []

class MessageOut(BaseModel):
    id: str = Field(..., alias="_id")
    conversationId: str
    senderId: str
    text: Optional[str] = ""
    attachments: Optional[List[Attachment]] = []
    status: Optional[str] = "sent"
    createdAt: Optional[datetime]

    class Config:
        allow_population_by_field_name = True
