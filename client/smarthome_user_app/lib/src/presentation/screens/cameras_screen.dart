import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class CameraScreen extends StatefulWidget {
  const CameraScreen({super.key});

  @override
  State<CameraScreen> createState() => _CameraScreenState();
}

class _CameraScreenState extends State<CameraScreen> {
  List<Map<String, dynamic>> cameras = [
    {
      "name": "Smart Y2 CCTV",
      "location": "Living Room",
      "isOn": true,
      "image": "https://picsum.photos/id/1/200/200"
    },
    {
      "name": "Smart Y2 CCTV",
      "location": "Bedroom",
      "isOn": true,
      "image": "https://picsum.photos/id/2/200/200"
    },
    {
      "name": "Smart Y3 CCTV",
      "location": "Kitchen",
      "isOn": true,
      "image": "https://picsum.photos/id/3/200/200"
    },
    {
      "name": "Smart V1 CCTV",
      "location": "Bathroom",
      "isOn": true,
      "image": "https://picsum.photos/id/4/200/200"
    },
    {"name": "Smart Webcam", "location": "Toilet", "isOn": false, "image": ""},
    {
      "name": "Smart V1 CCTV",
      "location": "Dining Room",
      "isOn": false,
      "image": ""
    },
    {
      "name": "Smart V2 CCTV",
      "location": "Backyard",
      "isOn": false,
      "image": ""
    },
    {
      "name": "Smart V3 CCTV",
      "location": "Backyard",
      "isOn": false,
      "image": ""
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          "Cameras (${cameras.length})",
          style: GoogleFonts.poppins(fontWeight: FontWeight.w600),
        ),
        centerTitle: true,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(12),
        child: GridView.builder(
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 2,
            childAspectRatio: 1.05,
            crossAxisSpacing: 12,
            mainAxisSpacing: 12,
          ),
          itemCount: cameras.length,
          itemBuilder: (context, index) {
            return CameraCard(
              camera: cameras[index],
              onToggle: (val) {
                setState(() {
                  cameras[index]["isOn"] = val;
                });
              },
            );
          },
        ),
      ),
    );
  }
}

class CameraCard extends StatelessWidget {
  final Map<String, dynamic> camera;
  final ValueChanged<bool> onToggle;

  const CameraCard({
    super.key,
    required this.camera,
    required this.onToggle,
  });

  @override
  Widget build(BuildContext context) {
    bool hasImage = camera["image"].toString().isNotEmpty;

    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        boxShadow: [BoxShadow(color: Colors.black12, blurRadius: 4)],
      ),
      clipBehavior: Clip.hardEdge,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          hasImage
              ? Stack(
                  children: [
                    Image.network(
                      camera["image"],
                      height: 80,
                      width: double.infinity,
                      fit: BoxFit.cover,
                    ),
                    Positioned(
                      left: 8,
                      top: 8,
                      child: Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 6, vertical: 2),
                        decoration: BoxDecoration(
                          color: camera["isOn"] ? Colors.red : Colors.grey,
                          borderRadius: BorderRadius.circular(4),
                        ),
                        child: Text(
                          camera["isOn"] ? "Live" : "Offline",
                          style: const TextStyle(
                              color: Colors.white, fontSize: 10),
                        ),
                      ),
                    ),
                    Positioned(
                      right: 8,
                      top: 8,
                      child: Switch(
                        value: camera["isOn"],
                        activeColor: Colors.blue,
                        onChanged: onToggle,
                      ),
                    ),
                  ],
                )
              : Container(
                  height: 80,
                  color: Colors.grey[200],
                  child: Center(
                    child: Icon(Icons.videocam_off,
                        size: 30, color: Colors.grey[500]),
                  ),
                ),
          Padding(
            padding: const EdgeInsets.all(8),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  camera["name"],
                  style: GoogleFonts.poppins(fontWeight: FontWeight.bold),
                ),
                Text(
                  camera["location"],
                  style: GoogleFonts.poppins(color: Colors.grey, fontSize: 12),
                ),
                const SizedBox(height: 4),
                const Row(
                  children: [
                    Icon(Icons.wifi, size: 16, color: Colors.grey),
                    SizedBox(width: 4),
                    Text("Wi-Fi",
                        style: TextStyle(color: Colors.grey, fontSize: 12)),
                  ],
                )
              ],
            ),
          )
        ],
      ),
    );
  }
}
