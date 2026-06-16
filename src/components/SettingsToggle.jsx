export default function SettingsToggle({ on, onToggle, label }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`w-10 h-6 rounded-full p-0.5 transition-colors shrink-0 ${on ? 'bg-hsbc-red hover:bg-hsbc-red-dark' : 'bg-gray-200 hover:bg-gray-300'}`}
      aria-pressed={on}
      aria-label={label}
    >
      <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${on ? 'translate-x-4' : ''}`} />
    </button>
  );
}
