import 'package:flutter/material.dart';

class LightningScreen extends StatefulWidget {
  const LightningScreen({super.key});

  @override
  State<LightningScreen> createState() => _LightningScreenState();
}

class _LightningScreenState extends State<LightningScreen> {
  List<Map<String, dynamic>> lights = [
    {"name": "Smart Lamp", "location": "Living Room", "isOn": true},
    {"name": "Lamp", "location": "Bedroom", "isOn": true},
    {"name": "Smart Lamp", "location": "Bedroom", "isOn": false},
    {"name": "Smart Lamp", "location": "Kitchen", "isOn": false},
    {"name": "Lamp", "location": "Bathroom", "isOn": true},
    {"name": "Smart Lamp", "location": "Dining Room", "isOn": false},
    {"name": "Smart Lamp", "location": "Toilet", "isOn": true},
    {"name": "Lamp", "location": "Backyard", "isOn": true},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Lightning (${lights.length})"),
        leading: const Icon(Icons.arrow_back_ios),
        actions: const [Icon(Icons.more_vert)],
      ),
      body: Padding(
        padding: const EdgeInsets.all(12),
        child: GridView.builder(
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 2,
            childAspectRatio: 1.1,
            crossAxisSpacing: 12,
            mainAxisSpacing: 12,
          ),
          itemCount: lights.length,
          itemBuilder: (context, index) {
            var item = lights[index];
            return Container(
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(12),
              ),
              padding: const EdgeInsets.all(12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Icon(Icons.lightbulb_outline, size: 36),
                      Switch(
                        value: item["isOn"],
                        activeColor: Colors.blue,
                        onChanged: (val) {
                          setState(() {
                            item["isOn"] = val;
                          });
                        },
                      )
                    ],
                  ),
                  const SizedBox(height: 8),
                  Text(item["name"],
                      style: const TextStyle(fontWeight: FontWeight.bold)),
                  Text(item["location"],
                      style: const TextStyle(color: Colors.grey)),
                  const Spacer(),
                  const Row(
                    children: [
                      Icon(Icons.wifi, size: 16, color: Colors.grey),
                      SizedBox(width: 4),
                      Text("Wi-Fi", style: TextStyle(color: Colors.grey)),
                    ],
                  )
                ],
              ),
            );
          },
        ),
      ),
    );
  }
}
