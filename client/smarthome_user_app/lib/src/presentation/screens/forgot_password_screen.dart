import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../controllers/login_controller.dart';

class ForgotPasswordScreen extends StatelessWidget {
  final emailController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    final controller = Get.find<LoginController>();

    return Scaffold(
      appBar: AppBar(title: Text("Quên mật khẩu")),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            TextField(
              controller: emailController,
              decoration: InputDecoration(labelText: "Email"),
            ),
            ElevatedButton(
              onPressed: () {
                controller.loginUsecase.repository.sendPasswordResetEmail(
                  emailController.text.trim(),
                );
                Get.snackbar("Thành công", "Email reset mật khẩu đã được gửi.");
              },
              child: Text("Gửi email"),
            ),
          ],
        ),
      ),
    );
  }
}
