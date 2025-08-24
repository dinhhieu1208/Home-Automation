smarthome_admin_portal/
├── public/                            # Static files công khai, dùng bởi index.html
│   └── index.html                     # Điểm bắt đầu tải app vào trình duyệt
│
├── src/                               # Thư mục chính chứa toàn bộ mã nguồn
│
│   ├── assets/                        # Tài nguyên tĩnh (ảnh, biểu tượng)
│   │   ├── images/                    # Hình ảnh dùng trong UI
│   │   └── icons/                     # Icon SVG hoặc PNG
│
│   ├── components/                    # Component nhỏ, có thể tái sử dụng
│   │   ├── Button.jsx
│   │   └── DeviceCard.jsx
│   │   ├── LoginForm.jsx
│   │   └── RegisterForm.jsx
│
│   ├── layouts/                       # Layout tổng thể cho các trang (Header, Sidebar,...)
│   │   ├── AdminLayout.jsx            # Layout dùng khi đã login
│   │   └── AuthLayout.jsx             # Layout cho các trang auth (login, register)
│
│   ├── pages/                         # Các page chính, tương ứng với các route
│   │   ├── LoginPage.jsx
│   │   ├── DashboardPage.jsx
│   │   └── DevicesPage.jsx
│
│   ├── views/                         # View riêng biệt cho từng module/feature
│   │   ├── dashboard/
│   │   │   └── DashboardView.jsx
│   │   ├── devices/
│   │   │   └── DeviceListView.jsx
│   │   └── rooms/
│   │       └── RoomListView.jsx
│
│   ├── routes/                        # Cấu hình định tuyến (React Router)
│   │   └── AppRoutes.jsx
│
│   ├── services/                      # Dịch vụ gọi API hoặc xử lý logic nghiệp vụ
│   │   ├── api.js                     # Cấu hình axios
│   │   ├── authService.js
│   │   ├── deviceService.js
│   │   └── roomService.js
│
│   ├── controllers/                   # Tầng điều phối logic, giống controller MVC
│   │   ├── authController.js
│   │   ├── deviceController.js
│   │   └── roomController.js
│
│   ├── hooks/                         # Custom React hooks
│   │   ├── useAuth.js
│   │   └── useDevices.js
│
│   ├── store/                         # Quản lý global state (Redux, Zustand, ...)
│   │   └── index.js
│
│   ├── constants/                     # Các hằng số dùng chung trong app
│   │   ├── roles.js
│   │   └── endpoints.js
│
│   ├── utils/                         # Hàm tiện ích, xử lý dữ liệu, validate,...
│   │   └── formatDate.js
│
│   ├── styles/                        # Style toàn cục, config theme,...
│   │   ├── tailwind.css              # File import TailwindCSS
│   │   └── theme.js                  # Cấu hình màu, font, spacing,...
│
│   ├── App.jsx                        # Component gốc của app
│   └── main.jsx                       # Entry point khởi chạy React (ReactDOM)
│
├── tailwind.config.js                # Cấu hình cho TailwindCSS
├── package.json                      # Thông tin dependencies, scripts,...
└── jsconfig.json                     # (nếu dùng JS) cấu hình path alias cho JS project
