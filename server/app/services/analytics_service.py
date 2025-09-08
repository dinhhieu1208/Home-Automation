# app/services/analytics_service.py
from typing import List, Dict, Any
from datetime import datetime
from app.schemas.analytics import KPICard, ChartPoint, DeviceChart, AlertItem
from app.db.session import db  # motor async client

async def build_kpis(query_filter: Dict[str, Any]) -> List[KPICard]:
    active_devices = await db.device_logs.count_documents({"status": {"$in": ["on","active","dimmed"]}, **query_filter})
    alerts_count = await db.device_logs.count_documents({"status": {"$in": ["error","offline"]}, **query_filter})

    energy_cursor = db.device_logs.aggregate([
        {"$match": query_filter},
        {"$group": {"_id": None, "total": {"$sum": {"$ifNull": ["$meta.energyUsage", 0]}}}}
    ])
    energy_list = await energy_cursor.to_list(length=1)
    energy_total = float(energy_list[0]["total"]) if energy_list else 0

    sensor_cursor = db.sensor_data.aggregate([
        {"$match": query_filter},
        {"$group": {"_id": "$type", "avg": {"$avg": "$value"}}}
    ])
    sensor_list = await sensor_cursor.to_list(length=None)
    avg_temp = next((float(s["avg"]) for s in sensor_list if s["_id"]=="temperature"), 0)
    avg_humidity = next((float(s["avg"]) for s in sensor_list if s["_id"]=="humidity"), 0)

    return [
        KPICard(name="Active Devices", value=active_devices),
        KPICard(name="Energy Usage", value=energy_total, unit="kWh"),
        KPICard(name="Alerts / Errors", value=alerts_count),
        KPICard(name="Avg Temperature", value=avg_temp, unit="°C"),
        KPICard(name="Avg Humidity", value=avg_humidity, unit="%"),
    ]

async def build_device_usage_chart(query_filter: Dict[str, Any]) -> List[DeviceChart]:
    device_usage = []
    async for doc in db.device_logs.find(query_filter):
        device_usage.append(DeviceChart(
            deviceId=doc["deviceId"],
            deviceName=doc.get("deviceName",""),
            roomId=doc.get("roomId",""),
            data=[ChartPoint(value=1 if doc.get("is_on") else 0)]
        ))
    return device_usage

async def build_sensor_chart(sensor_type: str, query_filter: Dict[str, Any]) -> List[ChartPoint]:
    chart = []
    async for doc in db.sensor_data.find({**query_filter, "type": sensor_type}):
        chart.append(ChartPoint(value=doc["value"]))
    return chart

async def build_energy_chart(query_filter: Dict[str, Any]) -> List[ChartPoint]:
    chart = []
    async for doc in db.device_logs.find(query_filter):
        chart.append(ChartPoint(value=doc.get("meta", {}).get("energyUsage", 0)))
    return chart

async def build_alerts(query_filter: Dict[str, Any]) -> List[AlertItem]:
    alerts = []
    async for doc in db.device_logs.find({"status": {"$in": ["error","offline"]}, **query_filter}):
        alerts.append(AlertItem(
            deviceId=doc["deviceId"],
            deviceName=doc.get("deviceName",""),
            roomId=doc.get("roomId",""),
            type="Device Alert",
            message=f"{doc.get('deviceName','Device')} status is {doc['status']}",
            level="critical"
        ))
    return alerts
