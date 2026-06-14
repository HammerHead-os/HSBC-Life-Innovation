import { Bot, Plane, Home, Bike, Train, Cloud, Mountain, Info, TrendingUp, Zap } from 'lucide-react';

const ICONS = { plane: Plane, home: Home, bike: Bike, train: Train, cloud: Cloud, mountain: Mountain };

export default function InsightCard({ title, body, scenarioIcon, variant = 'default' }) {
  const Icon = scenarioIcon ? ICONS[scenarioIcon] : Info;
  const icons = variant === 'network'
    ? [Plane, Home, Mountain, Bike, Cloud]
    : null;

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 h-full">
      <p className="text-xs font-bold text-hsbc-red uppercase tracking-wide mb-1">Today&apos;s insight</p>
      <h3 className="font-bold text-gray-900 text-base mb-2">{title}</h3>
      <div className="flex gap-3 items-start">
        <p className="text-sm text-gray-600 leading-relaxed flex-1">{body}</p>
        {variant === 'network' ? (
          <div className="relative w-20 h-20 shrink-0">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-hsbc-red flex items-center justify-center">
                <Plane className="w-5 h-5 text-white" />
              </div>
            </div>
            {icons?.slice(1).map((Ic, i) => {
              const angle = (i / 4) * Math.PI * 2 - Math.PI / 2;
              const x = 40 + Math.cos(angle) * 32 - 12;
              const y = 40 + Math.sin(angle) * 32 - 12;
              return (
                <div
                  key={i}
                  className="absolute w-6 h-6 rounded-full bg-hsbc-red/80 flex items-center justify-center"
                  style={{ left: x, top: y }}
                >
                  <Ic className="w-3 h-3 text-white" />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
            <Icon className="w-6 h-6 text-hsbc-red" />
          </div>
        )}
      </div>
    </div>
  );
}

export function InsightListItem({ title, body, time, type }) {
  const TypeIcon = type === 'travel' ? Plane : type === 'boost' ? Zap : type === 'summary' ? TrendingUp : Info;
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100 flex gap-3">
      <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
        <TypeIcon className="w-5 h-5 text-hsbc-red" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between gap-2">
          <h4 className="font-semibold text-gray-900 text-sm">{title}</h4>
          <span className="text-xs text-gray-400 shrink-0">{time}</span>
        </div>
        <p className="text-sm text-gray-600 mt-1">{body}</p>
      </div>
    </div>
  );
}

export function AiBadge({ time }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-2">
      <Bot className="w-3.5 h-3.5" />
      <span>AI allocated today at {time}</span>
    </div>
  );
}
