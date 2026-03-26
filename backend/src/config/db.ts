import { Pool } from 'pg';
import { env } from './env';

export const db = new Pool({
  host: env.db.host,
  port: env.db.port,
  database: env.db.name,
  user: env.db.user,
  password: env.db.password,
});

export async function connectDb(): Promise<void> {
  const client = await db.connect();
  client.release();
  console.log('PostgreSQL connected');
}
