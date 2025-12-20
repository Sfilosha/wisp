import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

export default {
  figmaApiKey: process.env.FIGMA_API_KEY,
  figmaFileKey: 'ktUGhzlx0XSuKCf85SHvhb',
  PORT: 9000,
  httpsOptions: {
    key: fs.readFileSync(path.resolve('./localhost-key.pem')),
    cert: fs.readFileSync(path.resolve('./localhost.pem')),
  },
  outputDir: '../../packages/design-system/src',
  tokensFilePath: '../../packages/tokens/tokens.css',
  variablesFilePath: '../../packages/tokens/variables.json',
};
