import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export function ChartComponent({
  coinId = "bitcoin",
  days = 7,
}) {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      setError("");
      setLoading(true);
      const url = `https://api.coingecko.com/api/v3/coins/${encodeURIComponent(coinId)}/market_chart?vs_currency=usd&days=${days}`;

      try {
        const res = await fetch(url);
        const json = await res.json();

        if (!res.ok || !Array.isArray(json.prices)) {
          throw new Error(json?.status?.error_message || "Price chart unavailable.");
        }

        const formatted = json.prices.map(
          ([ts, price]) => ({
            time:
              days <= 1
                ? new Date(ts).toLocaleTimeString(
                  [],
                  {
                    hour: "numeric",
                    minute: "2-digit",
                  }
                )
                : new Date(ts).toLocaleDateString(
                  [],
                  {
                    month: "short",
                    day: "numeric",
                  }
                ),

            price: Number(price.toFixed(2)),
          })
        );

        if (!ignore) {
          setData(formatted);
          setLoading(false);
        }
      } catch (err) {
        if (!ignore) {
          setData([]);
          setError(err.message || "Price chart unavailable.");
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      ignore = true;
    };
  }, [coinId, days]);

  return (
    <div className="w-full h-[320px]">
      {loading && (
        <div className="flex h-full flex-col justify-end gap-3 p-4">
          <div className="h-48 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="flex justify-between">
            <div className="h-3 w-14 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-3 w-14 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-3 w-14 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-3 w-14 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          </div>
        </div>
      )}
      {error && (
        <div className="flex h-full items-center justify-center text-sm text-zinc-500 dark:text-zinc-400">
          {error}
        </div>
      )}
      {!loading && !error && (
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <AreaChart data={data}>
          <defs>
            <linearGradient
              id="priceGradient"
              x1="0"
              y1="0"
              x2="1"
              y2="0"
            >
              <stop
                offset="0%"
                stopColor="#0f7be0"
              />

              <stop
                offset="50%"
                stopColor="#38bdf8"
              />

              <stop
                offset="100%"
                stopColor="#6366f1"
              />
            </linearGradient>

            <linearGradient
              id="areaGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#38bdf8"
                stopOpacity={0.35}
              />

              <stop
                offset="100%"
                stopColor="#38bdf8"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            stroke="rgba(255,255,255,0.05)"
            vertical={false}
          />

          <XAxis
            dataKey="time"
            tick={{
              fill: "#9ca3af",
              fontSize: 11,
            }}
            tickMargin={10}
            minTickGap={30}
          />



          <YAxis
            tick={{
              fill: "#9ca3af",
              fontSize: 11,
            }}
            tickMargin={10}
            width={80}
            domain={[
              (dataMin) => dataMin * 0.995,
              (dataMax) => dataMax * 1.005,
            ]}
            tickFormatter={(value) =>
              `$${value.toLocaleString()}`
            }
          />

          <Tooltip
            formatter={(value) => [
              `$${value}`,
              "Price",
            ]}
            contentStyle={{
              backgroundColor: "#18181b",
              border:
                "1px solid #27272a",
              color: "#fff",
            }}
          />

          <Area
            type="monotone"
            dataKey="price"
            stroke="none"
            fill="url(#areaGradient)"
          />

          <Line
            type="monotone"
            dataKey="price"
            stroke="url(#priceGradient)"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>
      )}
    </div>
  );
}
