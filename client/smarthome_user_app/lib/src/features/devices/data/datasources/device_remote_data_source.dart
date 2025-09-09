import 'package:dio/dio.dart';
import '../../domain/entities/device.dart';

class DeviceRemoteDataSource {
  final Dio client;
  DeviceRemoteDataSource(this.client);

  Future<List<Device>> getDevices() async {
    final res = await client.get("/devices");
    final data = res.data;
    if (data is List) {
      return data.map((json) => Device.fromJson(json)).toList();
    }
    return [];
  }

  Future<Device> toggleDevice(String deviceId, bool isOn) async {
    final res = await client.patch(
      "/devices/$deviceId/toggle",
      data: {"is_on": isOn},
    );
    return Device.fromJson(res.data);
  }
}
