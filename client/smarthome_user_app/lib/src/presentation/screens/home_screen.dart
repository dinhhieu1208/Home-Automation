import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:provider/provider.dart';
import '../../routes/route_names.dart';

import '../controllers/device_controller.dart';
import '../controllers/room_controller.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  String selectedRoom = 'All';
  int _currentIndex = 0;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final deviceCtrl = context.read<DeviceController>();
      final roomCtrl = context.read<RoomController>();
      deviceCtrl.fetchDevices();
      roomCtrl.fetchRooms();
    });
  }

  bool isDeviceOn(Map<String, dynamic> device) {
    final s = device['is_on'] ?? device['isOn'] ?? device['status'];
    if (s is bool) return s;
    if (s is String) return s.toLowerCase() == 'on';
    if (s is num) return s == 1;
    return false;
  }

  @override
  Widget build(BuildContext context) {
    final deviceCtrl = context.watch<DeviceController>();
    final roomCtrl = context.watch<RoomController>();

    // Map roomId => roomName
    final roomsMap = {
      for (var r in roomCtrl.rooms)
        (r['_id'] ?? r['id'] ?? ''): (r['name'] ?? r['roomName'] ?? '')
    };

    // Tạo map roomName => count thiết bị
    final deviceCountMap = <String, int>{};
    for (var d in deviceCtrl.devices) {
      final rid = d['room_id'] ?? d['roomId'] ?? '';
      final roomName = roomsMap[rid] ?? '';
      deviceCountMap[roomName] = (deviceCountMap[roomName] ?? 0) + 1;
    }

    // Tabs với số lượng thiết bị
    final roomTabs = ['All', ...roomsMap.values];

    // Filter thiết bị theo phòng
    final filteredDevices = selectedRoom == 'All'
        ? deviceCtrl.devices
        : deviceCtrl.devices.where((d) {
            final rid = d['room_id'] ?? d['roomId'] ?? '';
            final roomName = roomsMap[rid] ?? '';
            return roomName == selectedRoom;
          }).toList();

    final loading = deviceCtrl.loading || roomCtrl.loading;

    return Scaffold(
      backgroundColor: Colors.grey[100],
      body: SafeArea(
        child: loading
            ? const Center(child: CircularProgressIndicator(color: Colors.blue))
            : Column(
                children: [
                  _buildTopBar(),
                  const SizedBox(height: 12),
                  _buildWeatherCard(),
                  const SizedBox(height: 12),
                  _buildFeatureList(),
                  const SizedBox(height: 12),
                  _buildRoomTabs(roomTabs, deviceCountMap),
                  const SizedBox(height: 12),
                  // Expanded để GridView scroll bình thường
                  Expanded(
                    child: _buildDeviceGrid(
                        filteredDevices, roomsMap, roomCtrl.roomAccessMap),
                  ),
                ],
              ),
      ),
      bottomNavigationBar: _buildBottomNav(),
    );
  }

  Widget _buildTopBar() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text("My Home",
                  style: GoogleFonts.poppins(
                      fontSize: 20, fontWeight: FontWeight.bold)),
              Row(
                children: [
                  Text("Ho Chi Minh City, VN",
                      style: GoogleFonts.poppins(fontSize: 14)),
                  const Icon(Icons.keyboard_arrow_down)
                ],
              ),
            ],
          ),
          Row(
            children: [
              IconButton(
                icon: const Icon(Icons.smart_toy_outlined),
                onPressed: () => Navigator.pushNamed(context, '/smart'),
              ),
              IconButton(
                  icon: const Icon(Icons.notifications_none), onPressed: () {}),
            ],
          )
        ],
      ),
    );
  }

  Widget _buildWeatherCard() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.blue[400],
        borderRadius: BorderRadius.circular(16),
      ),
      child: Row(
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text("20°C",
                  style:
                      GoogleFonts.poppins(fontSize: 28, color: Colors.white)),
              Text("Today Cloudy",
                  style:
                      GoogleFonts.poppins(fontSize: 14, color: Colors.white)),
              const SizedBox(height: 8),
              Text("AQI 92   78%   2.0 m/s",
                  style:
                      GoogleFonts.poppins(fontSize: 12, color: Colors.white70)),
            ],
          ),
          const Spacer(),
          Image.asset("lib/src/assets/images/cloud.png", height: 60),
        ],
      ),
    );
  }

  Widget _buildFeatureList() {
    final features = [
      {
        "icon": Icons.lightbulb_outline,
        "title": "Lighting",
        "subtitle": "12 lights",
        "color": Colors.orange,
        "route": "/lighting"
      },
      {
        "icon": Icons.videocam_outlined,
        "title": "Cameras",
        "subtitle": "8 cameras",
        "color": Colors.purple,
        "route": "/cameras"
      },
      {
        "icon": Icons.electrical_services,
        "title": "Electrical",
        "subtitle": "6 devices",
        "color": Colors.red,
        "route": "/electrical"
      },
    ];

    return SizedBox(
      height: 100,
      child: ListView.separated(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 16),
        itemCount: features.length,
        separatorBuilder: (_, __) => const SizedBox(width: 12),
        itemBuilder: (_, index) {
          final f = features[index];
          return GestureDetector(
            onTap: () => Navigator.pushNamed(context, f["route"] as String),
            child: _buildFeatureCard(
                f["icon"] as IconData,
                f["title"] as String,
                f["subtitle"] as String,
                f["color"] as Color),
          );
        },
      ),
    );
  }

  Widget _buildFeatureCard(
      IconData icon, String title, String subtitle, Color color) {
    return Container(
      width: 120,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, color: color, size: 28),
          const Spacer(),
          Text(title, style: GoogleFonts.poppins(fontWeight: FontWeight.bold)),
          Text(subtitle,
              style: GoogleFonts.poppins(fontSize: 12, color: Colors.grey)),
        ],
      ),
    );
  }

  Widget _buildRoomTabs(
      List<dynamic> roomTabs, Map<String, int> deviceCountMap) {
    return SizedBox(
      height: 50,
      child: ListView.separated(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 16),
        itemBuilder: (_, index) {
          final r = roomTabs[index].toString();
          final selected = r == selectedRoom;
          final displayLabel = r == 'All'
              ? r
              : '$r (${deviceCountMap[r] ?? 0})'; // show số lượng thiết bị
          return GestureDetector(
            onTap: () => setState(() => selectedRoom = r),
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
              decoration: BoxDecoration(
                color: selected ? Colors.blue : Colors.grey[200],
                borderRadius: BorderRadius.circular(20),
              ),
              child: Center(
                  child: Text(displayLabel,
                      style: GoogleFonts.poppins(
                          color: selected ? Colors.white : Colors.black,
                          fontSize: 12))),
            ),
          );
        },
        separatorBuilder: (_, __) => const SizedBox(width: 8),
        itemCount: roomTabs.length,
      ),
    );
  }

  Widget _buildDeviceGrid(List<dynamic> devices, Map<dynamic, dynamic> roomsMap,
      Map<dynamic, dynamic> roomAccessMap) {
    return GridView.builder(
      padding: const EdgeInsets.all(8),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          mainAxisSpacing: 12,
          crossAxisSpacing: 12,
          childAspectRatio: 1.1),
      itemCount: devices.length,
      itemBuilder: (_, index) {
        final d = devices[index] as Map<String, dynamic>;
        final isOn = isDeviceOn(d);
        final roomKey = d['room_id'] ?? d['roomId'] ?? '';
        final roomDisplay = roomsMap[roomKey] ?? '-';
        final members = roomAccessMap[roomKey] ?? [];

        return Container(
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(
              color: Colors.white, borderRadius: BorderRadius.circular(16)),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Align(
                alignment: Alignment.topRight,
                child: SizedBox(
                  height: 24,
                  width: 40,
                  child: Switch(
                      value: isOn, onChanged: (_) {}, activeColor: Colors.blue),
                ),
              ),
              Expanded(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(_getDeviceIcon(d['type']),
                        size: 36, color: Colors.blue),
                    const SizedBox(height: 6),
                    Text(d['name'] ?? d['label'] ?? '-',
                        style: GoogleFonts.poppins(
                            fontWeight: FontWeight.bold, fontSize: 14)),
                    Text(roomDisplay,
                        style: GoogleFonts.poppins(
                            fontSize: 10, color: Colors.grey)),
                    const SizedBox(height: 4),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: (members as List<dynamic>).take(3).map((m) {
                        final avatar = m['avatar'] ?? '';
                        return Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 2),
                          child: CircleAvatar(
                            radius: 10,
                            backgroundImage:
                                avatar.isNotEmpty ? NetworkImage(avatar) : null,
                            backgroundColor: Colors.grey[300],
                          ),
                        );
                      }).toList(),
                    )
                  ],
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  IconData _getDeviceIcon(String? type) {
    switch (type?.toLowerCase()) {
      case 'light':
        return Icons.lightbulb_outline;
      case 'fan':
      case 'smartfan':
      case 'ceilingfan':
        return FontAwesomeIcons.fan;
      case 'ac':
      case 'airconditioner':
        return Icons.ac_unit;
      case 'heater':
        return Icons.thermostat;
      case 'curtain':
        return Icons.blinds_closed;
      case 'tv':
      case 'smarttv':
        return Icons.tv;
      case 'camera':
        return Icons.videocam;
      case 'gasSensor':
        return Icons.warning_amber_rounded;
      case 'waterSensor':
        return Icons.water_drop_outlined;
      case 'humiditySensor':
        return Icons.opacity;
      case 'soilMoistureSensor':
        return Icons.grass;
      case 'rainSensor':
        return Icons.umbrella;
      case 'motionSensor':
        return Icons.motion_photos_on;
      case 'lightSensor':
        return Icons.light_mode;
      case 'vibrationSensor':
        return Icons.vibration;
      case 'doorSensor':
        return Icons.sensor_door;
      case 'doorbell':
        return Icons.doorbell;
      case 'pump':
        return Icons.local_drink;
      case 'dehumidifier':
        return Icons.ac_unit;
      case 'mistMaker':
        return Icons.cloud;
      case 'washingMachine':
      case 'wm':
        return Icons.local_laundry_service;
      case 'router':
        return Icons.router;
      default:
        return Icons.device_unknown;
    }
  }

  Widget _buildBottomNav() {
    return BottomNavigationBar(
      type: BottomNavigationBarType.fixed,
      selectedItemColor: Colors.blue,
      unselectedItemColor: Colors.grey,
      currentIndex: _currentIndex,
      onTap: (index) {
        setState(() => _currentIndex = index);

        String routeName;
        switch (index) {
          case 0:
            routeName = RouteNames.home;
            break;
          case 1:
            routeName = RouteNames.smart;
            break;
          case 2:
            routeName = RouteNames.reports;
            break;
          case 3:
            routeName = RouteNames.account;
            break;
          default:
            routeName = RouteNames.home;
        }

        if (ModalRoute.of(context)?.settings.name != routeName) {
          Navigator.pushReplacementNamed(context, routeName);
        }
      },
      items: const [
        BottomNavigationBarItem(icon: Icon(Icons.home), label: "Home"),
        BottomNavigationBarItem(
            icon: Icon(Icons.smart_toy_outlined), label: "Smart"),
        BottomNavigationBarItem(
            icon: Icon(Icons.insert_chart_outlined), label: "Reports"),
        BottomNavigationBarItem(
            icon: Icon(Icons.person_outline), label: "Account"),
      ],
    );
  }
}
