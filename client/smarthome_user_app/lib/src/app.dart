import 'package:flutter/material.dart';
import 'package:smarthome_user_app/src/routes/app_routes.dart';
import 'package:smarthome_user_app/src/core/theme/app_theme.dart';

class SmartHomeApp extends StatelessWidget {
  const SmartHomeApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Smart Home',
      theme: AppTheme.lightTheme,
      debugShowCheckedModeBanner: false,
      initialRoute: AppRoutes.intro,
      routes: AppRoutes.routes,
    );
  }
}
