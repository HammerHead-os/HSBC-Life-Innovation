import { useCallback, useEffect, useRef, useState } from 'react';
import { decodeNfcRecords, parseNfcPayload } from '../lib/nfc';

export function useNfcTap(onScenarioDetected) {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(false);
  const [error, setError] = useState(null);
  const callbackRef = useRef(onScenarioDetected);
  callbackRef.current = onScenarioDetected;

  useEffect(() => {
    setSupported(typeof window !== 'undefined' && 'NDEFReader' in window);
  }, []);

  const startListening = useCallback(async () => {
    setError(null);
    if (!('NDEFReader' in window)) {
      setError('This device cannot read NFC in-browser. Use demo cards with programmed stickers (see setup below).');
      return;
    }

    try {
      const reader = new window.NDEFReader();
      await reader.scan();
      setListening(true);

      reader.onreading = (event) => {
        const payload = decodeNfcRecords(event.message);
        const scenarioId = parseNfcPayload(payload);
        if (scenarioId) {
          callbackRef.current(scenarioId);
        }
      };

      reader.onreadingerror = () => {
        setError('Could not read card. Hold the demo card flat on the phone’s NFC area.');
      };
    } catch {
      setError('NFC permission denied. Allow NFC in Chrome, or use sticker URLs.');
      setListening(false);
    }
  }, []);

  const stopListening = useCallback(() => {
    setListening(false);
    setError(null);
  }, []);

  return { listening, supported, error, startListening, stopListening };
}
