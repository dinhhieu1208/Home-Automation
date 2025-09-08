from typing import List, Optional, Dict
from pydantic import BaseModel

class LogEntry(BaseModel):
    timestamp: str
    event: str
    deviceId: Optional[str]

class Monitoring(BaseModel):
    messages: Dict[str, int]
    logs: List[LogEntry]
    topics: Dict[str, List[str]]

class Certificate(BaseModel):
    deviceId: str
    certId: str
    valid: bool

class Project(BaseModel):
    projectId: str
    name: str
    deviceIds: List[str]
    certificates: List[Certificate]

class IoTHub(BaseModel):
    projects: List[Project]

class MQTTBroker(BaseModel):
    host: str
    port: int
    username: str
    password: str
    status: str
    uptime: str
    lastConnected: str
    useTLS: bool

class Config(BaseModel):
    mqttBroker: MQTTBroker
    apiKey: str
    useTLS: bool

class Connection(BaseModel):
    status: str
    server: str
    uptime: str
    lastConnected: str

class MongoDBCloud(BaseModel):
    uri: str
    database: str
    status: str
    lastConnected: str

class BackupSync(BaseModel):
    lastBackup: str
    autoSync: bool
    targets: List[str]

class CloudData(BaseModel):
    connection: Connection
    config: Config
    monitoring: Monitoring
    iotHub: IoTHub
    backupSync: BackupSync
    mongoDB: MongoDBCloud
