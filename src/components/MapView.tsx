import { MapContainer, TileLayer, Polyline, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { RouteOption } from '../backend/types';

interface MapViewProps {
  routes: RouteOption[];
  selectedRouteId: string | null;
}

export const MapView = ({ routes, selectedRouteId }: MapViewProps) => {
  // Simple color mapping based on risk
  const getRouteColor = (id: string) => (id === selectedRouteId ? '#4f46e5' : '#94a3b8');

  return (
    <MapContainer center={[37.7749, -122.4194] as any} zoom={6} className="h-full w-full rounded-lg">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {routes.map((route) => (
        <Polyline 
          key={route.id} 
          positions={route.checkpoints.map(cp => [cp.lat, cp.lng] as any)}
          color={getRouteColor(route.id)}
          weight={route.id === selectedRouteId ? 6 : 3}
        />
      ))}
      {routes.filter(r => r.id === selectedRouteId).flatMap(r => r.checkpoints).map((cp, i) => (
        <CircleMarker key={i} center={[cp.lat, cp.lng] as any} radius={4} color="white" fillColor="black" fillOpacity={1}>
          <Popup>Risk: {cp.riskLevel}</Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};
