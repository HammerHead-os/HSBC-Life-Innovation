import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function DonutChart({ data, size = 160, inner = 52, outer = 72 }) {
  return (
    <ResponsiveContainer width={size} height={size}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={inner}
          outerRadius={outer}
          paddingAngle={2}
          dataKey="value"
          stroke="none"
          isAnimationActive
          animationDuration={400}
          animationEasing="ease-out"
        >
          {data.map((entry) => (
            <Cell key={entry.key} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
