import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { SCENARIOS } from '../data/constants';
import { useProtection } from '../context/ProtectionContext';

export default function TapTriggerPage() {
  const { scenarioId } = useParams();
  const navigate = useNavigate();
  const { setScenarioId } = useProtection();

  useEffect(() => {
    if (!scenarioId || !SCENARIOS[scenarioId]) {
      navigate('/', { replace: true });
      return;
    }

    const timer = setTimeout(() => {
      setScenarioId(scenarioId);
      navigate('/', { replace: true });
    }, 450);

    return () => clearTimeout(timer);
  }, [scenarioId, setScenarioId, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-3 p-6">
      <Loader2 className="w-10 h-10 text-hsbc-red animate-spin" />
      <p className="text-sm font-semibold text-gray-800">Applying signal…</p>
      <p className="text-xs text-gray-500">Updating protection allocation</p>
    </div>
  );
}

