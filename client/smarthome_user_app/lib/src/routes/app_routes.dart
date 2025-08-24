import 'package:flutter/material.dart';
import 'route_names.dart';

import '../presentation/screens/intro_screen.dart';
import '../presentation/screens/login_screen.dart';
import '../presentation/screens/home_screen.dart';
//import '../presentation/screens/smart_screen.dart';
//import '../presentation/screens/reports_screen.dart';
import '../presentation/screens/account_screen.dart';
import '../presentation/screens/lightning_screen.dart';
import '../presentation/screens/cameras_screen.dart';
//import '../presentation/screens/electrical_screen.dart';
import '../presentation/screens/home_management_screen.dart';

class AppRoutes {
  static const intro = RouteNames.intro;
  static const auth = RouteNames.auth;
  static const home = RouteNames.home;
  static const smart = RouteNames.smart;
  static const reports = RouteNames.reports;
  static const account = RouteNames.account;
  static const lighting = RouteNames.lighting;
  static const cameras = RouteNames.cameras;
  static const electrical = RouteNames.electrical;

  static final routes = <String, WidgetBuilder>{
    intro: (context) => const IntroScreen(),
    auth: (context) => const LoginScreen(),
    home: (context) => const HomeScreen(),
    //smart: (context) => const SmartScreen(),
    //reports: (context) => const ReportsScreen(),
    account: (context) => const AccountScreen(),
    lighting: (context) => const LightningScreen(),
    cameras: (context) => const CameraScreen(),
    //electrical: (context) => const ElectricalScreen(),
    RouteNames.homeManagement: (context) => const HomeManagementScreen(),
  };
}
