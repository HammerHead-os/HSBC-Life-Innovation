import { useProtection } from '../context/ProtectionContext';
import { DEMO_SCENARIO_IDS, SCENARIOS } from '../data/constants';
import { ScenarioPicker } from './SubPageHeader';

export default function ScenarioPanel() {
  const { scenario, scenarioId, setScenarioId } = useProtection();
  const scenarios = Object.fromEntries(DEMO_SCENARIO_IDS.map((id) => [id, SCENARIOS[id]]));

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
      <p className="text-xs font-bold text-hsbc-red uppercase tracking-wide mb-1">
        Demo scenarios
      </p>
      <p className="text-sm text-gray-600 mb-3">
        Select a situation below — AI reallocates coverage instantly.
      </p>
      <ScenarioPicker scenarios={scenarios} current={scenarioId} onChange={setScenarioId} />
      <p className="text-xs text-gray-500 mt-3 leading-relaxed">
        <strong className="text-gray-700">{scenario.label}</strong>
        {' — '}
        {scenario.insight}
      </p>
    </div>
  );
}
