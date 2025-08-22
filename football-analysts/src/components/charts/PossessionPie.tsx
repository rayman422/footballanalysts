"use client";
import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip } from "recharts";

type Props = {
  home: number; // 0-100
};

export default function PossessionPie({ home }: Props) {
  const away = 100 - home;
  const data = [
    { name: "Home", value: home },
    { name: "Away", value: away },
  ];
  const colors = ["#16a34a", "#ef4444"];
  return (
    <div className="w-full h-56">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={50} outerRadius={70}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

