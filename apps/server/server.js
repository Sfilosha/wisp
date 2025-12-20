import express from 'express';
import cors from 'cors';
import https from 'https';
import config from './config/index.js';
import Logger from '../../helpers/Logger.js';

import tokensRoutes from './routes/tokens.js';
import componentsRoutes from './routes/components.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
app.use(cors({ origin: '*', methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS' }));
app.use(express.json({ limit: '10mb' }));

app.use((req, res, next) => {
  console.log(`➡️  ${req.method} ${req.url}`);
  next();
});

app.use('/tokens', tokensRoutes);
app.use('/components', componentsRoutes);

app.use(errorHandler);

https.createServer(config.httpsOptions, app).listen(config.PORT, () => {
  Logger.divider();
  Logger.info(`🚀 Server is running on https://localhost:${config.PORT}. You can use Plugin now.`);
});
