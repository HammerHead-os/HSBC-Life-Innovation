import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { CATEGORIES } from '../data/constants';
import useAnimatedAllocation from '../hooks/useAnimatedAllocation';

export default function DonutChart({ allocation, size = 160, inner = 52, outer = 72, duration = 3000 }) {
  const display = useAnimatedAllocation(allocation, duration);

  const data = useMemo(
    () =>
      CATEGORIES.map((c) => ({
        name: c.name,
        value: display[c.key],
        color: c.color,
        key: c.key,
      })),
    [display],
  );

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
          nameKey="name"
          startAngle={90}
          endAngle={-270}
          stroke="none"
          isAnimationActive={false}
        >
          {data.map((entry) => (
            <Cell key={entry.key} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
