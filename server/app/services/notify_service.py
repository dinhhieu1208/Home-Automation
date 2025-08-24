import asyncio
from typing import Dict, Any
from fastapi import WebSocket

class WSManager:
    def __init__(self):
        self.active: set[WebSocket] = set()
        self.lock = asyncio.Lock()

    async def connect(self, ws: WebSocket):
        await ws.accept()
        async with self.lock:
            self.active.add(ws)

    async def disconnect(self, ws: WebSocket):
        async with self.lock:
            self.active.discard(ws)

    async def broadcast(self, message: Dict[str, Any]):
        async with self.lock:
            to_remove = []
            for ws in list(self.active):
                try:
                    await ws.send_json(message)
                except:
                    to_remove.append(ws)
            for ws in to_remove:
                self.active.discard(ws)

ws_manager = WSManager()

async def notify_ws_clients(payload: Dict[str, Any]):
    await ws_manager.broadcast(payload)
