import paho.mqtt.client as mqtt
from app.core.config import settings

# =========================
# MQTT Configuration
# =========================
MQTT_BROKER = settings.mqtt_broker
MQTT_PORT = settings.mqtt_port
MQTT_KEEPALIVE = 60

# =========================
# MQTT Callbacks (optional)
# =========================
def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print(f"[MQTT] Connected to broker {MQTT_BROKER}:{MQTT_PORT}")
    else:
        print(f"[MQTT] Connection failed with code {rc}")

def on_disconnect(client, userdata, rc):
    print("[MQTT] Disconnected")

def on_message(client, userdata, msg):
    payload = msg.payload.decode()
    print(f"[MQTT] Message received: {msg.topic} = {payload}")

# =========================
# MQTT Client
# =========================
mqtt_client = mqtt.Client()
mqtt_client.on_connect = on_connect
mqtt_client.on_disconnect = on_disconnect
mqtt_client.on_message = on_message

mqtt_client.connect(MQTT_BROKER, MQTT_PORT, MQTT_KEEPALIVE)
mqtt_client.loop_start()

# =========================
# Export as mqtt_service
# =========================
mqtt_service = mqtt_client  # <-- thêm dòng này
