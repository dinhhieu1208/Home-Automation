import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Smart Home',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(primarySwatch: Colors.blue),
      home: HomeManagementScreen(),
    );
  }
}

class HomeManagementScreen extends StatefulWidget {
  const HomeManagementScreen({super.key});

  @override
  State<HomeManagementScreen> createState() => _HomeManagementScreenState();
}

class _HomeManagementScreenState extends State<HomeManagementScreen> {
  String homeName = "My Home";
  List<String> rooms = ["Living Room", "Bedroom", "Kitchen"];
  List<String> devices = ["Light", "Fan", "TV"];
  List<Map<String, String?>> members = [
    {
      "name": "Hiếu Trương Trọng",
      "role": "Owner",
      "email": "tronghieutruonghp@gmail.com"
    },
    {
      "name": "Nguyễn Hồng Loan",
      "role": "Admin",
      "email": "Loannguyen@gmail.com"
    },
    {
      "name": "Đặng Hồng Phương Linh",
      "role": "Member",
      "email": "LinhDang@gmai.com"
    },
  ];

  void _editHomeName() async {
    TextEditingController controller = TextEditingController(text: homeName);
    String? newName = await showDialog<String>(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Edit Home Name'),
        content: TextField(
            controller: controller,
            decoration: InputDecoration(hintText: "Enter home name")),
        actions: [
          TextButton(
              onPressed: () => Navigator.pop(context), child: Text('Cancel')),
          TextButton(
              onPressed: () => Navigator.pop(context, controller.text),
              child: Text('Save')),
        ],
      ),
    );
    if (newName != null && newName.isNotEmpty) {
      setState(() {
        homeName = newName;
      });
    }
  }

  void _manageRooms() async {
    await Navigator.push(
        context,
        MaterialPageRoute(
            builder: (context) => RoomManagementScreen(rooms: rooms)));
    setState(() {});
  }

  void _manageDevices() async {
    await Navigator.push(
        context,
        MaterialPageRoute(
            builder: (context) => DeviceManagementScreen(devices: devices)));
    setState(() {});
  }

  void _addMember() {
    TextEditingController nameController = TextEditingController();
    TextEditingController emailController = TextEditingController();
    TextEditingController roleController = TextEditingController();
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Add Member'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
                controller: nameController,
                decoration: InputDecoration(hintText: "Name")),
            TextField(
                controller: emailController,
                decoration: InputDecoration(hintText: "Email")),
            TextField(
                controller: roleController,
                decoration: InputDecoration(hintText: "Role")),
          ],
        ),
        actions: [
          TextButton(
              onPressed: () => Navigator.pop(context), child: Text('Cancel')),
          TextButton(
            onPressed: () {
              if (nameController.text.isNotEmpty) {
                setState(() {
                  members.add({
                    "name": nameController.text,
                    "email": emailController.text,
                    "role": roleController.text
                  });
                });
                Navigator.pop(context);
              }
            },
            child: Text('Add'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
          title: Text(homeName),
          leading: BackButton(),
          actions: [Icon(Icons.more_vert)]),
      body: ListView(
        padding: EdgeInsets.all(16),
        children: [
          Card(
            color: const Color.fromARGB(255, 255, 255, 255),
            child: Column(
              children: [
                ListTile(
                  title: Text('Home Name'),
                  subtitle: Text(homeName),
                  trailing: Icon(Icons.chevron_right),
                  onTap: _editHomeName,
                ),
              ],
            ),
          ),
          SizedBox(height: 8),
          Card(
            color: const Color.fromARGB(255, 255, 255, 255),
            child: Column(
              children: [
                ListTile(
                  title: Text('Room Management'),
                  subtitle: Text('${rooms.length} Room(s)'),
                  trailing: Icon(Icons.chevron_right),
                  onTap: _manageRooms,
                ),
              ],
            ),
          ),
          SizedBox(height: 8),
          Card(
            color: const Color.fromARGB(255, 255, 255, 255),
            child: Column(
              children: [
                ListTile(
                  title: Text('Device Management'),
                  subtitle: Text('${devices.length} Device(s)'),
                  trailing: Icon(Icons.chevron_right),
                  onTap: _manageDevices,
                ),
              ],
            ),
          ),
          SizedBox(height: 16),
          Card(
            color: const Color.fromARGB(255, 255, 255, 255),
            child: Column(
              children: [
                ListTile(
                  title: Text('Home Members (${members.length})',
                      style: TextStyle(fontWeight: FontWeight.bold)),
                  trailing: GestureDetector(
                    onTap: _addMember,
                    child: Container(
                      decoration: BoxDecoration(
                        color: Colors.blue,
                        shape: BoxShape.circle,
                        boxShadow: [
                          BoxShadow(
                            color: Colors.grey.withOpacity(0.5),
                            spreadRadius: 1,
                            blurRadius: 5,
                            offset: Offset(0, 2),
                          ),
                        ],
                      ),
                      padding: EdgeInsets.all(8),
                      child: Icon(Icons.add, color: Colors.white, size: 24),
                    ),
                  ),
                ),
                ...List.generate(members.length, (index) {
                  final m = members[index];
                  final name = (m['name'] ?? '').trim();
                  final email = (m['email'] ?? '').trim();
                  final role = (m['role'] ?? '').trim();
                  final avatarChar = name.isNotEmpty ? name[0] : '?';
                  return Column(
                    children: [
                      ListTile(
                        leading: CircleAvatar(child: Text(avatarChar)),
                        title: Text(name.isNotEmpty ? name : 'Unknown'),
                        subtitle: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(role, style: TextStyle(fontSize: 14)),
                            SizedBox(height: 4),
                            Text(email, style: TextStyle(fontSize: 12)),
                          ],
                        ),
                        isThreeLine: true,
                      ),
                      if (index < members.length - 1)
                        Divider(
                          color: Colors.grey.shade400,
                          thickness: 0.8,
                          height: 0,
                          indent: 72,
                          endIndent: 16,
                        ),
                    ],
                  );
                }),
              ],
            ),
          ),
          SizedBox(height: 16),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color.fromARGB(255, 255, 255, 255),
              foregroundColor: Colors.red,
              side: BorderSide(color: Colors.red),
            ),
            onPressed: () {},
            child: Text('Leave Home'),
          ),
        ],
      ),
    );
  }
}

class RoomManagementScreen extends StatefulWidget {
  final List<String> rooms;
  RoomManagementScreen({required this.rooms});

  @override
  _RoomManagementScreenState createState() => _RoomManagementScreenState();
}

class _RoomManagementScreenState extends State<RoomManagementScreen> {
  void _addRoom() {
    TextEditingController controller = TextEditingController();
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Add Room'),
        content: TextField(
            controller: controller,
            decoration: InputDecoration(hintText: "Room name")),
        actions: [
          TextButton(
              onPressed: () => Navigator.pop(context), child: Text('Cancel')),
          TextButton(
            onPressed: () {
              if (controller.text.isNotEmpty) {
                setState(() {
                  widget.rooms.add(controller.text);
                });
                Navigator.pop(context);
              }
            },
            child: Text('Add'),
          ),
        ],
      ),
    );
  }

  void _removeRoom(int index) {
    setState(() {
      widget.rooms.removeAt(index);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Room Management')),
      body: ListView.builder(
        itemCount: widget.rooms.length,
        itemBuilder: (context, index) {
          return ListTile(
            title: Text(widget.rooms[index]),
            trailing: IconButton(
                icon: Icon(Icons.delete), onPressed: () => _removeRoom(index)),
          );
        },
      ),
      floatingActionButton:
          FloatingActionButton(onPressed: _addRoom, child: Icon(Icons.add)),
    );
  }
}

class DeviceManagementScreen extends StatefulWidget {
  final List<String> devices;
  DeviceManagementScreen({required this.devices});

  @override
  _DeviceManagementScreenState createState() => _DeviceManagementScreenState();
}

class _DeviceManagementScreenState extends State<DeviceManagementScreen> {
  void _addDevice() {
    TextEditingController controller = TextEditingController();
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Add Device'),
        content: TextField(
            controller: controller,
            decoration: InputDecoration(hintText: "Device name")),
        actions: [
          TextButton(
              onPressed: () => Navigator.pop(context), child: Text('Cancel')),
          TextButton(
            onPressed: () {
              if (controller.text.isNotEmpty) {
                setState(() {
                  widget.devices.add(controller.text);
                });
                Navigator.pop(context);
              }
            },
            child: Text('Add'),
          ),
        ],
      ),
    );
  }

  void _removeDevice(int index) {
    setState(() {
      widget.devices.removeAt(index);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Device Management')),
      body: ListView.builder(
        itemCount: widget.devices.length,
        itemBuilder: (context, index) {
          return ListTile(
            title: Text(widget.devices[index]),
            trailing: IconButton(
                icon: Icon(Icons.delete),
                onPressed: () => _removeDevice(index)),
          );
        },
      ),
      floatingActionButton:
          FloatingActionButton(onPressed: _addDevice, child: Icon(Icons.add)),
    );
  }
}
