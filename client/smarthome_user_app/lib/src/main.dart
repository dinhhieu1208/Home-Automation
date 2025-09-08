import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:http/http.dart' as http;

import 'package:smarthome_user_app/src/presentation/controllers/login_controller.dart';
import 'package:smarthome_user_app/src/presentation/controllers/device_controller.dart';
import 'package:smarthome_user_app/src/presentation/controllers/room_controller.dart';

import 'package:smarthome_user_app/src/features/auth/domain/usecases/login_usecase.dart';
import 'package:smarthome_user_app/src/features/auth/data/repositories/auth_repository_impl.dart';
import 'package:smarthome_user_app/src/features/auth/data/datasources/auth_remote_data_source.dart';
import 'config/config.dart';
import 'app.dart';

void main() {
  // Login setup
  final remoteDataSource = AuthRemoteDataSourceImpl(
    http.Client(),
    baseUrl: AppConfig.apiBaseUrl,
  );
  final authRepository = AuthRepositoryImpl(remoteDataSource);
  final loginUseCase = LoginUseCase(authRepository);

  // Device & Room Controllers
  final deviceController = DeviceController();
  final roomController = RoomController();

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(
          create: (_) => LoginController(loginUseCase),
        ),
        ChangeNotifierProvider(
          create: (_) => deviceController,
        ),
        ChangeNotifierProvider(
          create: (_) => roomController,
        ),
      ],
      child: const SmartHomeApp(),
    ),
  );
}
