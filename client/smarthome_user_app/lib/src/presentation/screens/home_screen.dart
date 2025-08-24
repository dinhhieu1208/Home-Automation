import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final Map<String, Map<String, dynamic>> devices = {
    "Ceiling Light": {
      "isOn": true,
      "icon": Icons.lightbulb_outline,
      "type": "Wi-Fi"
    },
    "Living Room CCTV": {"isOn": true, "icon": Icons.videocam, "type": "Wi-Fi"},
    "Fan": {"isOn": true, "icon": FontAwesomeIcons.fan, "type": "Wi-Fi"},
    "Curtain": {"isOn": true, "icon": Icons.blinds_closed, "type": "Motor"},
    "Air Conditioner": {
      "isOn": true,
      "icon": Icons.ac_unit,
      "type": "Bluetooth"
    },
    "Washing Machine": {
      "isOn": false,
      "icon": Icons.local_laundry_service,
      "type": "Wi-Fi"
    },
    "Camera": {"isOn": true, "icon": Icons.camera_alt, "type": "Wi-Fi"},
  };

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[100],
      body: SafeArea(
        child: Column(
          children: [
            _buildTopBar(),
            _buildWeatherCard(),
            _buildFeatureList(),
            _buildRoomTabs(),
            Expanded(child: _buildDeviceGrid()),
          ],
        ),
      ),
      bottomNavigationBar: _buildBottomNav(),
    );
  }

  Widget _buildTopBar() {
    return Padding(
      padding: const EdgeInsets.all(16),
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

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 15),
      child: SizedBox(
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

  Widget _buildRoomTabs() {
    final rooms = [
      "All Rooms (37)",
      "Living Room (8)",
      "Bedroom (6)",
      "Kitchen (6)",
      "Bathroom (6)",
      "Drying Yard / Outdoor Area(6)",
      "Garden / Balcony (6)",
      "Storage Room / Garage (6)",
      "Toilet (6)"
    ];

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: Row(
          children: rooms.map((r) {
            final selected = r == rooms[0];
            return Padding(
              padding: const EdgeInsets.only(right: 8),
              child: _buildTab(r, selected),
            );
          }).toList(),
        ),
      ),
    );
  }

  Widget _buildTab(String label, bool selected) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: selected ? Colors.blue : Colors.grey[200],
        borderRadius: BorderRadius.circular(20),
      ),
      child: Text(
        label,
        style: GoogleFonts.poppins(
            color: selected ? Colors.white : Colors.black, fontSize: 12),
      ),
    );
  }

  Widget _buildDeviceGrid() {
    return GridView.count(
      padding: const EdgeInsets.all(8),
      crossAxisCount: 2,
      crossAxisSpacing: 12,
      mainAxisSpacing: 12,
      children: devices.entries.map((entry) {
        final name = entry.key;
        final info = entry.value;
        return _buildDeviceCard(name, info["type"], info["icon"], info["isOn"]);
      }).toList(),
    );
  }

  Widget _buildDeviceCard(String name, String type, IconData icon, bool isOn) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Align(
            alignment: Alignment.topRight,
            child: Switch(
              value: isOn,
              onChanged: (val) => setState(() => devices[name]!["isOn"] = val),
              activeColor: Colors.blue,
            ),
          ),
          Expanded(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(icon, size: 40, color: Colors.blue),
                const SizedBox(height: 8),
                Text(name,
                    style: GoogleFonts.poppins(fontWeight: FontWeight.bold)),
                Text(type,
                    style:
                        GoogleFonts.poppins(fontSize: 12, color: Colors.grey)),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBottomNav() {
    return BottomNavigationBar(
      type: BottomNavigationBarType.fixed,
      selectedItemColor: Colors.blue,
      unselectedItemColor: Colors.grey,
      backgroundColor: const Color.fromARGB(255, 255, 255, 255),
      currentIndex: 0,
      onTap: (index) {
        switch (index) {
          case 1:
            Navigator.pushNamed(context, '/smart');
            break;
          case 2:
            Navigator.pushNamed(context, '/reports');
            break;
          case 3:
            Navigator.pushNamed(context, '/account');
            break;
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
