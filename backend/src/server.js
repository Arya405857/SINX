import { createApp } from './app.js'; import { connectDatabase } from './config/database.js'; import { env, validateEnv } from './config/env.js';
validateEnv(); await connectDatabase(); const server = createApp().listen(env.port, () => console.info(`Signix API listening on ${env.port}`)); for (const signal of ['SIGINT','SIGTERM']) process.on(signal, () => server.close(() => process.exit(0)));
