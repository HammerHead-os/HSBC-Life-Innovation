import { useEffect, useRef } from 'react';

/**
 * Listens for USB RFID / barcode readers that act as a keyboard (types code + Enter).
 */
export function useCardWedge(onScan, enabled = true) {
  const bufferRef = useRef('');
  const onScanRef = useRef(onScan);
  onScanRef.current = onScan;

  useEffect(() => {
    if (!enabled) return;

    let resetTimer;

    const handleKey = (e) => {
      const tag = e.target?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      if (e.key === 'Enter') {
        const code = bufferRef.current.trim();
        bufferRef.current = '';
        if (code) onScanRef.current(code);
        e.preventDefault();
        return;
      }

      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        bufferRef.current += e.key;
        clearTimeout(resetTimer);
        resetTimer = setTimeout(() => {
          bufferRef.current = '';
        }, 150);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
      clearTimeout(resetTimer);
    };
  }, [enabled]);
}
