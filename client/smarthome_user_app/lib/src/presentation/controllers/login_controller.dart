import 'package:get/get.dart';
import '../../features/auth/domain/usecases/login_usecase.dart';
import '../../features/auth/domain/entities/user.dart';
import '../../routes/route_names.dart';

class LoginController extends GetxController {
  final LoginUsecase loginUsecase;

  var isLoading = false.obs;
  var errorMessage = ''.obs;
  var currentUser = Rx<User?>(null);

  LoginController({required this.loginUsecase});

  Future<void> login(String email, String password) async {
    try {
      isLoading.value = true;
      errorMessage.value = '';
      final user = await loginUsecase(email, password);
      currentUser.value = user;
      Get.offAllNamed(RouteNames.home);
    } catch (e) {
      errorMessage.value = e.toString();
    } finally {
      isLoading.value = false;
    }
  }

  void logout() {
    currentUser.value = null;
    Get.offAllNamed(RouteNames.home);
  }
}
