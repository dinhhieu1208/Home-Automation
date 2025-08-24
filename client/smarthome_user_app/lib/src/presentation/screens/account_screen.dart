import 'package:flutter/material.dart';
import '../../routes/route_names.dart';

class AccountScreen extends StatelessWidget {
  const AccountScreen({super.key});

  final List<Map<String, dynamic>> generalItems = const [
    {
      'icon': Icons.home_outlined,
      'title': 'My Home',
      'route': RouteNames.homeManagement
    },
    {'icon': Icons.mic_none_outlined, 'title': 'Voice Assistants'},
    {'icon': Icons.notifications_none_outlined, 'title': 'Notifications'},
    {'icon': Icons.security_outlined, 'title': 'Account & Security'},
    {'icon': Icons.devices_other_outlined, 'title': 'Smart Devices'},
    {'icon': Icons.view_module_outlined, 'title': 'Device Groups'},
    {'icon': Icons.meeting_room_outlined, 'title': 'Room Management'},
  ];

  final List<Map<String, dynamic>> supportItems = const [
    {'icon': Icons.analytics_outlined, 'title': 'Data & Analytics'},
    {'icon': Icons.help_outline, 'title': 'Help & Support'},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('My Home',
            style: TextStyle(fontWeight: FontWeight.bold)),
        centerTitle: false,
        actions: [
          IconButton(onPressed: () {}, icon: const Icon(Icons.fullscreen)),
          IconButton(onPressed: () {}, icon: const Icon(Icons.more_vert)),
        ],
      ),
      body: ListView(
        children: [
          ListTile(
            leading: const CircleAvatar(
              backgroundImage: AssetImage('lib/src/assets/images/profile.png'),
              radius: 24,
            ),
            title: const Text('Hiếu Trương Trọng',
                style: TextStyle(fontWeight: FontWeight.bold)),
            subtitle: const Text('tronghieutruonghp@gmail.com'),
            trailing: const Icon(Icons.chevron_right),
            onTap: () {},
          ),
          _buildSectionHeader('General'),
          ...generalItems.map((item) => _buildListItem(context, item)),
          _buildSectionHeader('Support'),
          ...supportItems.map((item) => _buildListItem(context, item)),
          ListTile(
            leading: const Icon(Icons.logout, color: Colors.red),
            title: const Text('Logout', style: TextStyle(color: Colors.red)),
            onTap: () {},
          ),
        ],
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: 3,
        backgroundColor: Colors.white,
        selectedItemColor: Colors.blue,
        unselectedItemColor: Colors.grey,
        type: BottomNavigationBarType.fixed,
        onTap: (index) {
          // xử lý tap nếu cần
        },
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
          BottomNavigationBarItem(
              icon: Icon(Icons.smart_toy_outlined), label: 'Smart'),
          BottomNavigationBarItem(
              icon: Icon(Icons.insert_chart_outlined), label: 'Reports'),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Account'),
        ],
      ),
    );
  }

  Widget _buildSectionHeader(String title) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: Text(
        title,
        style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.grey),
      ),
    );
  }

  Widget _buildListItem(BuildContext context, Map<String, dynamic> item) {
    return ListTile(
      leading: Icon(item['icon']),
      title: Text(item['title']),
      trailing: const Icon(Icons.chevron_right),
      onTap: () {
        if (item.containsKey('route')) {
          Navigator.pushNamed(context, item['route']);
        } else {
          // xử lý item khác
        }
      },
    );
  }
}
