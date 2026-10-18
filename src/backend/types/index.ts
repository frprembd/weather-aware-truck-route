export interface RouteRequest {
  origin: string;
  destination: string;
  departureTime: string;
  loadWeight: number;
}

export interface WeatherCondition {
  windSpeed: number; // mph
  rainIntensity: number; // in/hr
  snowIntensity: number; // in/hr
}

export interface Checkpoint {
  lat: number;
  lng: number;
  distanceFromOrigin: number; // miles
  estimatedArrivalTime: string;
  weather: WeatherCondition;
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Severe' | 'No Travel';
}

export interface RouteOption {
  id: string;
  checkpoints: Checkpoint[];
  travelTimeMinutes: number;
  totalDistanceMiles: number;
  summary: {
    severeMiles: number;
    highMiles: number;
    averageRiskScore: number;
  };
}
