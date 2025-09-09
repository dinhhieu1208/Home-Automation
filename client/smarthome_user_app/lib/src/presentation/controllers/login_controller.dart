import 'package:flutter/material.dart';
import '../../features/auth/domain/usecases/login_usecase.dart';
import '../../features/auth/domain/entities/user.dart';

class LoginController with ChangeNotifier {
  final LoginUseCase loginUseCase;

  LoginController(this.loginUseCase);

  bool isLoading = false;
  String? errorMessage;
  User? currentUser;

  Future<void> login(
      String email, String password, BuildContext context) async {
    isLoading = true;
    errorMessage = null;
    notifyListeners();

    try {
      final user = await loginUseCase(email, password);

      if (user.token.isNotEmpty) {
        currentUser = user;
        Navigator.pushReplacementNamed(context, "/home");
      } else {
        errorMessage = "Login failed: invalid response from server";
      }
    } catch (e) {
      errorMessage = "Login failed: $e";
    } finally {
      isLoading = false;
      notifyListeners();
    }
  }
}
