import 'package:flutter/material.dart';
import 'presentation/screens/home_screen.dart';
import 'presentation/screens/login_screen.dart';
import 'presentation/screens/intro_screen.dart';
import 'presentation/screens/smart_screen.dart';
import 'presentation/screens/reports_screen.dart';
import 'presentation/screens/account_screen.dart';
import 'presentation/screens/lightning_screen.dart';
import 'presentation/screens/cameras_screen.dart';
import 'presentation/screens/home_management_screen.dart';

class SmartHomeApp extends StatelessWidget {
  const SmartHomeApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Smart Home',
      debugShowCheckedModeBanner: false,
      initialRoute: '/intro',
      routes: {
        '/intro': (context) => const IntroScreen(),
        '/login': (context) => const LoginScreen(),
        '/auth': (context) => const LoginScreen(),
        '/home': (context) => const HomeScreen(),

        // thêm các route mới
        '/smart': (context) => const SmartScreen(),
        '/reports': (context) => const ReportsScreen(),
        '/account': (context) => const AccountScreen(),
        '/lighting': (context) => const LightningScreen(),
        '/cameras': (context) => const CameraScreen(),
        '/home-management': (context) => const HomeManagementScreen(),
      },
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
    );
  }
}
