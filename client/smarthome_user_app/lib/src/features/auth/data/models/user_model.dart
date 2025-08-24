import '../../domain/entities/user.dart';

class UserModel extends User {
  UserModel({
    required String id,
    required String email,
    required String name,
    String? avatar,
  }) : super(id: id, email: email, name: name, avatar: avatar);

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'],
      email: json['email'],
      name: json['name'],
      avatar: json['avatar'],
    );
  }
}
