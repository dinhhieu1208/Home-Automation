import 'package:flutter/material.dart';

class DeviceCard extends StatelessWidget {
  final String deviceName;
  final String roomName;
  final String status;

  const DeviceCard({
    super.key,
    required this.deviceName,
    required this.roomName,
    required this.status,
  });

  Color _statusColor() {
    switch (status) {
      case "online":
        return Colors.green;
      case "error":
        return Colors.red;
      default:
        return Colors.grey;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: ListTile(
        leading: Icon(Icons.devices, color: _statusColor()),
        title: Text(deviceName,
            style: const TextStyle(fontWeight: FontWeight.bold)),
        subtitle: Text("Room: $roomName"),
        trailing: Text(
          status.toUpperCase(),
          style: TextStyle(
            color: _statusColor(),
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );
  }
}
