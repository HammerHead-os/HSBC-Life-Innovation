import { useProtection } from '../context/ProtectionContext';
import { DEMO_SCENARIO_IDS, SCENARIOS } from '../data/constants';
import { ScenarioPicker } from './SubPageHeader';

export default function ScenarioPanel({ variant = 'mobile', footer = null }) {
  const { scenario, scenarioId, setScenarioId } = useProtection();
  const scenarios = Object.fromEntries(DEMO_SCENARIO_IDS.map((id) => [id, SCENARIOS[id]]));
  const isWeb = variant === 'web';

  return (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm ${isWeb ? 'p-5' : 'p-4'}`}>
      <p className={`font-bold text-hsbc-red uppercase tracking-wide mb-1 ${isWeb ? 'text-sm' : 'text-xs'}`}>
        Demo scenarios
      </p>
      <p className={`text-gray-600 mb-3 ${isWeb ? 'text-[15px] leading-snug' : 'text-sm'}`}>
        Same options as the NFC booth — tap a pill to preview, or use the physical boxes.
        Airport and HSR <strong>gate checkpoints</strong> are NFC-only (not listed here).
      </p>
      <ScenarioPicker
        scenarios={scenarios}
        current={scenarioId}
        onChange={setScenarioId}
        size={isWeb ? 'large' : 'default'}
      />
      <p className={`text-gray-500 mt-3 leading-relaxed break-words ${isWeb ? 'text-[15px]' : 'text-xs'}`}>
        <strong className="text-gray-800">{scenario.label}</strong>
        {' — '}
        {scenario.insight}
      </p>
      {footer && (
        <div className="mt-4 pt-3 border-t border-gray-100">{footer}</div>
      )}
    </div>
  );
}
