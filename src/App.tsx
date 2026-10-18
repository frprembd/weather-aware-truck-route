import { useState } from 'react';
import { RouteForm } from './components/RouteForm';
import { MapView } from './components/MapView';
import { WeatherSlider } from './components/WeatherSlider';
import { RouteCard } from './components/RouteCard';
import { RouteOption } from './backend/types';

export default function App() {
  const [routes, setRoutes] = useState<RouteOption[]>([]);
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);

  const handleRouteSubmit = async (data: any) => {
    const response = await fetch('/api/routes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    setRoutes(result.routes);
    setSelectedRouteId(result.recommendedRoute?.id || null);
  };

  return (
    <div className="h-screen flex flex-col bg-neutral-100 text-neutral-900">
      {/* Header */}
      <header className="h-16 px-6 bg-neutral-900 text-white flex items-center justify-between shadow-md shrink-0">
        <h1 className="text-xl font-bold tracking-tight">Spotter <span className="text-neutral-400 font-normal">Logistics</span></h1>
        <div className="text-xs text-neutral-400">Truck Route Planner v1.0</div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Sidebar/Controls */}
        <aside className="w-full lg:w-[400px] bg-white border-r border-neutral-200 overflow-y-auto p-6 space-y-6">
          <RouteForm onSubmit={handleRouteSubmit} />
          
          {routes.length > 0 && (
            <div className="space-y-4">
              <h2 className="font-semibold text-neutral-900">Route Options</h2>
              <div className="grid grid-cols-1 gap-4">
                {routes.map(r => (
                  <RouteCard key={r.id} route={r} isSelected={selectedRouteId === r.id} onSelect={() => setSelectedRouteId(r.id)} />
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Map Area */}
        <main className="flex-1 flex flex-col p-4 lg:p-6 gap-4">
          <div className="flex-1 rounded-2xl overflow-hidden shadow-lg border border-neutral-200">
            <MapView routes={routes} selectedRouteId={selectedRouteId} />
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-sm border border-neutral-200">
            <WeatherSlider onChange={val => console.log(val)} />
          </div>
        </main>
      </div>
    </div>
  );
}
