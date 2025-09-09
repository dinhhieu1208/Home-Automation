import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../../config/config.dart';

class DeviceController extends ChangeNotifier {
  List<dynamic> devices = [];
  bool loading = false;

  Future<void> fetchDevices() async {
    loading = true;
    notifyListeners();

    try {
      final url = Uri.parse("${AppConfig.apiBaseUrl}/api/v1/devices/");
      final res = await http.get(url);
      if (res.statusCode == 200) {
        devices = json.decode(res.body) as List<dynamic>;
      } else {
        devices = [];
        throw Exception('Failed to fetch devices');
      }
    } catch (e) {
      devices = [];
      debugPrint("DeviceController.fetchDevices error: $e");
    } finally {
      loading = false;
      notifyListeners();
    }
  }

  Future<void> toggleDevice(String deviceId, bool isOn) async {
    try {
      final url = Uri.parse("${AppConfig.apiBaseUrl}/devices/$deviceId/toggle");
      final res = await http.patch(
        url,
        headers: {'Content-Type': 'application/json'},
        body: json.encode({'is_on': isOn}),
      );

      if (res.statusCode == 200) {
        // update local state
        final index =
            devices.indexWhere((d) => (d['id'] ?? d['_id']) == deviceId);
        if (index != -1) {
          devices[index]['is_on'] = isOn;
          notifyListeners();
        }
      } else {
        throw Exception('Failed to toggle device');
      }
    } catch (e) {
      debugPrint("DeviceController.toggleDevice error: $e");
    }
  }
}
