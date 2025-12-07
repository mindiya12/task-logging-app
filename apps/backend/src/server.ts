import app from './app';
import { pool } from './config/db';

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});

const shutdown = async () => {
  console.log('Shutting down server...');
  server.close(async () => {
    console.log('HTTP server closed');
    await pool.end();
    console.log('DB pool closed');
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
