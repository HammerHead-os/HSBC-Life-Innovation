/** SVG arc helpers for a donut chart (degrees, clockwise from top). */
function point(cx, cy, r, deg) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export function donutSegmentPath(cx, cy, outer, inner, startDeg, endDeg) {
  const sweep = endDeg - startDeg;
  if (sweep <= 0.01) return '';

  const large = sweep > 180 ? 1 : 0;
  const o1 = point(cx, cy, outer, startDeg);
  const o2 = point(cx, cy, outer, endDeg);
  const i2 = point(cx, cy, inner, endDeg);
  const i1 = point(cx, cy, inner, startDeg);

  return [
    `M ${o1.x.toFixed(2)} ${o1.y.toFixed(2)}`,
    `A ${outer} ${outer} 0 ${large} 1 ${o2.x.toFixed(2)} ${o2.y.toFixed(2)}`,
    `L ${i2.x.toFixed(2)} ${i2.y.toFixed(2)}`,
    `A ${inner} ${inner} 0 ${large} 0 ${i1.x.toFixed(2)} ${i1.y.toFixed(2)}`,
    'Z',
  ].join(' ');
}

export function buildDonutSegments(allocation, categories, gapDeg = 0.4) {
  const total = categories.reduce((sum, c) => sum + allocation[c.key], 0);
  if (total <= 0) return [];

  const usable = 360 - gapDeg * categories.length;
  let cursor = 0;
  const segments = [];

  for (const cat of categories) {
    const value = allocation[cat.key];
    if (value <= 0) continue;

    const sweep = (value / total) * usable;
    segments.push({
      key: cat.key,
      color: cat.color,
      start: cursor,
      end: cursor + sweep,
    });
    cursor += sweep + gapDeg;
  }

  return segments;
}
