import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProtection } from '../context/ProtectionContext';
import { SCENARIOS } from '../data/constants';
import { isTravelSignal } from '../data/travelSignals';
import { PENDING_TAP_KEY } from '../utils/pendingTap';

export default function TapTriggerPage() {
  const { scenarioId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { setScenarioId } = useProtection();

  useEffect(() => {
    if (!scenarioId || (!SCENARIOS[scenarioId] && !isTravelSignal(scenarioId))) {
      navigate('/', { replace: true });
      return;
    }

    if (!isAuthenticated) {
      sessionStorage.setItem(PENDING_TAP_KEY, scenarioId);
      navigate('/login', { replace: true });
      return;
    }

    setScenarioId(scenarioId);
    navigate('/', { replace: true });
  }, [scenarioId, isAuthenticated, setScenarioId, navigate]);

  return null;
}
