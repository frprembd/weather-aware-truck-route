import { RouteOption } from '../backend/types';

interface RouteCardProps {
  route: RouteOption;
  isSelected: boolean;
  onSelect: () => void;
}

export const RouteCard = ({ route, isSelected, onSelect }: RouteCardProps) => {
  const getRiskStyles = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Moderate': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Severe': return 'bg-rose-100 text-rose-800 border-rose-200';
      default: return 'bg-neutral-100 text-neutral-800 border-neutral-200';
    }
  };

  const risk = route.checkpoints[0]?.riskLevel || 'Low';

  return (
    <div 
      onClick={onSelect}
      className={`group relative p-4 rounded-xl border transition-all cursor-pointer ${
        isSelected 
          ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600 shadow-lg' 
          : 'border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-md'
      }`}
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-neutral-900">Route {route.id}</h3>
        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${getRiskStyles(risk)}`}>
          {risk}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs text-neutral-600">
        <div><span className="block text-neutral-400">Distance</span> {route.totalDistanceMiles.toFixed(0)} mi</div>
        <div><span className="block text-neutral-400">Time</span> {route.travelTimeMinutes} min</div>
        <div><span className="block text-neutral-400">Severe</span> {route.summary.severeMiles} mi</div>
        <div><span className="block text-neutral-400">Risk Score</span> {route.summary.averageRiskScore.toFixed(2)}</div>
      </div>
    </div>
  );
};
