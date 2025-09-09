import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/user_model.dart';
import '../../../../config/config.dart';

abstract class AuthRemoteDataSource {
  Future<UserModel> login(String email, String password);
}

class AuthRemoteDataSourceImpl implements AuthRemoteDataSource {
  final http.Client client;
  final String baseUrl;

  AuthRemoteDataSourceImpl(this.client, {required this.baseUrl});

  @override
  Future<UserModel> login(String email, String password) async {
    final uri = Uri.parse("$baseUrl/api/v1/auth/login");
    final bodyJson = jsonEncode({"email": email, "password": password});

    // ---- LOG RA CMD ----
    print("=== LOGIN REQUEST ===");
    print("POST $uri");
    print("BODY: $bodyJson");

    try {
      final response = await client.post(
        uri,
        headers: {"Content-Type": "application/json"},
        body: bodyJson,
      );

      print("=== LOGIN RESPONSE ===");
      print("STATUS: ${response.statusCode}");
      print("BODY: ${response.body}");

      if (response.statusCode == 200) {
        return UserModel.fromJson(jsonDecode(response.body));
      } else {
        throw Exception("Login failed: ${response.body}");
      }
    } catch (e, stackTrace) {
      print("=== LOGIN ERROR ===");
      print(e);
      print(stackTrace);
      rethrow; // để app vẫn nhận exception
    }
  }
}
