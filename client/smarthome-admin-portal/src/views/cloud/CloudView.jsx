import React, { useEffect, useState } from "react";
import { getCloudData } from "../../services/cloudService";
import { FaServer, FaDatabase, FaWifi, FaBolt, FaKey } from "react-icons/fa";

export default function CloudDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showApiKey, setShowApiKey] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getCloudData();
      setData(res);
    } catch {
      setError("Failed to load cloud data");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (d) => (d ? new Date(d).toLocaleString() : "-");

  if (loading) return <div className="p-6 text-center text-gray-500">Loading cloud data...</div>;
  if (error)
    return (
      <div className="p-6 text-center text-red-500">
        {error} <button onClick={fetchData} className="ml-2 underline">Retry</button>
      </div>
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Cloud Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <div className="flex items-center gap-3 mb-3 text-indigo-600 font-semibold text-lg">
            <FaServer /> MQTT Broker
          </div>
          <div className="space-y-1 text-gray-700 text-sm">
            <div><span className="font-medium">Host:</span> {data.config.mqttBroker.host}</div>
            <div><span className="font-medium">Port:</span> {data.config.mqttBroker.port}</div>
            <div><span className="font-medium">Username:</span> {data.config.mqttBroker.username}</div>
            <div><span className="font-medium">TLS:</span> {data.config.useTLS ? "Enabled" : "Disabled"}</div>
            <div><span className="font-medium">Status:</span> {data.connection.status}</div>
            <div><span className="font-medium">Uptime:</span> {formatDate(data.connection.uptime)}</div>
            <div><span className="font-medium">Last Connected:</span> {formatDate(data.connection.lastConnected)}</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <div className="flex items-center gap-3 mb-3 text-green-600 font-semibold text-lg">
            <FaDatabase /> MongoDB
          </div>
          <div className="space-y-1 text-gray-700 text-sm">
            <div><span className="font-medium">URI:</span> {data.mongoDB.uri}</div>
            <div><span className="font-medium">Database:</span> {data.mongoDB.database}</div>
            <div><span className="font-medium">Status:</span> {data.mongoDB.status}</div>
            <div><span className="font-medium">Last Connected:</span> {formatDate(data.mongoDB.lastConnected)}</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <div className="flex items-center gap-3 mb-3 text-yellow-600 font-semibold text-lg">
            <FaWifi /> Monitoring
          </div>
          <div className="space-y-1 text-gray-700 text-sm">
            <div><span className="font-medium">Sent:</span> {data.monitoring.messages.sent}</div>
            <div><span className="font-medium">Received:</span> {data.monitoring.messages.received}</div>
            <div>
              <span className="font-medium">Logs:</span>
              <ul className="mt-1 text-xs max-h-32 overflow-auto list-disc pl-4 space-y-1 text-gray-600">
                {(data.monitoring.logs || []).length > 0
                  ? data.monitoring.logs.map((log, i) => (
                      <li key={i}>
                        [{formatDate(log.timestamp)}] {log.event} {log.deviceId ? `— ${log.deviceId}` : ""}
                      </li>
                    ))
                  : <li>No logs</li>}
              </ul>
            </div>
            <div><span className="font-medium">Subscribed:</span> {(data.monitoring.topics.subscribed || []).join(", ") || "-"}</div>
            <div><span className="font-medium">Published:</span> {(data.monitoring.topics.published || []).join(", ") || "-"}</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition col-span-1 md:col-span-2">
          <div className="flex items-center gap-3 mb-3 text-purple-600 font-semibold text-lg">
            <FaBolt /> IoT Hub
          </div>
          {(data.iotHub.projects || []).length > 0
            ? data.iotHub.projects.map(p => (
                <div key={p.projectId} className="p-3 border rounded-md mb-2 hover:bg-gray-50 transition">
                  <div className="font-medium">{p.name} <span className="text-xs text-gray-400">({p.projectId})</span></div>
                  <div className="text-sm text-gray-600">Devices: {p.deviceIds.join(", ")}</div>
                </div>
              ))
            : <div className="text-gray-500">No IoT Hub projects</div>}
        </div>

        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition col-span-1 md:col-span-2">
          <div className="flex items-center gap-3 mb-3 text-teal-600 font-semibold text-lg">
            <FaKey /> Backup & API Key
          </div>
          <div className="space-y-1 text-gray-700 text-sm">
            <div><span className="font-medium">Last Backup:</span> {formatDate(data.backupSync.lastBackup)}</div>
            <div><span className="font-medium">Auto Sync:</span> {data.backupSync.autoSync ? "Yes" : "No"}</div>
            <div><span className="font-medium">Targets:</span> {(data.backupSync.targets || []).join(", ")}</div>
            <div>
              <span className="font-medium">API Key:</span> {showApiKey ? data.config.apiKey : "********"}{" "}
              <button onClick={() => setShowApiKey(!showApiKey)} className="text-sm underline ml-1">
                {showApiKey ? "Hide" : "Show"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
