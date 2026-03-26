import { db } from '../../config/db';

export interface User {
  id: number;
  email: string;
  created_at: Date;
}

export const userService = {
  async findById(id: number): Promise<User | null> {
    const { rows } = await db.query<User>(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    return rows[0] ?? null;
  },

  async findByEmail(email: string): Promise<User | null> {
    const { rows } = await db.query<User>(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return rows[0] ?? null;
  },

  async create(email: string): Promise<User> {
    const { rows } = await db.query<User>(
      'INSERT INTO users (email) VALUES ($1) RETURNING *',
      [email]
    );
    return rows[0];
  },
};
