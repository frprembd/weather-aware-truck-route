import express from 'express';
import path from 'path';
import routingRoutes from './backend/routes/routingRoutes';

const app = express();
app.use(express.json());

// API routes
app.use('/api/routes', routingRoutes);

// In development, we use vite's middleware
if (process.env.NODE_ENV !== 'production') {
  const { createServer } = await import('vite');
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.resolve(__dirname, 'dist')));
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
