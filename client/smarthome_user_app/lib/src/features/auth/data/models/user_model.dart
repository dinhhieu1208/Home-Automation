import '../../domain/entities/user.dart';

class UserModel extends User {
  UserModel({
    required super.token,
    super.id = "",
    super.email = "",
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      token: json["access_token"], // map access_token từ server
    );
  }
}
