class User {
  final String id;
  final String email;
  final String token;

  User({
    this.id = "", // không bắt buộc
    this.email = "", // không bắt buộc
    required this.token, // bắt buộc vì server trả access_token
  });
}
