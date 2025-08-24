server/
├── app/
│   ├── api/
│   │   ├── v1/
│   │   │   ├── endpoints/
│   │   │   │   ├── auth.py
│   │   │   │   ├── devices.py
│   │   │   │   ├── rooms.py
│   │   │   │   ├── schedules.py
│   │   │   │   ├── sensors.py
│   │   │   │   └── users.py
│   │   │   │   └── admin.py
│   │   │   └── api_router.py
│   │   └── deps.py
│
│   ├── core/
│   │   ├── config.py         # Cấu hình từ .env
│   │   └── security.py       # JWT, hashing, permissions
│
│   ├── db/
│   │   ├── base.py           # Base class cho ORM
│   │   ├── session.py        # SessionLocal
│   │   └── init_db.py        # Seed dữ liệu
│
│   ├── models/
│   │   ├── user.py
│   │   ├── device.py
│   │   ├── room.py
│   │   ├── schedule.py
│   │   ├── sensor.py
│   │   └── __init__.py       # Import tất cả model
│
│   ├── schemas/
│   │   ├── token.py
│   │   ├── user.py
│   │   ├── device.py
│   │   ├── room.py
│   │   ├── schedule.py
│   │   ├── sensor.py
│   │   └── __init__.py
│
│   ├── crud/
│   │   ├── crud_user.py
│   │   ├── crud_device.py
│   │   ├── crud_room.py
│   │   ├── crud_schedule.py
│   │   ├── crud_sensor.py
│   │   └── __init__.py
│
│   ├── services/
│   │   ├── auth_service.py
│   │   └── mqtt_service.py   # Nếu bạn dùng MQTT với thiết bị IoT
│
│   ├── utils/
│   │   ├── logger.py
│   │   └── helpers.py
│
│   └── main.py               # Entry chính FastAPI app
│
├── .env
├── requirements.txt
├── alembic/                  # Migration nếu dùng
│   ├── versions/
│   └── env.py
├── alembic.ini
└── README.md
