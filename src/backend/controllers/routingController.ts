import { Request, Response } from 'express';
import { getRouteOptions } from '../services/routingService';
import { recommendRoute } from '../services/recommendationService';

export const getRoutes = async (req: Request, res: Response) => {
  try {
    const { origin, destination, departureTime, loadWeight } = req.body;
    
    // Basic validation
    if (!origin || !destination || !departureTime || !loadWeight) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const routeOptions = await getRouteOptions({ origin, destination, departureTime, loadWeight: Number(loadWeight) });
    const recommendedRoute = recommendRoute(routeOptions);

    res.json({
      routes: routeOptions,
      recommendedRoute
    });
  } catch (error) {
    console.error('Error processing routes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
