import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../../config/config.dart';

class RoomController extends ChangeNotifier {
  List<dynamic> rooms = [];
  Map<String, List<dynamic>> roomAccessMap = {};
  bool loading = false;

  Future<void> fetchRooms() async {
    loading = true;
    notifyListeners();

    try {
      final url = Uri.parse("${AppConfig.apiBaseUrl}/api/v1/rooms/");
      final res = await http.get(url);
      if (res.statusCode == 200) {
        rooms = json.decode(res.body) as List<dynamic>;

        // Lấy quyền truy cập cho từng room
        for (var r in rooms) {
          final rid = r['_id'] ?? r['id'] ?? '';
          if (rid.isNotEmpty) {
            await fetchRoomAccess(rid);
          }
        }
      } else {
        rooms = [];
        throw Exception('Failed to fetch rooms');
      }
    } catch (e) {
      rooms = [];
      debugPrint("RoomController.fetchRooms error: $e");
    } finally {
      loading = false;
      notifyListeners();
    }
  }

  Future<void> fetchRoomAccess(String roomId) async {
    try {
      final url = Uri.parse("${AppConfig.apiBaseUrl}/roomaccess/$roomId");
      final res = await http.get(url);
      if (res.statusCode == 200) {
        final data = json.decode(res.body) as List<dynamic>;
        roomAccessMap[roomId] = data;
        notifyListeners();
      }
    } catch (e) {
      roomAccessMap[roomId] = [];
      debugPrint("RoomController.fetchRoomAccess error: $e");
    }
  }
}
