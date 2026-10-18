import { RouteRequest, RouteOption, Checkpoint } from '../types';
import { calculateRiskLevel } from './weatherRiskService';

// Mock routing service
export const getRouteOptions = async (req: RouteRequest): Promise<RouteOption[]> => {
  // Simulate 3 routes
  return [1, 2, 3].map((id) => generateMockRoute(id.toString(), req));
};

const generateMockRoute = (id: string, req: RouteRequest): RouteOption => {
  const checkpoints: Checkpoint[] = [];
  const distance = Math.random() * 500 + 100; // 100-600 miles
  const numCheckpoints = Math.floor(distance / 25);
  
  for (let i = 0; i < numCheckpoints; i++) {
    const dist = i * 25;
    const weather = {
      windSpeed: Math.random() * 60,
      rainIntensity: Math.random() * 1.5,
      snowIntensity: Math.random() * 4,
    };
    
    checkpoints.push({
      lat: 37.7749 + (i * 0.1) * (Math.random() > 0.5 ? 1 : -1),
      lng: -122.4194 + (i * 0.1) * (Math.random() > 0.5 ? 1 : -1),
      distanceFromOrigin: dist,
      estimatedArrivalTime: new Date(Date.now() + i * 3600000).toISOString(),
      weather,
      riskLevel: calculateRiskLevel(weather, req.loadWeight),
    });
  }

  const severeMiles = checkpoints.filter(c => c.riskLevel === 'Severe').length * 25;
  const highMiles = checkpoints.filter(c => c.riskLevel === 'High').length * 25;

  return {
    id,
    checkpoints,
    travelTimeMinutes: Math.floor(distance / 50 * 60),
    totalDistanceMiles: distance,
    summary: {
      severeMiles,
      highMiles,
      averageRiskScore: (severeMiles * 4 + highMiles * 3) / distance,
    }
  };
};
