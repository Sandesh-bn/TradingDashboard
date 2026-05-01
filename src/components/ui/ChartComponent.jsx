import * as React from "react";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  
} from "recharts";

export function ChartComponent({ coinId = "bitcoin", days = 7 }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`;

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        const formatted = res.prices.map(([ts, price]) => ({
          time: new Date(ts).toLocaleDateString([], {
            month: "short",
            day: "numeric",
          }),
          price,
        }));

        setData(formatted);
      });
  }, [coinId, days]);

  return (
    <div className="w-full h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>

          {/* 🔥 Gradient definition */}
          <defs>
            <linearGradient id="priceGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0f7be0" stopOpacity={0.2} />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity={1} />
              <stop offset="100%" stopColor="#6366f1" stopOpacity={1} />
            </linearGradient>

            <linearGradient id="priceFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0f7be0" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#0f7be0" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />

          <XAxis
            dataKey="time"
            tick={{ fill: "#9ca3af", fontSize: 11 }}
            tickMargin={10}
          />

          <YAxis domain={["dataMin - 50", "dataMax + 50"]} hide />

          <Tooltip
            contentStyle={{
              backgroundColor: "#18181b",
              border: "1px solid #27272a",
              color: "#fff",
            }}
          />

          {/* 🔥 Gradient line */}
          <Line
            type="monotone"
            dataKey="price"
            stroke="url(#priceGradient)"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4 }}
          />

          {/* Optional: soft area under curve */}
          <Line
            type="monotone"
            dataKey="price"
            stroke="none"
            fill="url(#priceFill)"
          />

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}