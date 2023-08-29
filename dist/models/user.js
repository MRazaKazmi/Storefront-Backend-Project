"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;
const secret = process.env.JWT_SECRET;
class UserStore {
    async create(newUser) {
        const passwordHash = bcrypt_1.default.hashSync(newUser.password + pepper, parseInt(saltRounds));
        const conn = await database_1.default.connect();
        try {
            const sql = 'INSERT INTO users (username, firstname, lastname, password_digest) VALUES ($1, $2, $3, $4) RETURNING *';
            const result = await conn.query(sql, [
                newUser.username,
                newUser.firstname,
                newUser.lastname,
                passwordHash
            ]);
            const createdUser = result.rows[0];
            conn.release();
            return createdUser;
        }
        catch (err) {
            conn.release();
            console.log('Failed to create new user.', err);
            throw err;
        }
    }
    async index() {
        const conn = await database_1.default.connect();
        try {
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            conn.release();
            console.log('Failed to query all users.', err);
            throw err;
        }
    }
    async show(userId) {
        const conn = await database_1.default.connect();
        try {
            const sql = 'SELECT * FROM users WHERE id=$1';
            const result = await conn.query(sql, [userId]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            conn.release();
            console.log('Failed to query user details.', err);
            throw err;
        }
    }
    async delete(userId) {
        try {
            const sql = "DELETE FROM users WHERE id = $1";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [userId]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Could not delete user ${userId}. Error: ${err}`);
        }
    }
}
exports.UserStore = UserStore;
