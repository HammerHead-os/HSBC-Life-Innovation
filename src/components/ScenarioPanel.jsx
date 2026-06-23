import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useProtection } from '../context/ProtectionContext';
import { DEMO_SCENARIO_IDS, SCENARIOS } from '../data/constants';
import { ScenarioPicker } from './SubPageHeader';

export default function ScenarioPanel({ variant = 'mobile', footer = null }) {
  const { scenario, scenarioId, setScenarioId } = useProtection();
  const scenarios = Object.fromEntries(DEMO_SCENARIO_IDS.map((id) => [id, SCENARIOS[id]]));
  const isWeb = variant === 'web';
  const [expanded, setExpanded] = useState(isWeb);

  return (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm ${isWeb ? 'p-5' : 'p-4'}`}>
      {isWeb ? (
        <p className="font-bold text-hsbc-red uppercase tracking-wide mb-1 text-sm">Demo scenarios</p>
      ) : (
        <button
          type="button"
          onClick={() => setExpanded((open) => !open)}
          className="w-full flex items-center justify-between gap-2 text-left"
          aria-expanded={expanded}
        >
          <p className="font-bold text-hsbc-red uppercase tracking-wide text-xs">Preview a scenario</p>
          <ChevronDown
            className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`}
          />
        </button>
      )}

      {!isWeb && !expanded && (
        <p className="text-xs text-gray-500 mt-2 leading-relaxed">
          <strong className="text-gray-700">{scenario.label}</strong> — active now. Expand to preview others, or use NFC boxes.
        </p>
      )}

      {(isWeb || expanded) && (
        <>
          <p className={`text-gray-600 mb-3 ${isWeb ? 'text-[15px] leading-snug mt-1' : 'text-sm mt-3'}`}>
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
        </>
      )}

      {footer && (
        <div className={`pt-3 border-t border-gray-100 ${isWeb || expanded ? 'mt-4' : 'mt-3'}`}>{footer}</div>
      )}
    </div>
  );
}
