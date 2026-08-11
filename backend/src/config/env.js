import 'dotenv/config';
const required = ['MONGODB_URI', 'JWT_ACCESS_SECRET', 'JWT_REFRESH_SECRET'];
export const env = Object.freeze({
  nodeEnv: process.env.NODE_ENV || 'development', port: Number(process.env.PORT || 5000),
  mongoUri: process.env.MONGODB_URI, accessSecret: process.env.JWT_ACCESS_SECRET,
  refreshSecret: process.env.JWT_REFRESH_SECRET, clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  smtp: { host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 587), user: process.env.SMTP_USER, pass: process.env.SMTP_PASS, from: process.env.SMTP_FROM || 'Signix <no-reply@example.com>' },
  uploadDir: process.env.UPLOAD_DIR || 'uploads',
});
export function validateEnv() { if (env.nodeEnv === 'production') { const missing = required.filter((key) => !process.env[key]); if (missing.length) throw new Error(`Missing required environment variables: ${missing.join(', ')}`); } }
