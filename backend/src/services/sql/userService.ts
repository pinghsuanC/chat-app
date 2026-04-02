import { db } from '../../config/db';

export interface User {
  id: string;
  email: string;
  username: string;
  password_hash: string | null;
  google_id: string | null;
  avatar_url: string | null;
  created_at: Date;
}

export const userService = {
  async findById(id: string): Promise<User | null> {
    const { rows } = await db.query<User>('SELECT * FROM users WHERE id = $1', [id]);
    return rows[0] ?? null;
  },

  async findByEmail(email: string): Promise<User | null> {
    const { rows } = await db.query<User>('SELECT * FROM users WHERE email = $1', [email]);
    return rows[0] ?? null;
  },

  async findByGoogleId(googleId: string): Promise<User | null> {
    const { rows } = await db.query<User>('SELECT * FROM users WHERE google_id = $1', [googleId]);
    return rows[0] ?? null;
  },

  async create(email: string, username: string, passwordHash: string): Promise<User> {
    const { rows } = await db.query<User>(
      'INSERT INTO users (email, username, password_hash) VALUES ($1, $2, $3) RETURNING *',
      [email, username, passwordHash]
    );
    return rows[0];
  },

  async createFromGoogle(data: {
    googleId: string;
    email: string;
    username: string;
    avatarUrl: string;
  }): Promise<User> {
    const { rows } = await db.query<User>(
      'INSERT INTO users (google_id, email, username, avatar_url) VALUES ($1, $2, $3, $4) RETURNING *',
      [data.googleId, data.email, data.username, data.avatarUrl]
    );
    return rows[0];
  },
};
