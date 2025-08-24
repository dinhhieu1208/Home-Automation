smarthome_user_app/
├── android/
├── ios/
├── lib/
│   ├── src/
│   │   ├── core/
│   │   │   ├── constants/
│   │   │   │   ├── app_colors.dart
│   │   │   │   └── app_strings.dart
│   │   │   ├── error/
│   │   │   │   └── exceptions.dart
│   │   │   ├── usecases/
│   │   │   │   └── base_usecase.dart
│   │   │   ├── utils/
│   │   │   │   └── formatter.dart
│   │   │   └── theme/
│   │   │       └── app_theme.dart
│   │   │
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   │   ├── data/
│   │   │   │   │   ├── datasources/
│   │   │   │   │   │   └── auth_remote_data_source.dart
│   │   │   │   │   ├── models/
│   │   │   │   │   │   └── user_model.dart
│   │   │   │   │   └── repositories/
│   │   │   │   │       └── auth_repository_impl.dart
│   │   │   │   ├── domain/
│   │   │   │   │   ├── entities/
│   │   │   │   │   │   └── user.dart
│   │   │   │   │   ├── repositories/
│   │   │   │   │   │   └── auth_repository.dart
│   │   │   │   │   └── usecases/
│   │   │   │   │       └── login_usecase.dart
│   │   │   └── ... (devices/, rooms/, sensors/, schedules/ ...)
│   │   │
│   │   ├── presentation/
│   │   │   ├── controllers/
│   │   │   │   ├── login_controller.dart
│   │   │   │   ├── device_controller.dart
│   │   │   │   └── room_controller.dart
│   │   │   ├── screens/
│   │   │   │   ├── login_screen.dart
│   │   │   │   ├── device_list_screen.dart
│   │   │   │   └── room_list_screen.dart
│   │   │   ├── widgets/
│   │   │   │   ├── login_form.dart
│   │   │   │   ├── device_card.dart
│   │   │   │   └── room_card.dart
│   │   │   └── layouts/
│   │   │       ├── main_layout.dart
│   │   │       └── auth_layout.dart
│   │   │
│   │   ├── routes/
│   │   │   ├── app_routes.dart
│   │   │   └── route_names.dart
│   │   │
│   │   ├── app.dart
│   │   └── main.dart
│
├── pubspec.yaml
└── analysis_options.yaml
