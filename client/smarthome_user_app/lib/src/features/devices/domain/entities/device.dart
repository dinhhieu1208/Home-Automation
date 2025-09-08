class Device {
  final String id;
  final String name;
  final String type;
  final String status;
  final String roomName; // thêm tên phòng

  Device({
    required this.id,
    required this.name,
    required this.type,
    required this.status,
    required this.roomName,
  });

  factory Device.fromJson(Map<String, dynamic> json) {
    return Device(
      id: json['id'],
      name: json['name'],
      type: json['type'],
      status: json['status'],
      roomName: json['roomName'] ?? "", // map từ API
    );
  }
}
