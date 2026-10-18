import { RouteOption } from '../types';

export const recommendRoute = (routes: RouteOption[]): RouteOption | null => {
  if (routes.length === 0) return null;

  return routes.sort((a, b) => {
    // 1. Fewest Severe miles
    if (a.summary.severeMiles !== b.summary.severeMiles) {
      return a.summary.severeMiles - b.summary.severeMiles;
    }
    // 2. Fewest High miles
    if (a.summary.highMiles !== b.summary.highMiles) {
      return a.summary.highMiles - b.summary.highMiles;
    }
    // 3. Lowest average risk
    if (a.summary.averageRiskScore !== b.summary.averageRiskScore) {
      return a.summary.averageRiskScore - b.summary.averageRiskScore;
    }
    // 4. Shortest travel times
    return a.travelTimeMinutes - b.travelTimeMinutes;
  })[0];
};
