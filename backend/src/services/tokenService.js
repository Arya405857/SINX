import crypto from 'crypto'; import jwt from 'jsonwebtoken'; import { env } from '../config/env.js';
export const hash = (value) => crypto.createHash('sha256').update(value).digest('hex');
export function issueAccessToken(user) { return jwt.sign({ sub: user.id, email: user.email }, env.accessSecret, { expiresIn: '15m' }); }
export function issueRefreshToken(user) { return jwt.sign({ sub: user.id }, env.refreshSecret, { expiresIn: '30d' }); }
export function verifyAccessToken(token) { return jwt.verify(token, env.accessSecret); }
