import { redis } from '../../config/redis';

const DEFAULT_TTL = 60 * 5; // 5 minutes

export const cacheService = {
  async get<T>(key: string): Promise<T | null> {
    const value = await redis.get(key);
    if (!value) return null;
    return JSON.parse(value) as T;
  },

  async set(key: string, value: unknown, ttl = DEFAULT_TTL): Promise<void> {
    await redis.set(key, JSON.stringify(value), 'EX', ttl);
  },

  async del(key: string): Promise<void> {
    await redis.del(key);
  },

  async exists(key: string): Promise<boolean> {
    return (await redis.exists(key)) === 1;
  },
};
