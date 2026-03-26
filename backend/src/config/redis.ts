import Redis from 'ioredis';
import { env } from './env';

export const redis = new Redis({
  host: env.redis.host,
  port: env.redis.port,
  password: env.redis.password,
  lazyConnect: true,
  enableOfflineQueue: false,
  retryStrategy: () => null, // disable auto-reconnect; reconnect manually when needed
});

redis.on('error', () => {
  // suppress unhandled error events; connectivity is reported via /api/health
});

export async function connectRedis(): Promise<void> {
  await redis.connect();
  console.log('Redis connected');
}
