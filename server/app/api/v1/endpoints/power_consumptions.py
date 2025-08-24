from fastapi import APIRouter, Depends, Query
from typing import List, Optional
from datetime import datetime
from app.schemas.power_consumption import PowerConsumptionOut, PowerConsumptionCreate
from app.crud.crud_power_consumption import crud_power_consumption

router = APIRouter()


@router.post("/", response_model=PowerConsumptionOut)
async def create_power_log(data: PowerConsumptionCreate):
    return await crud_power_consumption.create(data)


@router.get("/", response_model=List[PowerConsumptionOut])
async def get_all_logs(limit: int = Query(50, ge=1, le=500)):
    return await crud_power_consumption.get_all(limit=limit)


@router.get("/device/{device_id}", response_model=List[PowerConsumptionOut])
async def get_logs_by_device(
    device_id: str,
    start: Optional[datetime] = Query(None),
    end: Optional[datetime] = Query(None),
):
    return await crud_power_consumption.get_by_device(device_id, start, end)
