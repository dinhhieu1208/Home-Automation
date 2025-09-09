import 'package:equatable/equatable.dart';

class DeviceModel extends Equatable {
  final String id;
  final String roomId;
  final String name;
  final String type;
  final String status;

  const DeviceModel({
    required this.id,
    required this.roomId,
    required this.name,
    required this.type,
    required this.status,
  });

  factory DeviceModel.fromJson(Map<String, dynamic> json) {
    return DeviceModel(
      id: json["id"] ?? "",
      roomId: json["roomId"] ?? "",
      name: json["name"] ?? "",
      type: json["type"] ?? "",
      status: json["status"] ?? "off",
    );
  }

  @override
  List<Object?> get props => [id, roomId, name, type, status];
}
