import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { getPowerConsumption } from "../services/powerService";

export default function PowerChart() {
  const [powerData, setPowerData] = useState([]);
  const [range, setRange] = useState("week");

  useEffect(() => {
    getPowerConsumption(range)
      .then((res) => {
        const entries = Array.isArray(res) ? res : res.data || [];
        setPowerData(aggregatePower(entries, range));
      })
      .catch((err) => {
        console.error("Failed to load power data", err);
        setPowerData([]);
      });
  }, [range]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Power Consumption</h3>
        <select
          className="border rounded px-2 py-1 text-sm"
          value={range}
          onChange={(e) => setRange(e.target.value)}
        >
          <option value="week">This week</option>
          <option value="month">This month</option>
        </select>
      </div>

      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={powerData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6B6BF9" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#6B6BF9" stopOpacity={0.04} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="power"
              stroke="#6B6BF9"
              strokeWidth={3}
              fill="url(#colorPower)"
              dot={{ r: 0 }}
              activeDot={{ r: 6, strokeWidth: 3, stroke: "#fff" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function aggregatePower(entries, range = "week") {
  if (!Array.isArray(entries)) return [];

  if (range === "week") {
    const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const sums = new Array(7).fill(0);

    entries.forEach((e) => {
      const d = new Date(e.timestamp);
      if (isNaN(d)) return;
      const day = d.getDay();
      const idx = day === 0 ? 6 : day - 1;
      sums[idx] += Number(e.power || 0);
    });

    return labels.map((lab, i) => ({ date: lab, power: Math.round(sums[i]) }));
  } else {
    const labels = ["Week1", "Week2", "Week3", "Week4"];
    const sums = new Array(4).fill(0);

    entries.forEach((e) => {
      const d = new Date(e.timestamp);
      if (isNaN(d)) return;
      const day = d.getDate();
      const weekIndex = Math.min(Math.floor((day - 1) / 7), 3);
      sums[weekIndex] += Number(e.power || 0);
    });

    return labels.map((lab, i) => ({ date: lab, power: Math.round(sums[i]) }));
  }
}

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    return (
      <div className="bg-white p-2 rounded-lg shadow text-sm">
        <div className="text-xs text-gray-400 mb-1">{label}</div>
        <div className="font-semibold">{value} KWh</div>
      </div>
    );
  }
  return null;
}
