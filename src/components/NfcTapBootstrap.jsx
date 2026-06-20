import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProtection } from '../context/ProtectionContext';
import { SCENARIOS } from '../data/constants';
import { isTravelSignal } from '../data/travelSignals';
import { PENDING_TAP_KEY } from '../utils/pendingTap';

/** Handles ?tap= on mobile.html so every NFC tag opens the same page. */
export default function NfcTapBootstrap() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { setScenarioId } = useProtection();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tap = params.get('tap');
    if (!tap || (!SCENARIOS[tap] && !isTravelSignal(tap))) return;

    // Same URL in the address bar for every box tap.
    window.history.replaceState({}, '', window.location.pathname);

    if (!isAuthenticated) {
      sessionStorage.setItem(PENDING_TAP_KEY, tap);
      navigate('/login', { replace: true });
      return;
    }

    setScenarioId(tap);
    navigate('/', { replace: true });
  }, [isAuthenticated, navigate, setScenarioId]);

  return null;
}
