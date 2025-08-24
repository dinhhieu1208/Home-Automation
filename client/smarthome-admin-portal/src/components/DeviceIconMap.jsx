import {
  Wifi, Tv, Thermometer, Lightbulb, Wind, Power, Fan, Droplets,
  Shield, DoorClosed, Router, Camera, WashingMachine, Flame,
  Sun, Waves, CloudRain, Sprout, Heater, Blinds, AirVent, Cctv,
} from "lucide-react";

export const deviceIcons = {
  light: Lightbulb,
  tv: Tv,
  smartTV: Tv,
  wifi: Wifi,
  router: Router,
  airConditioner: AirVent,
  heater: Heater,
  smartFan: Fan,
  fan: Fan,
  airpurifier: Wind,

  humiditySensor: Thermometer,
  waterSensor: Droplets,
  gasSensor: Flame,
  motionSensor: Shield,
  lightSensor: Sun,
  rainSensor: CloudRain,
  soilMoistureSensor: Sprout,
  doorSensor: DoorClosed,

  pump: Waves,
  washingMachine: WashingMachine,
  curtain: Blinds,
  camera: Camera,
  cctv: Cctv,
};
