import { useMemo } from 'react';
import { CATEGORIES } from '../data/constants';
import { buildDonutSegments, donutSegmentPath } from '../utils/donutPaths';
import { useProtection } from '../context/ProtectionContext';

export default function DonutChart({ size = 160, inner = 52, outer = 72 }) {
  const { displayAllocation } = useProtection();
  const cx = size / 2;
  const cy = size / 2;

  const segments = useMemo(
    () => buildDonutSegments(displayAllocation, CATEGORIES),
    [displayAllocation],
  );

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="shrink-0"
      aria-hidden
    >
      {segments.map((seg) => (
        <path
          key={seg.key}
          d={donutSegmentPath(cx, cy, outer, inner, seg.start, seg.end)}
          fill={seg.color}
        />
      ))}
    </svg>
  );
}
