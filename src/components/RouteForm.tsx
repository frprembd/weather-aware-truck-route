import { useState } from 'react';

interface FormProps {
  onSubmit: (data: { origin: string; destination: string; departureTime: string; loadWeight: number }) => void;
}

export const RouteForm = ({ onSubmit }: FormProps) => {
  const [loadWeight, setLoadWeight] = useState(0);
  const now = new Date();
  // Format for datetime-local: YYYY-MM-DDThh:mm
  const defaultDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit({
      origin: formData.get('origin') as string,
      destination: formData.get('destination') as string,
      departureTime: formData.get('departureTime') as string,
      loadWeight: loadWeight,
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h2 className="text-sm font-semibold text-neutral-900">Trip Configuration</h2>
      <input name="origin" type="text" placeholder="Origin Address" className="w-full px-3 py-2 border rounded-lg text-sm" required />
      <input name="destination" type="text" placeholder="Destination Address" className="w-full px-3 py-2 border rounded-lg text-sm" required />
      <input name="departureTime" type="datetime-local" defaultValue={defaultDateTime} className="w-full px-3 py-2 border rounded-lg text-sm" required />
      
      <div className="space-y-2">
        <label className="text-xs font-medium text-neutral-500">Quick Select Load (lbs)</label>
        <div className="grid grid-cols-3 gap-2">
          {[10000, 25000, 40000].map(weight => (
            <button
              key={weight}
              type="button"
              onClick={() => setLoadWeight(weight)}
              className={`py-1.5 text-xs rounded-lg border ${loadWeight === weight ? 'bg-neutral-900 text-white' : 'bg-white hover:bg-neutral-50'}`}
            >
              {weight.toLocaleString()}
            </button>
          ))}
        </div>
        <input 
          type="number" 
          value={loadWeight || ''} 
          placeholder="Custom Weight" 
          className="w-full px-3 py-2 border rounded-lg text-sm" 
          onChange={e => setLoadWeight(Number(e.target.value))}
        />
      </div>

      <button type="submit" className="w-full py-2 bg-neutral-900 text-white rounded-lg text-sm font-semibold hover:bg-neutral-800">Analyze Routes</button>
    </form>
  );
};
