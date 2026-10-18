import { WeatherCondition, Checkpoint } from '../types';

export const calculateRiskLevel = (
  weather: WeatherCondition,
  loadWeight: number
): Checkpoint['riskLevel'] => {
  const { windSpeed, rainIntensity, snowIntensity } = weather;

  // Load Rules
  if (windSpeed >= 55) return 'No Travel';
  if (windSpeed >= 45 && windSpeed <= 54 && loadWeight > 30000) return 'No Travel';
  if (windSpeed >= 35 && windSpeed <= 44 && loadWeight > 40000) return 'Severe';

  // Weather Thresholds
  let windRisk: number = 0; // 1-Low, 2-Moderate, 3-High, 4-Severe, 5-No Travel
  if (windSpeed < 25) windRisk = 1;
  else if (windSpeed < 35) windRisk = 2;
  else if (windSpeed < 45) windRisk = 3;
  else if (windSpeed < 55) windRisk = 4;
  else windRisk = 5;

  let rainRisk: number = 0;
  if (rainIntensity < 0.10) rainRisk = 1;
  else if (rainIntensity <= 0.25) rainRisk = 2;
  else if (rainIntensity <= 0.50) rainRisk = 3;
  else if (rainIntensity <= 1.00) rainRisk = 4;
  else rainRisk = 5;

  let snowRisk: number = 0;
  if (snowIntensity < 0.5) snowRisk = 1;
  else if (snowIntensity <= 1.0) snowRisk = 2;
  else if (snowIntensity <= 2.0) snowRisk = 3;
  else if (snowIntensity <= 3.0) snowRisk = 4;
  else snowRisk = 5;

  const maxRisk = Math.max(windRisk, rainRisk, snowRisk);

  switch (maxRisk) {
    case 1: return 'Low';
    case 2: return 'Moderate';
    case 3: return 'High';
    case 4: return 'Severe';
    case 5: return 'No Travel';
    default: return 'Low';
  }
};
