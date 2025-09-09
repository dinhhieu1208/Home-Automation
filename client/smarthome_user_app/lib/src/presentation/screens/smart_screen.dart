import 'package:flutter/material.dart';

class SmartScreen extends StatelessWidget {
  const SmartScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () async {
        Navigator.pushReplacementNamed(context, '/home');
        return false;
      },
      child: Scaffold(
        appBar: AppBar(title: const Text('Smart Screen')),
        body: const Center(child: Text('Smart Screen Content')),
      ),
    );
  }
}
