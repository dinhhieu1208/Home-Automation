
🏠 SmartHome IoT

SmartHome IoT là một hệ thống nhà thông minh cho phép người dùng điều khiển, giám sát và tự động hóa các thiết bị điện trong gia đình thông qua ứng dụng **Mobile Flutter** và **Web Admin ReactJS**, kết nối với Backend API FastAPI. Hệ thống hỗ trợ MQTT, JWT, lịch trình và quản lý người dùng.


🚀 Tính năng chính

- 📱 Điều khiển thiết bị từ xa (bật/tắt, hẹn giờ,...)
- 🌡️ Theo dõi cảm biến nhiệt độ, độ ẩm, chuyển động
- 📋 Quản lý phòng, thiết bị, người dùng
- 📊 Giao diện web admin thống kê, theo dõi trạng thái
- 🔐 Xác thực người dùng bằng JWT
- ⚙️ Tích hợp MQTT để giao tiếp với thiết bị IoT


 🧱 Cấu trúc thư mục chính


smarthome/    
├── client/                # giao diện người dùng
├── server/                # Server backend FastAPI
├── db/                    # Migration, schema, seed
├── railway/               # Railway config để deploy
└── README.md              # File này
```


⚙️ Công nghệ sử dụng

| Thành phần       | Công nghệ                          |
|------------------|-----------------------------------|
| 👤 Frontend Web   | ReactJS, Vite, TailwindCSS        |
| 📱 Mobile App     | Flutter (Clean Architecture)      |
| ⚙️ Backend API     | FastAPI, SQLAlchemy, Pydantic     |
| 🗄️ Database        | PostgreSQL                        |
| 🔐 Auth           | JWT, OAuth2                       |
| 📡 Giao tiếp IoT  | MQTT / HTTP API                   |
| ☁️ Deploy         | Railway (multi-service)           |


 🚀 Hướng dẫn chạy local

1. Clone source code
   ```bash
   git clone https://github.com/your-username/smarthome.git
   cd smarthome
   ```

2. **Chạy backend FastAPI**
   cd server
   python -m venv venv
   source venv/bin/activate      # Windows: .\venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn app.main:app --reload
   ```

3. **Chạy web admin**
   ```bash
   cd ../client
   npm install
   npm run dev
   ```

4. **Chạy mobile app**
   ```bash
   cd ../smarthome_user_app
   flutter pub get
   flutter run
   ```


## 🌐 Deploy với Railway

Dự án hỗ trợ multi-service trên Railway:

- **smarthome_service**: FastAPI backend
- **smarthome_web**: ReactJS SPA
- **smarthome_user_app**: Dùng flutter build web rồi deploy nếu cần
- **smarthome_db**: PostgreSQL (plugin Railway)

Tạo `.env` tương ứng trong mỗi service hoặc cấu hình trên dashboard Railway.


## 📄 License

MIT License © Shinichi


## 👨‍💻 Liên hệ

- **Github**: Kudo Shinichi
- **Email**: tronghieutruonghp@gmail.com

