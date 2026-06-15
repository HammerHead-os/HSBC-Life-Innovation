import { Bot, Heart, HeartPulse, Plane, Home, Shield, Scale, Info, TrendingUp, Zap } from 'lucide-react';
import { CATEGORIES } from '../data/constants';

const CATEGORY_ICONS = {
  life: Heart,
  health: HeartPulse,
  travel: Plane,
  property: Home,
  cyber: Shield,
  liability: Scale,
};

export default function InsightCard({ title, body, highlightCategory, variant = 'default' }) {
  const highlight = CATEGORIES.find((c) => c.key === highlightCategory);
  const CenterIcon = CATEGORY_ICONS[highlightCategory] || Info;
  const otherCategories = CATEGORIES.filter((c) => c.key !== highlightCategory);

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 h-full">
      <p className="text-xs font-bold text-hsbc-red uppercase tracking-wide mb-1">Today&apos;s insight</p>
      <h3 className="font-bold text-gray-900 text-base mb-2">{title}</h3>
      <div className="flex gap-3 items-start">
        <p className="text-sm text-gray-600 leading-relaxed flex-1">{body}</p>
        {variant === 'network' ? (
          <div className="relative w-24 h-24 shrink-0">
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center shadow-md z-10"
                style={{ background: highlight?.color ?? '#DB0011' }}
                title={highlight?.name}
              >
                <CenterIcon className="w-6 h-6 text-white" />
              </div>
            </div>
            {otherCategories.map((cat, i) => {
              const Ic = CATEGORY_ICONS[cat.key];
              const angle = (i / otherCategories.length) * Math.PI * 2 - Math.PI / 2;
              const cx = 48;
              const cy = 48;
              const radius = 36;
              const x = cx + Math.cos(angle) * radius - 12;
              const y = cy + Math.sin(angle) * radius - 12;
              return (
                <div
                  key={cat.key}
                  className="absolute w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ left: x, top: y, background: `${cat.color}cc` }}
                  title={cat.name}
                >
                  <Ic className="w-3 h-3 text-white" />
                </div>
              );
            })}
          </div>
        ) : (
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: `${highlight?.color ?? '#DB0011'}18` }}
          >
            <CenterIcon className="w-6 h-6" style={{ color: highlight?.color ?? '#DB0011' }} />
          </div>
        )}
      </div>
    </div>
  );
}

export function InsightListItem({ title, body, time, type, source }) {
  const TypeIcon = type === 'travel' ? Plane : type === 'boost' ? Zap : type === 'summary' ? TrendingUp : type === 'news' ? Info : Info;
  const sourceLabel = source === 'hsbc' ? 'HSBC News' : source === 'ai' ? 'AI' : null;

  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100 flex gap-3">
      <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
        <TypeIcon className="w-5 h-5 text-hsbc-red" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between gap-2 items-start">
          <div className="flex-1 min-w-0">
            {sourceLabel && (
              <span className="inline-block text-[10px] font-bold uppercase tracking-wide text-hsbc-red mb-0.5">
                {sourceLabel}
              </span>
            )}
            <h4 className="font-semibold text-gray-900 text-sm">{title}</h4>
          </div>
          <span className="text-xs text-gray-400 shrink-0">{time}</span>
        </div>
        <p className="text-sm text-gray-600 mt-1">{body}</p>
      </div>
    </div>
  );
}

export function AiBadge({ time }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-2 animate-[fadeIn_0.3s_ease]">
      <Bot className="w-3.5 h-3.5" />
      <span>AI allocated today at {time}</span>
    </div>
  );
}
