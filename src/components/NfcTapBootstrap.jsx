import { useEffect } from 'react';
import { SCENARIOS } from '../data/constants';
import { isTravelSignal } from '../data/travelSignals';
import { PENDING_TAP_KEY } from '../utils/pendingTap';
import { useAuth } from '../context/AuthContext';
import { useProtection } from '../context/ProtectionContext';

const PRESENCE = 'mpf-app-presence';

/** Keeps the app on Home — NFC taps update via localStorage, not router navigation. */
export default function NfcTapBootstrap() {
  const { isAuthenticated } = useAuth();
  const { setScenarioId } = useProtection();

  useEffect(() => {
    const bc = new BroadcastChannel(PRESENCE);
    bc.onmessage = (e) => {
      if (e.data === 'ping') bc.postMessage('pong');
    };
    return () => bc.close();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    const pending = sessionStorage.getItem(PENDING_TAP_KEY);
    if (!pending || (!SCENARIOS[pending] && !isTravelSignal(pending))) return;

    sessionStorage.removeItem(PENDING_TAP_KEY);
    setScenarioId(pending);
  }, [isAuthenticated, setScenarioId]);

  return null;
}
