import { useEffect, useRef, useState } from 'react';
import { CATEGORIES } from '../data/constants';

function allocationsEqual(a, b) {
  return CATEGORIES.every((c) => a[c.key] === b[c.key]);
}

export default function useAnimatedAllocation(allocation, duration = 3000) {
  const [display, setDisplay] = useState(allocation);
  const displayRef = useRef(allocation);
  const fromRef = useRef(allocation);

  displayRef.current = display;

  useEffect(() => {
    const to = allocation;
    const from = { ...displayRef.current };

    if (allocationsEqual(from, to)) {
      fromRef.current = { ...to };
      return;
    }

    const start = performance.now();
    let frame;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      const next = {};

      for (const cat of CATEGORIES) {
        const key = cat.key;
        next[key] = Math.round(from[key] + (to[key] - from[key]) * eased);
      }

      setDisplay(next);

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        fromRef.current = { ...to };
        setDisplay(to);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [allocation, duration]);

  return display;
}
