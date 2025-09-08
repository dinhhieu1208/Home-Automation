import React, { useEffect, useState } from "react";
import AnalyticsService from "../../services/analyticServices";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  LabelList,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Leaf, Zap, DollarSign, Activity } from "lucide-react";
import { getPowerConsumption } from "../../services/powerService";

const COLORS = ["#8B5CF6", "#34D399", "#FBBF24", "#FB923C", "#3B82F6", "#F472B6", "#A78BFA"];

const AnalyticsView = () => {
  const [sensors, setSensors] = useState([]);
  const [logs, setLogs] = useState([]);
  const [range, setRange] = useState("week");
  const [powerData, setPowerData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const [analytics, power] = await Promise.all([
          AnalyticsService.getAnalytics({ range }),
          getPowerConsumption(range),
        ]);

        setSensors(analytics.sensors);
        setLogs(analytics.logs);
        setPowerData(power);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, [range]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full py-20 text-gray-500">
        Loading analytics...
      </div>
    );
  }

  let totalPower = 0;
  powerData.forEach((entry) => {
    totalPower += entry.power;
  });

  const pieData = powerData.map((entry) => ({
    name: entry.deviceName,
    value: entry.power,
    percent: ((entry.power / totalPower) * 100).toFixed(1),
  }));

  const sensorMap = {};
  sensors.forEach((s) => {
    if (!sensorMap[s.type]) sensorMap[s.type] = { type: s.type, total: 0, count: 0 };
    sensorMap[s.type].total += s.value;
    sensorMap[s.type].count += 1;
  });
  const sensorChartData = Object.values(sensorMap).map((s) => ({
    type: s.type,
    avg: s.total / s.count,
  }));

  const logMap = {};
  logs.forEach((log) => {
    if (!logMap[log.deviceName]) logMap[log.deviceName] = { device: log.deviceName, On: 0, Off: 0 };
    logMap[log.deviceName][log.is_on ? "On" : "Off"] += 1;
  });
  const logChartData = Object.values(logMap);

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-12">
      <header>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Energy Monitoring</h1>
        <p className="text-gray-500 mb-6">Track your energy consumption and optimize usage</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 shadow flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Today's Usage</p>
              <h2 className="text-2xl font-bold">24.5 kWh</h2>
              <p className="text-green-600 text-sm">↓ -12%</p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100">
              <Activity className="text-blue-600 w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Monthly Cost</p>
              <h2 className="text-2xl font-bold">$127.30</h2>
              <p className="text-red-600 text-sm">↑ +8%</p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
              <DollarSign className="text-red-600 w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Carbon Footprint</p>
              <h2 className="text-2xl font-bold">285 kg CO₂</h2>
              <p className="text-green-600 text-sm">↓ -15%</p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100">
              <Leaf className="text-green-600 w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Peak Power</p>
              <h2 className="text-2xl font-bold">6.2 kW</h2>
              <p className="text-orange-600 text-sm">↑ +5%</p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-100">
              <Zap className="text-orange-600 w-6 h-6" />
            </div>
          </div>
        </div>
      </header>

      <main className="space-y-12">

      <section className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-gray-700">
            Energy Usage by Device
          </h3>
          <h3 className="text-lg font-semibold text-gray-600 ">
            Device Energy Details
          </h3>
        </div>

        {pieData.length === 0 ? (
          <p className="text-gray-500">No energy data available</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value.toFixed(1)} kWh`, name]}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="flex flex-col justify-center">
              <div className="max-h-72 overflow-y-auto pr-2">
                <ul className="space-y-3">
                  {pieData.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between text-gray-700 border-b pb-2"
                    >
                      <div className="flex items-center space-x-2">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        ></span>
                        <span>{item.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{item.percent}%</p>
                        <p className="text-sm text-gray-500">
                          {item.value.toFixed(1)} kWh
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </section>

        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Sensor Data Overview</h2>
          {sensorChartData.length === 0 ? (
            <p className="text-gray-500">No sensor data available</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={sensorChartData}>
                <defs>
                  <linearGradient id="colorSensor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.04} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="avg" stroke="#4F46E5" fill="url(#colorSensor)" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </section>

        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Device Activity Log</h2>
          {logChartData.length === 0 ? (
            <p className="text-gray-500">No log data available</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={logChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="device" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="On" fill="#10B981">
                  <LabelList dataKey="On" position="top" />
                </Bar>
                <Bar dataKey="Off" fill="#EF4444">
                  <LabelList dataKey="Off" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </section>
      </main>
    </div>
  );
};

export default AnalyticsView;
