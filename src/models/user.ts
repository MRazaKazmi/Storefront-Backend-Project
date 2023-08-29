import client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const pepper = process.env.BCRYPT_PASSWORD as string;
const saltRounds = process.env.SALT_ROUNDS as string;
const secret = process.env.JWT_SECRET as string;


export type User = {
    id?: number;
    username: string;
    firstname: string;
    lastname: string;
    password: string;
};

export class UserStore {
    async create(newUser: User): Promise<User> {
        const passwordHash = bcrypt.hashSync(
            newUser.password + pepper,
            parseInt(saltRounds)
        );

        const conn = await client.connect();

        try {
            const sql =
                'INSERT INTO users (username, firstname, lastname, password_digest) VALUES ($1, $2, $3, $4) RETURNING *';

            const result = await conn.query(sql, [
                newUser.username,
                newUser.firstname,
                newUser.lastname,
                passwordHash
            ]);

            const createdUser = result.rows[0];

            conn.release();

            return createdUser;
        } catch (err) {
            conn.release();

            console.log('Failed to create new user.', err);

            throw err;
        }
    }

    async index(): Promise<User[]> {
        const conn = await client.connect();

        try {
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);

            conn.release();
            return result.rows;
        } catch (err) {
            conn.release();

            console.log('Failed to query all users.', err);

            throw err;
        }
    }

    async show(userId: number): Promise<User> {
        const conn = await client.connect();

        try {
            const sql = 'SELECT * FROM users WHERE id=$1';
            const result = await conn.query(sql, [userId]);

            conn.release();
            return result.rows[0];
        } catch (err) {
            conn.release();

            console.log('Failed to query user details.', err);

            throw err;
        }
    }

    async delete(userId: number): Promise<User> {
        try {
          const sql = "DELETE FROM users WHERE id = $1";
          const conn = await client.connect();
    
          const result = await conn.query(sql, [userId]);
    
          const user = result.rows[0];
    
          conn.release();
    
          return user;
        } catch (err) {
          throw new Error(`Could not delete user ${userId}. Error: ${err}`);
        }
      }
    
}




