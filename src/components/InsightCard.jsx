import { Bot, Heart, HeartPulse, Plane, Home, Shield, Scale, Info, TrendingUp, Zap, Newspaper, BookOpen, BarChart3 } from 'lucide-react';
import { CATEGORIES } from '../data/constants';

const CATEGORY_ICONS = {
  life: Heart,
  health: HeartPulse,
  travel: Plane,
  property: Home,
  cyber: Shield,
  liability: Scale,
};

export default function InsightCard({ title, body, highlightCategory, variant = 'default', layout = 'mobile' }) {
  const highlight = CATEGORIES.find((c) => c.key === highlightCategory);
  const CenterIcon = CATEGORY_ICONS[highlightCategory] || Info;
  const otherCategories = CATEGORIES.filter((c) => c.key !== highlightCategory);
  const isWeb = layout === 'web';

  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 h-full ${isWeb ? 'p-5' : 'p-4'}`}>
      <p className={`font-bold text-hsbc-red uppercase tracking-wide mb-1 ${isWeb ? 'text-sm' : 'text-xs'}`}>
        Active coverage
      </p>
      <h3 className={`font-bold text-gray-900 mb-2 ${isWeb ? 'text-lg' : 'text-base'}`}>{title}</h3>
      <div className={`flex gap-4 items-start ${isWeb ? 'flex-col sm:flex-row' : ''}`}>
        <p className={`text-gray-600 leading-relaxed flex-1 min-w-0 ${isWeb ? 'text-[15px]' : 'text-sm'}`}>{body}</p>
        {variant === 'network' ? (
          <div className={`relative shrink-0 self-center sm:self-start ${isWeb ? 'w-32 h-32' : 'w-24 h-24'}`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={`rounded-full flex items-center justify-center shadow-md z-10 ${isWeb ? 'w-14 h-14' : 'w-12 h-12'}`}
                style={{ background: highlight?.color ?? '#DB0011' }}
                title={highlight?.name}
              >
                <CenterIcon className={isWeb ? 'w-7 h-7 text-white' : 'w-6 h-6 text-white'} />
              </div>
            </div>
            {otherCategories.map((cat, i) => {
              const Ic = CATEGORY_ICONS[cat.key];
              const angle = (i / otherCategories.length) * Math.PI * 2 - Math.PI / 2;
              const cx = isWeb ? 64 : 48;
              const cy = isWeb ? 64 : 48;
              const radius = isWeb ? 44 : 36;
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

const INSIGHT_ICONS = {
  travel: Plane,
  boost: Zap,
  summary: TrendingUp,
  news: Newspaper,
  research: BookOpen,
  product: Newspaper,
  market: BarChart3,
  guidance: Shield,
  info: Info,
  alert: Zap,
};

const SOURCE_LABELS = {
  'hsbc-research': 'HSBC Life Research',
  'hsbc-product': 'HSBC Life',
  'hsbc-market': 'Market insight',
  hsbc: 'HSBC Life',
  ai: 'AI',
  system: 'System',
};

export function InsightListItem({ title, body, time, type, source }) {
  const TypeIcon = INSIGHT_ICONS[type] ?? Info;
  const sourceLabel = SOURCE_LABELS[source] ?? null;

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
