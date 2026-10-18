export const WeatherSlider = ({ onChange }: { onChange: (val: number) => void }) => {
  return (
    <div className="p-6 bg-white shadow-sm border border-neutral-200 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <label className="text-sm font-semibold text-neutral-900">Forecast Corridor Slider (0-48h)</label>
        <span className="text-sm font-mono text-neutral-500">+24h</span>
      </div>
      <input 
        type="range" min="0" max="48" step="1" 
        className="w-full h-2 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        onChange={e => onChange(Number(e.target.value))}
      />
    </div>
  );
};
