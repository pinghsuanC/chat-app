import { redis } from '../../config/redis';

const SESSION_TTL = 60 * 60 * 24; // 24 hours

export const sessionService = {
  async set(sessionId: string, data: Record<string, unknown>): Promise<void> {
    await redis.set(
      `session:${sessionId}`,
      JSON.stringify(data),
      'EX',
      SESSION_TTL
    );
  },

  async get<T>(sessionId: string): Promise<T | null> {
    const value = await redis.get(`session:${sessionId}`);
    if (!value) return null;
    return JSON.parse(value) as T;
  },

  async destroy(sessionId: string): Promise<void> {
    await redis.del(`session:${sessionId}`);
  },

  async refresh(sessionId: string): Promise<void> {
    await redis.expire(`session:${sessionId}`, SESSION_TTL);
  },
};
